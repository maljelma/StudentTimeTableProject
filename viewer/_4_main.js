const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
let sections = ['home', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

/* show courses on day tab */
function getMinutesBetweenTwoTimes(start, end) {
    // Parse the start and end strings as dates
    let startDate = new Date("01/01/2021 " + start);
    let endDate = new Date("01/01/2021 " + end);

    // Get the difference in milliseconds
    let diff = endDate.getTime() - startDate.getTime();

    // Convert milliseconds to minutes and return
    return diff / 60000;
}
function castTimeAsPercentage(time1, time2, time0) {
    let fullTime = getMinutesBetweenTwoTimes(time1, time2);
    let partialTime = getMinutesBetweenTwoTimes(time1, time0);
    return partialTime / fullTime;
}
function weeks_between(date1, date2) {
    // The number of milliseconds in one week
    let ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
    // Convert both dates to milliseconds
    let date1_ms = date1.getTime();
    let date2_ms = date2.getTime();
    // Calculate the difference in milliseconds
    let difference_ms = Math.abs(date1_ms - date2_ms);
    // Convert back to weeks and return
    return Math.floor(difference_ms / ONE_WEEK);
}

// A function that takes two strings representing times in 12-hour format
// and returns true if the current time is between them, false otherwise
function TimeBetween(time1, time2, time0) {
    // Create a Date object with the current date and time
    let now;
    if (time0) {
        now = new Date(new Date().toDateString() + " " + time0);
    }
    else {
        now = new Date();
    }

    // Create two Date objects with the same date as now, but different times
    let start = new Date(now);
    let end = new Date(now);
    // Parse the time strings and set the hours and minutes of the start and end dates
    let [hour1, minute1, ampm1] = time1.split(/[: ]/);
    let [hour2, minute2, ampm2] = time2.split(/[: ]/);

    start.setHours(ampm1 === "am" ? +hour1 % 12 : +hour1 % 12 + 12);
    start.setMinutes(+minute1);
    end.setHours(ampm2 === "am" ? +hour2 % 12 : +hour2 % 12 + 12);
    end.setMinutes(+minute2);
    // Get the milliseconds of the current time and the start and end times
    let nowMs = now.getTime();
    let startMs = start.getTime();
    let endMs = end.getTime();
    // Check if the current time is between the start and end times
    return nowMs >= startMs && nowMs < endMs;
}

/* show user name */
let userNameDiv = document.getElementById('user-name');
userNameDiv.innerHTML = semesterData.userName;

/* load courses */
timetable.forEach((course) => {
    /* get course day section */
    let item = document.getElementById(course.day)
    /* add course to section */
    item.innerHTML += buildCourse(course);
});

/* LOAD ONCE */
let indicatorPadding = 6;
let navButton = document.getElementById('nav-button-home');
let navButtonWidth = navButton.clientWidth - indicatorPadding;

/* load courses */
let fullDayLengthInMin = getMinutesBetweenTwoTimes(semesterData.dayStartTime, semesterData.dayEndTime);
timetable.forEach((course) => {
    /* get course day section */
    let item = document.getElementById(`nav-button-${course.day}`);

    /* find course time length */
    let courseTimeLengthInMin = getMinutesBetweenTwoTimes(course.startTime, course.endTime);
    /* convert to pixel size */
    let indicatorWidth = (navButtonWidth * courseTimeLengthInMin) / fullDayLengthInMin;

    /* find course position in day in percent */
    let courseTimePositionInPercent = castTimeAsPercentage(semesterData.dayStartTime, semesterData.dayEndTime, course.startTime);
    /* convert position from resent to pixel */
    let indicatorLeft = navButtonWidth * courseTimePositionInPercent;

    /* create item */
    let indicator = document.createElement('div');
    indicator.style.width = indicatorWidth + 1 + 'px';
    indicator.style.left = indicatorLeft + .5 * indicatorPadding + 'px';
    indicator.id = `${course.id}.${course.day}.${course.startTime}-${course.endTime}-indicator`;
    indicator.className = 'on-tab-btn-course-time-indicator';
    item.append(indicator);
});

/* scroll event */
let appNotebook = document.querySelector('#application-notebook');//('#app-window');
let scrollIndicator = document.getElementById('scroll-indicator');
let navigationContainer = document.getElementById('navigation-container');

appNotebook.addEventListener("scroll", (event) => {
    let scrollTop = appNotebook.scrollTop;
    let scrollHeight = appNotebook.scrollHeight;
    let scrollWidth = navigationContainer.clientWidth;
    let dist = (scrollTop * scrollWidth) / scrollHeight
    scrollIndicator.style.left = dist + 'px';
});

/* data */
const currentIndicator = { course: null, state: null }
/* UPDATED LOAD */
const debugging = { index: 0 }
function refreshData() {
    /* week day at home page */
    /* get day name */
    const date = new Date();
    let dayNum = date.getDay();
    let dayName = days[dayNum];
    let todayLink = document.getElementById('today-link');

    /* UPDATE ONLY ON CHANGE - Day-Name Week-Number*/
    if (todayLink.innerHTML != dayName.replace(/^\w/, (c) => c.toUpperCase())) {

        /* show day as a link */
        todayLink.href = `#${dayName.slice(0, 3)}`
        todayLink.innerHTML = dayName.replace(/^\w/, (c) => c.toUpperCase());

        /* show today nav-button */
        let navButtonsArray = Array.from(document.getElementsByClassName('nav-button'));
        navButtonsArray.forEach((navButton) => navButton.classList.remove('nav-button-current-day'))
        let todayNavButton = document.getElementById(`nav-button-${dayName.slice(0, 3)}`);
        todayNavButton.classList.add('nav-button-current-day');
        /* week number */
        /* show week number */
        if (new Date() < new Date(semesterData.end)) {
            let weekNumber = weeks_between(new Date(semesterData.start), new Date()) + Number(semesterData.weekOffset) + 1;
            let weekNumberDiv = document.getElementById('week-number');
            if (weekNumber <= 14){
                weekNumberDiv.innerHTML = ` • Week ${weekNumber}`;
            }
            else{
                weekNumberDiv.innerHTML = ` • See You Next Semester`;
            }
        }
    }

    currentCourse = {}
    /* check for current course */
    timetable.every((course) => {
        if (course.day == dayName.slice(0, 3)) {
            if (TimeBetween(course.startTime, course.endTime)) {
                currentCourse.value = course;
                currentCourse.state = 'current';
                return false; // equivalent to break
            }
        }
        return true; // equivalent to continue
    });

    /* when no current course, check for next course */
    if (!currentCourse.value) {
        let date = new Date(); // a Date object with the current date and time
        let time1 = date.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' }); // a string with the time like '08:30 AM'
        time1 = time1.toLowerCase(); // a string with the time like '08:30 am'
        timetable.every((course) => {
            if (course.day == dayName.slice(0, 3)) {
                if (TimeBetween(time1, course.endTime)) {
                    currentCourse.value = course;
                    currentCourse.state = 'next';
                    return false; // equivalent to break
                }
            }
            return true; // equivalent to continue
        });
    }

    /* CURRENT/NEXT COURSE DEBUGGING - APP MAJOR DOMAIN/FUNCTIONALITY */
    /* currentCourse = {value:timetable[debugging.index],state:'current'} */
    /* --debugging.index++; */
    /* UPDATE ONLY ON CHANGE - Home-Listed-Course */
    let homeListedCourseTitle = document.getElementById('home-listed-course-title');
    let homeListedCourseState = document.getElementById('home-listed-course-state');
    if (
        (
            homeListedCourseTitle !== null
            &&
            currentCourse.value === undefined
        )
        ||
        (
            homeListedCourseTitle === null
            &&
            currentCourse.value !== undefined
        )
        ||
        (
            homeListedCourseTitle !== null
            &&
            currentCourse.value !== undefined
            &&
            (
                homeListedCourseTitle.innerHTML.toLowerCase().trim() !== currentCourse.value.title.trim()
                ||
                homeListedCourseState.innerHTML.toLowerCase() !== currentCourse.state.toLowerCase()
            )
        )
    ) {
        /* clear day-course-state */
        let dayCourseCurrent = document.getElementsByClassName("day-course-current")[0];
        if (dayCourseCurrent){
            dayCourseCurrent.classList.remove("day-course-current");
        }
        let dayCourseNext = document.getElementsByClassName("day-course-next")[0];
        if (dayCourseNext){
            dayCourseNext.classList.remove("day-course-next");
        }

        /* show course at home */
        let displayCourseDiv = document.getElementById('display-course');
        if (currentCourse.value) {
            displayCourseDiv.innerHTML = displayHomeCourse(currentCourse.value, currentCourse.state.toUpperCase());

            /* find listed-course in day index */
            let dayPrefix = dayName.slice(0, 3);
            let dayElement = document.getElementById(dayPrefix);
            let dayCourses = Array.from(dayElement.getElementsByClassName("current-course-body-day"));
            for (let course of dayCourses) {
                let startTime = course.getElementsByClassName("time-start")[0].innerHTML;
                let endTime = course.getElementsByClassName("time-end")[0].innerHTML;
                if (
                    currentCourse.value !== undefined
                    &&
                    startTime.trim().toLocaleLowerCase() === currentCourse.value.startTime.trim().toLocaleLowerCase()
                    &&
                    endTime.trim().toLocaleLowerCase() === currentCourse.value.endTime.trim().toLocaleLowerCase()
                ) {
                    course.classList.add(`day-course-${currentCourse.state}`)
                }
            }
        } else {
            displayCourseDiv.innerHTML = '';
        }

        /* show current and next indentor */
        if (currentCourse.value && currentCourse.value !== currentIndicator.element) {
            /* remove previous course state */
            if (currentIndicator.course) {
                let currCourse = currentIndicator.course;
                let currIndicator = document.getElementById(`${currCourse.id}.${currCourse.day}.${currCourse.startTime}-${currCourse.endTime}-indicator`);
                currIndicator.classList.remove(`on-tab-btn-course-time-indicator-${currentIndicator.state}`);
            }
            /* update current-indicator object */
            currentIndicator.course = currentCourse.value;
            currentIndicator.state = currentCourse.state;

            /* show as currentCourse.state */
            let course = currentCourse.value;
            let indicator = document.getElementById(`${course.id}.${course.day}.${course.startTime}-${course.endTime}-indicator`);
            indicator.classList.add(`on-tab-btn-course-time-indicator-${currentCourse.state}`)
        } else if (!currentCourse.value && currentIndicator.course) {
            let currCourse = currentIndicator.course;
            let currIndicator = document.getElementById(`${currCourse.id}.${currCourse.day}.${currCourse.startTime}-${currCourse.endTime}-indicator`);
            currIndicator.classList.remove(`on-tab-btn-course-time-indicator-${currentIndicator.state}`);
        }
    }
}
refreshData();

// The variable to store the last timestamp
let lastTime = 0;

// The callback function for requestAnimationFrame
function step(timestamp) {
    // Calculate the time interval between the current and the last timestamp
    let interval = timestamp - lastTime;

    // If the interval is one second or more, run the code and update the last timestamp
    if (interval >= 1000) {
        refreshData();
        lastTime = timestamp;
    }

    // Request another animation frame
    requestAnimationFrame(step);
}

// Start the animation loop
requestAnimationFrame(step);
