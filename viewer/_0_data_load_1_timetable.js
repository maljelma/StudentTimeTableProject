/* Load time-table-data from local memory */
let timetableLocalStorage = localStorage.getItem('TimeTableData');
let timetableRowObject = JSON.parse(timetableLocalStorage);
let timetable = [];
if(timetableRowObject == undefined){
    document.querySelector("#demo-data-label").style.display="flex";
    timetable = demo.timetable
} else{
    for (let value of Object.values(timetableRowObject)){
        timetable.push(...value);
    }
}
