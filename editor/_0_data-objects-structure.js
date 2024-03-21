const TIME_TABLE_DATA = "TimeTableData";
function sortDataInLocalStorage() {
    let timetable = JSON.parse(localStorage.getItem(TIME_TABLE_DATA));
    if (timetable == undefined){
        return
    }
    for (let day in timetable) {
        // Assuming your list is stored in a variable called list
        timetable[day].sort(function (a, b) {
            // Convert the startTime strings to Date objects
            let dateA = new Date('01/01/2024 ' + a.startTime);
            let dateB = new Date('01/01/2024 ' + b.startTime);
            // Compare the dates and return the result
            return dateA - dateB;
        });
    }
    let timetableJSON = JSON.stringify(timetable);
    localStorage.setItem(TIME_TABLE_DATA,timetableJSON);
}
sortDataInLocalStorage();


/* load data from local-storage */
let LoadedTimeTableData = JSON.parse(localStorage.getItem(TIME_TABLE_DATA));

let TimeTableData = {
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: []
}
let _CourseData = {
    id: '',
    title: '',
    code: '',
    section: '',
    type: '',
    startTime: '',
    endTime: '',
    day: ''
}

/* load local-storage time-table-data */
if (LoadedTimeTableData != undefined){
    TimeTableData = LoadedTimeTableData;
}