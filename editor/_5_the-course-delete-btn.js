let deleteCourseButtonsHTMLCollection = document.getElementsByClassName(_DeleteCourseButtonClassName);
let deleteCourseButtonArray = Array.from(deleteCourseButtonsHTMLCollection);
deleteCourseButtonArray.forEach((courseDeleteButton) => {
    setupCourseDeleteButtonClickEventListener(courseDeleteButton);
})
