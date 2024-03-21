let addCourseButtonsHTMLCollection = document.getElementsByClassName(_AddCourseButtonClassName);
let addCourseButtonArray = Array.from(addCourseButtonsHTMLCollection);
addCourseButtonArray.forEach((addButton) => {
    addButton.addEventListener('click', (e) => {
        /* get the button of the event */
        let addButton = e.target;
        addCourseWidgetToAddButtonDaySection(addButton);
    }, true)
});