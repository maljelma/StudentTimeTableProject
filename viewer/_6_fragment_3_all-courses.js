// get unique courses list
const [studentCoursesCodeArray, studentCoursesArray] = timetable.reduce((prev, curr, i, arr) => {
    if(!prev[0].includes(curr.code)){
        prev[0].push(curr.code);
        prev[1].push(curr);
    }
    return prev;
},[[],[]]);

// get dat-timing for each course
timetable.forEach(course => {
    let index = studentCoursesCodeArray.indexOf(course.code);
    let indexedCourse = studentCoursesArray[index];
    let time = {day:course.day,startTime:course.startTime,endTime:course.endTime}
    if (indexedCourse.schedule == undefined){
        indexedCourse.schedule = [];
    }
    let existenceCount = indexedCourse.schedule.some(t => t.day === course.day);
    if (existenceCount){
        time.day = "";
    }
    indexedCourse.schedule.push(time);  
});

// create html elements
const parser = new DOMParser();
const studentCoursesElement = document.querySelector('#student-courses');
let currentTab;
studentCoursesArray.forEach((course,i) => {
    if(i%4 == 0){
        currentTab = document.createElement('div');
        currentTab.setAttribute('horizontal-scrollable-tab','');
        studentCoursesElement.appendChild(currentTab);
    }
    course = {...course,startTime:"",endTime:""}
    let courseStringElement = buildCourse(course);
    /** @type {HTMLDivElement} */
    let courseElement = parser.parseFromString(courseStringElement, "text/html").childNodes[0];
    currentTab.appendChild(courseElement);

    // apply the schedule of the course
    courseElement.querySelector(".time-start").remove();
    courseElement.querySelector(".time-end").remove();

    let courseScheduleElement = courseElement.querySelector(".time-dash");
    courseScheduleElement.innerHTML = '';
    courseScheduleElement.classList.remove('time-dash');
    courseScheduleElement.classList.add('course-schedule');


    /** @type {Array} */
    let schedule = course.schedule;
    schedule.forEach(/** @param {{ day: string, startTime: string, endTime: string }} time */ (time, i) =>{
        const {day, startTime, endTime} = time;
        if (i > 0 ){
            courseScheduleElement.innerHTML += `<span class="schedule-time-space"></span>`
        }
        let timeLink = `<a href="#${day}">${strToTitle(day)}</a> ${startTime.toUpperCase()} - ${endTime.toUpperCase()}`
        courseScheduleElement.innerHTML += timeLink;
    })
});
