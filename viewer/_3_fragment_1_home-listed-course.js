function displayHomeCourse(course,state){
    return `
    <div id="current-course-body">
        <div class="time-group-a">
            <div class="group">
                <div class="time-start">${course.startTime}</div>
                <div class="time-dash">-</div>
                <div class="time-end">${course.endTime}</div>
            </div>
        </div>
        <div class="title">
        <a href="${linkBuilder.home(course.id)}" target="_blank" id="home-listed-course-title">${strToTitle(course.title)}</a>
        </div>
        <div class="state-group-a">
            <div class="group">
                <div class="state" id="home-listed-course-state">${state}</div>
            </div>
            <div class="home-course-links-${state.toLowerCase()}"><a href="${linkBuilder.zoom(course.id)}" target="_blank" class="course-link zoom-link" target="_blank">Zoom</a></div>
        </div>
    </div>`
}
