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
Object.keys(semesterData).forEach((key) => {
    if (semesterData[key] == undefined) {
        document.querySelector("#demo-data-label").style.display = "flex";
        semesterData[key] = demo.semesterData[key];
    }
});

