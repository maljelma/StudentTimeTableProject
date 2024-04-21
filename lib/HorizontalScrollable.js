document.addEventListener("DOMContentLoaded", () => {
    const HORIZONTAL_SCROLLABLE_WIDGET = 'horizontal-scrollable-widget'
    const HORIZONTAL_SCROLLABLE_NOTEBOOK = 'horizontal-scrollable-notebook';
    const HORIZONTAL_SCROLLABLE_TAB = 'horizontal-scrollable-tab';
    const HORIZONTAL_SCROLLABLE_INDICATORS = 'horizontal-scrollable-indicators'
    // ATTRIBUTES OPTIONS
    const OTP_NO_ONWHEEL_SCROLLING = 'no-onwheel-scrolling';

    /**
     * Update tab indicator for the target widget.
     * @param {Object} options - The options object.
     * @param {HTMLDivElement} options.target - The target widget.
     */
    const updateTabIndicator = ({ target }) => {
        const { INDICATOR_SCALE, TABS_COUNT, INDICATOR_BUTTONS } = target.tag
        const scrollLeft = target.scrollLeft;
        const scrollWidth = target.scrollWidth
        const tabWidth = scrollWidth / TABS_COUNT.value;
        const scrollPosition = parseFloat((scrollLeft / tabWidth).toFixed(2));
        //
        const exact_position = Math.trunc(scrollPosition);
        const position_reminder = scrollPosition % 1;
        const weight = 1;
        const weight_factor = 0.75;
        const weight_factor_complement = weight - weight_factor;
        // a ~ b | the two indicator buttons the current scrolling is in between
        const a = weight - (weight_factor_complement * position_reminder);
        const b = weight_factor + (weight - a);
        // rest buttons scale
        INDICATOR_BUTTONS.forEach(button => {
            button.style.transform = `scale(${INDICATOR_SCALE})`;
        });
        if (exact_position + 1 < TABS_COUNT.value) {
            // update the two affected indicators to the new scroll-position
            INDICATOR_BUTTONS[exact_position].style.transform = `scale(${a})`;
            INDICATOR_BUTTONS[exact_position + 1].style.transform = `scale(${b})`;
            generateIndicatorEvent(target, a, b, exact_position, exact_position + 1);
        } else {
            // set the last indictor button scale to 1 and reset the one previous to it
            INDICATOR_BUTTONS[exact_position - 1].style.transform = `scale(${INDICATOR_SCALE})`;
            INDICATOR_BUTTONS[exact_position].style.transform = `scale(${weight})`;
            generateIndicatorEvent(target, INDICATOR_SCALE, weight, exact_position - 1, exact_position);
        }

    };
    /**
     * get tab indicator index.
     * @param {HTMLDivElement} notebook - The notebook widget.
     */
    const getCurrentTabIndex = (notebook) => {
        const { TABS_COUNT } = notebook.tag
        const scrollLeft = notebook.scrollLeft;
        const scrollWidth = notebook.scrollWidth
        const tabWidth = scrollWidth / TABS_COUNT.value;
        const scrollPosition = parseFloat((scrollLeft / tabWidth).toFixed(2));
        //
        let exact_position = Math.trunc(scrollPosition);
        return exact_position;
    }
    /**
     * generates an `indicator` event for notebook
     * @param {HTMLDivElement} notebook - The notebook widget.
     * @param {Number} prevTabScale - scale of previous --to scroll-position-- tab indicator.
     * @param {Number} nextTabScale - scale of next     --to scroll-position-- tab indicator.
     * @param {Number} pervTabIndex - index of previous --to scroll-position-- tab indicator.
     * @param {Number} nextTabIndex - index of next     --to scroll-position-- tab indicator.
     */
    const generateIndicatorEvent = (notebook, prevTabScale, nextTabScale, prevTabIndex, nextTabIndex) => {
        const indicatorEvent = new CustomEvent('indicator', {
            detail: {
                prevTabScale,
                nextTabScale,
                prevTabIndex,
                nextTabIndex
            }
        });
        notebook.dispatchEvent(indicatorEvent);
    }
    /** allow or block onwheel tabs scrolling
     * @param {HTMLDivElement} notebook - The notebook widget.
     * @param {Boolean} allow - allow the onwheel scrolling
     */
    const updateAllowMouseWheel = (notebook, allow) => {
        if (allow) {
            notebook.style.overflowX = 'auto';
        } else {
            notebook.style.overflowX = 'hidden';
        }
    }
    /** observer to watch for element attribute-name existence and deletion
     * @param {HTMLDivElement} element an html element
     * @param {String} attributeName the name of the attribute
     * @param {Function} callback the callback handler for the existence of the attribute name
     */
    const observeElementAttributeExistence = (element, attributeName, callback) => {
        const observer = new MutationObserver(function (mutationsList, _) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'attributes') {
                    if (mutation.attributeName === attributeName) {
                        callback(element.hasAttribute(attributeName));
                    }
                }
            }
        });
        // set observer
        observer.observe(element, { attributes: true });
        // call the callback to update the init state of the attribute-name
        callback(element.hasAttribute(attributeName));
    }
    /**
    * @type {Array<HTMLDivElement>}
    */
    let widgets = document.querySelectorAll(`div[${HORIZONTAL_SCROLLABLE_WIDGET}]`);
    widgets.forEach(widget => {
        widget.style.position = 'relative';
        widget.style.width = '100%';
        widget.style.height = '100%';
        /**
        * @type {Array<HTMLDivElement>}
        */
        let notebooks = widget.querySelectorAll(`div[${HORIZONTAL_SCROLLABLE_NOTEBOOK}]`);
        notebooks.forEach(notebook => {
            notebook.style.position = 'relative';
            notebook.style.display = 'flex';
            notebook.style.width = '100%';
            notebook.style.height = '100%';
            notebook.style.overflowX = 'auto';
            notebook.style.scrollSnapType = 'x mandatory';
            notebook.style.scrollbarWidth = 'none';
            notebook.addEventListener('scroll', updateTabIndicator);
            // notebook specific shared values
            notebook.tag = {}
            notebook.tag.INDICATOR_SCALE = .75;
            notebook.tag.TABS_COUNT = { value: 0 };
            notebook.tag.INDICATOR_BUTTONS = [];
            // get current tab function
            notebook.tag.getCurrentTabIndex = () => getCurrentTabIndex(notebook);
            // opt array
            notebook.tag.opts = [OTP_NO_ONWHEEL_SCROLLING];
            // set notebook attributes observers
            observeElementAttributeExistence(notebook, OTP_NO_ONWHEEL_SCROLLING, (exists) => updateAllowMouseWheel(notebook, !exists));
            /**
            * @type {Array<HTMLDivElement>}
            */
            const tabs = widget.querySelectorAll(`div[${HORIZONTAL_SCROLLABLE_TAB}]`);
            tabs.forEach(tab => {
                tab.style.flex = '0 0 auto'
                tab.style.position = 'relative';
                tab.style.boxSizing = 'border-box';
                tab.style.scrollSnapAlign = 'start';
                tab.style.width = '100%';
                tab.style.height = '100%';
            });
            /**
            * @type {HTMLDivElement}
            */
            const indicator = widget.querySelector(`div[${HORIZONTAL_SCROLLABLE_INDICATORS}]`);
            notebook.tag.TABS_COUNT.value = tabs.length;
            if (indicator) {
                indicator.style.display = 'flex';
                indicator.style.flexDirection = 'row';
                indicator.style.position = 'absolute';
                indicator.style.bottom = '10px';
                indicator.style.left = '50%';
                indicator.style.transform = 'translate(-50%, 0%)';
                for (let i = 0; i < notebook.tag.TABS_COUNT.value; i++) {
                    const button = document.createElement('div');
                    button.style.width = '10px';
                    button.style.height = '10px';
                    button.style.borderRadius = '10px';
                    button.style.margin = '0px 5px';
                    button.style.cursor = 'pointer';
                    button.style.backgroundColor = 'blanchedalmond';
                    button.style.border = '1px solid saddlebrown';
                    button.addEventListener('click', () => { tabs[i].scrollIntoView({ behavior: 'smooth' }); });
                    if (i != 0) { button.style.transform = `scale(${notebook.tag.INDICATOR_SCALE})`; }
                    indicator.appendChild(button);
                    notebook.tag.INDICATOR_BUTTONS.push(button);
                }
            }
        });
    });
});