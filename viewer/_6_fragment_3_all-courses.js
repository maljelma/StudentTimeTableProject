const [studentCoursesCodeArray, studentCoursesArray] = timetable.reduce((prev, curr, i, arr) => {
    if(!prev[0].includes(curr.code)){
        prev[0].push(curr.code);
        prev[1].push(curr);
    }
    return prev;
},[[],[]]);
const studentCoursesElement = document.querySelector('#student-courses');
let currentTab;
studentCoursesArray.forEach((course,i) => {
    if(i%4 == 0){
        currentTab = document.createElement('div');
        currentTab.setAttribute('horizontal-scrollable-tab','');
        studentCoursesElement.appendChild(currentTab);
    }
    course = {...course,startTime:"",endTime:""}
    currentTab.innerHTML += buildCourse(course);
});