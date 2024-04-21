/* Load time-table-data from local memory using */
/* load the value of local-storage key `TimeTableData` */
let timetableLocalStorage = localStorage.getItem('TimeTableData');
/* convert the loaded value to json */
let timetableRowObject = JSON.parse(timetableLocalStorage);
/* create an empty array to hold the processed timetable daily courses list */
let timetable = [];
// show demo mode when there is no time-table in local storage
if(timetableRowObject == undefined){
    // select the `demo-data-label`
    document.querySelector("#demo-data-label").style.display="flex";
    /**
     * as demo_data.js is already loaded in the html 
     * set the time-table to the demo data in the demo_data.js
     * */
    timetable = demo.timetable
} 
// otherwise use the in-local-storage-data
else{
    // ** {WEEK| [DAY| {COURSE| id,code,title,section,type,day,startTime,endTime}, {}, ...], [], ...}
    // -> [{COURSE|...}, {}, ...]
    for (let value of Object.values(timetableRowObject)){
        timetable.push(...value);
    }
}
