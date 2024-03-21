function loadTimeTableDataFromLocalStorage() {
    /* clear days sections */
    let courseWidgetsArray = Array.from(document.getElementsByClassName(_CourseWidgetClassName)).filter((i) => !i.classList.contains(_BlueprintNoneClassName));
    courseWidgetsArray.forEach((i) => i.remove());
    /* load values */
    for (let [dayName, coursesArray] of Object.entries(TimeTableData)) {
        let daySectionCoursesContainer = document.getElementById(dayName);
        coursesArray.forEach((course) => {
            /* create a course-widget */
            let courseWidget = addCourseWidgetToDaySectionCoursesContainer(daySectionCoursesContainer, false);
            /* SET EVENT LISTENER for course-widget inputs to ADD DATA */
            let courseWidgetInputsArray = Array.from(courseWidget.getElementsByTagName('input'))
            courseWidgetInputsArray.forEach((input) => {
                let inputName = input.getAttribute('name');
                let localStorageValue = course[inputName];
                if (strIsTime(localStorageValue)) {
                    if (strIs12hTime(localStorageValue)) {
                        let time24h = covert12hTo24h(localStorageValue);
                        /* set input value */
                        input.value = time24h.toLocaleUpperCase();
                    } else {
                        let time12h = covert24hTo12h(localStorageValue);
                        localStorage.setItem(inputName, time12h);
                        /* update TimeTableData */
                        course[inputName] = time12h.toLocaleLowerCase();
                    }
                } else {
                    course[inputName] = localStorageValue.toLocaleLowerCase();
                    input.value = localStorageValue.toLocaleUpperCase();
                }
            });
        });
    }
}
loadTimeTableDataFromLocalStorage();