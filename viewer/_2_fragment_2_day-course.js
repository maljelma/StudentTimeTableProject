function strToTitle(str){
    let wordsArray = str.split(" ")
    let wordStack = ""
    for ( let word of wordsArray){
        wordStack += " " + word.slice(0,1).toLocaleUpperCase() + word.slice(1)
    }
    return wordStack
}

let linkBuilder = {};
linkBuilder.zoom = (id) => {
    return `https://e.centennialcollege.ca/d2l/common/dialogs/quickLink/quickLink.d2l?ou=${id}&type=lti&rcode=CENCOL-4893909&srcou=6606&launchFramed=1&framedName=Zoom`
}
linkBuilder.home = (id) => {
    return `https://e.centennialcollege.ca/d2l/home/${id}`
}
linkBuilder.tableOfContent = (id) => {
    return `https://e.centennialcollege.ca/d2l/le/content/${id}/Home`
}
linkBuilder.assignment = (id) => {
    return `https://e.centennialcollege.ca/d2l/lms/dropbox/user/folders_list.d2l?ou=${id}&isprv=0`
}
linkBuilder.quizzes = (id) => {
    return `https://e.centennialcollege.ca/d2l/lms/quizzing/user/quizzes_list.d2l?ou=${id}`
}
function buildCourse(course) {
    return `
        <div class="${course.id}">
            <div class="comment display-course-day">
                <div class="current-course-body-day">
                    <div class="time-group-a">
                        <div class="group">
                            <div class="time-start">${course.startTime.toLocaleUpperCase()}</div>
                            <div class="time-dash">-</div>
                            <div class="time-end">${course.endTime.toLocaleUpperCase()}</div>
                        </div>
                        <div class="course-code">${course.code.toLocaleUpperCase()} • ${course.section.toLocaleUpperCase()}</div>
                    </div>
                    <div class="title">
                        <a href="${linkBuilder.home(course.id)}" target="_blank" class="day-course-home-link">
                            ${strToTitle(course.title)}
                        </a>
                    </div>
                    <div class="state-group-a">
                        <div class="group">
                            <div class="state">${course.type.toLocaleUpperCase()}</div>
                        </div>
                        <a href="${linkBuilder.zoom(course.id)}" class="course-link zoom-link" target="_blank">Zoom</a>
                        <a href="${linkBuilder.assignment(course.id)}" class="course-link home-link" target="_blank">Assignment</a>
                        <a href="${linkBuilder.quizzes(course.id)}" class="course-link home-link" target="_blank">Quizzes</a>
                        <a href="${linkBuilder.tableOfContent(course.id)}" class="course-link content-link" target="_blank">Content</a>
                    </div>
                </div>
            </div>
        </div>
        `
}