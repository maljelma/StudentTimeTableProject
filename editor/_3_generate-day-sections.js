const _DayNamesArray = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
_DayNamesArray.forEach((dayName) => {
    let DayNameAsTitle = getTitleWord(dayName);
    let clone = cloneElementById(_DaySectionBluePrintId, _BodyId);
    /* set title */
    let DaySectionTitle = findClosestChildWithClassName(clone, _DaySectionTitleClassName);
    DaySectionTitle.innerHTML = DayNameAsTitle;
    /* set courses-list id */
    let DaySectionCourseList = findClosestChildWithClassName(clone, _DaySectionCourseListClassName);
    DaySectionCourseList.id = dayName.slice(0,3);
})