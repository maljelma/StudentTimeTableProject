/**
 * utility function to select an element by a CSS selector.
 * 
 * @param {*} selectors - CSS selector string used to find the HTML element.
 * @returns {HTMLElement} the first HTML element that matches the selector.
 */
function $(selectors) {
    return document.querySelector(selectors);
}

/* set click event-listener for navigation-bar buttons */
$("#nav-button-courses").addEventListener("click", () => $("#courses").scrollIntoView());
$("#nav-button-home").addEventListener("click", () => $("#home").scrollIntoView());
$("#nav-button-mon").addEventListener("click", () => $("#mon").scrollIntoView());
$("#nav-button-tue").addEventListener("click", () => $("#tue").scrollIntoView());
$("#nav-button-wed").addEventListener("click", () => $("#wed").scrollIntoView());
$("#nav-button-thu").addEventListener("click", () => $("#thu").scrollIntoView());
$("#nav-button-fri").addEventListener("click", () => $("#fri").scrollIntoView());
$("#nav-button-sat").addEventListener("click", () => $("#sat").scrollIntoView());
$("#nav-button-sun").addEventListener("click", () => $("#sun").scrollIntoView());