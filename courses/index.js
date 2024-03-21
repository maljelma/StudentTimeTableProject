/* %Refactored% */
/* FUNCTIONS */
/** 
 * formats text as a title
 * @param {String} text text e.g. 'THe TiTLE'
 * @returns {String} title formatted string e.g. 'The Title'
 */
function strToTitle(text) {
    return text.split(" ").map((word) => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}
// links generators
let linkBuilder = {
    "home": (id) => `https://e.centennialcollege.ca/d2l/home/${id}`,
};

/* DATA */
// load data from local storage
// "{mon:[{tile:'..', code:'..',..},tue:[..],..]}"
let TimeTableDataJSONString = localStorage.getItem('TimeTableData');
// convert data from json-string to an object
let TimeTableData = JSON.parse(TimeTableDataJSONString);

/* load demo if no data */
if (TimeTableData == undefined){
    document.querySelector("#demo-data-label").style.display="flex";
    TimeTableData = demo.timetable;
}

let noData = Object.values(TimeTableData).every(o => o.length == 0);
if(noData){
    document.querySelector("#demo-data-label").style.display="flex";
    document.querySelector("#demo-data-label").innerHTML="*No Data";
}
// filter courses by c.title
// a:any, c:course, p:previous
let CoursesSetArray = Object.values(TimeTableData).flatMap((a) => a).map((c) => ({ id: c.id, code: c.code, section: c.section, title: c.title })).reduce((p, c) => { p[1].includes(c.title) ? null : p[0].push(c); p[1].push(c.title); return p }, [[], []])[0];

/* MAPPING */
// get html.div to load courses 
let coursesElement = document.getElementById("courses");
// clear the courses board
coursesElement.innerHTML = '';
// load courses
for (let course of CoursesSetArray) {
    /* CREATE */
    let widget = document.createElement('a');
    let title = document.createElement('span');
    let code = document.createElement('span');
    /* MODIFY */
    widget.href = linkBuilder.home(course.id)
    widget.target = '_blank';
    title.innerHTML = strToTitle(course.title);
    code.innerHTML = (course.code + ' • ' + course.section).toUpperCase();
    /* APPEND */
    widget.appendChild(title);
    widget.appendChild(code);
    coursesElement.appendChild(widget);
    /* RESULT */
    // <a herf='@home[c.code]' target='_blank'>
    //      <span>c.title</span>
    //      <span>course.code + ' • ' + course.section</span>
    // </a>
}