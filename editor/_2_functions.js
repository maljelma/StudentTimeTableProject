/* TIP:CREATE FUNCTIONS IN ORIGINAL JS-FILE FIRST THEN MOVE IT HERE WHEN IT FUNCTIONS AS EXPECTED */
/* DELETE BUTTON & ADD BUTTON */
function updateLocalStorageTimeTableData() {
    let TimeTableDataJsonString = JSON.stringify(TimeTableData);
    localStorage.setItem(TIME_TABLE_DATA, TimeTableDataJsonString);
}
/* DELETE BUTTON */
function setupCourseDeleteButtonClickEventListener(courseDeleteButton) {
    courseDeleteButton.addEventListener('click', (e) => {
        /* get the button of the event */
        let courseDeleteButton = e.target;
        /* look-up closest parent with class-name='course-widget'*/
        let classWidget = findClosestParentWithClassName(courseDeleteButton, _CourseWidgetClassName);
        /* REMOVE DATA from time-table-data */
        let daySectionCoursesContainer = classWidget.parentElement;
        let classWidgetArray = Array.from(daySectionCoursesContainer.getElementsByClassName(_CourseWidgetId));
        let classWidgetIndex = classWidgetArray.indexOf(classWidget);
        let dayKey = daySectionCoursesContainer.id;
        TimeTableData[dayKey].splice(classWidgetIndex, 1);
        /* UPDATE LOCAL-STORAGE ITEM */
        updateLocalStorageTimeTableData();
        /* remove class-widget */
        classWidget.remove();
    }, true)
}
/* ADD BUTTON */
function findClosestParentWithClassName(element, className) {
    return element.closest(`.${className}`);
}
function findClosestChildWithClassName(element, className) {
    return element.querySelector(`.${className}`)
}
function cloneElementById(targetId, destinationId) {
    let target = document.getElementById(targetId);
    let destination = document.getElementById(destinationId);
    let clone = target.cloneNode(true);
    clone.removeAttribute('id');
    clone.removeAttribute('style');
    clone.classList.remove(_BluePrintNodeClassName);
    destination.appendChild(clone);
    return clone;
}
function addCourseWidgetToDaySectionCoursesContainer(daySectionCoursesContainer, addToTimeTableData = true) {
    /* ADD COURSE-WIDGET */
    let courseWidgetClone = cloneElementById(_CourseWidgetBluePrintID, daySectionCoursesContainer.id);
    let courseWidgetDeleteButton = findClosestChildWithClassName(courseWidgetClone, _DeleteCourseButtonClassName);
    setupCourseDeleteButtonClickEventListener(courseWidgetDeleteButton);
    if (addToTimeTableData) {
        /* ADD DATA to time-table-data */
        let dayKey = daySectionCoursesContainer.id;
        let courseData = { ..._CourseData };
        courseData['day'] = dayKey;
        TimeTableData[dayKey].push(courseData);
        /* UPDATE LOCAL-STORAGE ITEM */
        updateLocalStorageTimeTableData();
    }
    /* SET EVENT LISTENER for course-widget inputs to ADD DATA */
    let courseWidgetInputsArray = Array.from(courseWidgetClone.getElementsByTagName('input'))
    courseWidgetInputsArray.forEach((input) => {
        input.addEventListener('change', (e) => {
            let input = e.target;
            let value = input.value;
            /* convert 24h time to 12h time */
            if (strIsTime(value) && !strIs12hTime(value)) {
                let time12h = covert24hTo12h(value);
                value = time12h;
            }
            let inputName = input.getAttribute('name');
            let classWidget = findClosestParentWithClassName(input, _CourseWidgetClassName)
            let dayKey = findClosestParentWithClassName(input, _CoursesListClassName).id;
            let classWidgetsArray = Array.from(daySectionCoursesContainer.getElementsByClassName(_CourseWidgetClassName));
            let classWidgetIndex = classWidgetsArray.indexOf(classWidget);
            TimeTableData[dayKey][classWidgetIndex][inputName] = value;
            /* UPDATE LOCAL-STORAGE ITEM */
            updateLocalStorageTimeTableData();
        });
    });
    return courseWidgetClone;
}
function addCourseWidgetToAddButtonDaySection(addButton) {
    /* look-up closest parent with class-name='course-widget'*/
    let daySection = findClosestParentWithClassName(addButton, _DaySectionClassName);
    let daySectionCoursesContainer = findClosestChildWithClassName(daySection, _CoursesListClassName);
    addCourseWidgetToDaySectionCoursesContainer(daySectionCoursesContainer);
}
/* CREATE DAY SECTIONS */
function getTitleWord(word) {
    return word.slice(0, 1).toLocaleUpperCase() + word.slice(1);
}
/* SEMESTER DATA */
function arrayFindElementWithAttributeValue(elementsArray, attribute, attributeValue) {
    return elementsArray.filter((element) => element.getAttribute(attribute) === attributeValue)[0];
}
function strIs12hTime(str) {
    /* '12:59 am' => strTime <= '11:59 pm' */
    const regex = /^(0?\d|1[0-2]):([0-5]\d) (am|pm|AM|PM)$/i;
    return regex.test(str);
}
function strIs24hTime(str) {
    const regex = /^(0?\d|1\d|2[0-3]):[0-5]\d$/;
    return regex.test(str);
}
function covert12hTo24h(time12h) {
    time12h = time12h.padStart(8, '0');
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
        hours = '00';
    }
    if (modifier.toLocaleUpperCase() === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
}
function covert24hTo12h(time24h) {
    let [hours, minutes] = time24h.split(':');
    let modifier = 'am';
    if (hours >= 12) {
        modifier = 'pm';
        hours = hours - 12;
    }
    if (parseInt(hours) === 0) {
        hours = '12';
    }
    hours = `${hours}`.padStart(2,"0")
    return `${hours}:${minutes} ${modifier}`;
}
function strIsTime(strValue) {
    return (strIs12hTime(strValue) || strIs24hTime(strValue));
}