/** can be improved to all in one object:
 *  - loading very key in semesterData from local storage */
let semesterData = {
    userName: '',
    start: '',
    end: '',
    weekOffset: '',
    dayStartTime: '',
    dayEndTime: ''
};
/* load data for key form local-storage */
Object.keys(semesterData).forEach((key) => {
    let localStorageValue = localStorage.getItem(key);
    semesterData[key] = localStorageValue;
});
/* load demo if no data */
/* check for each semester data field */
Object.keys(semesterData).forEach((key) => {
    /* when a field does not desist load demo data and show demo label */
    if (semesterData[key] == undefined) {
        /* show demo label */
        document.querySelector("#demo-data-label").style.display = "flex";
        semesterData[key] = demo.semesterData[key];
    }
});

