const _SemesterSectionId = 'semester-sec';
let SemesterData = {};
function refreshSemesterData() {
    let semesterSection = document.getElementById(_SemesterSectionId);
    let semesterSectionInputsArray = Array.from(semesterSection.getElementsByTagName('input'));
    /* set local-storage update event listener on focus-out */
    semesterSectionInputsArray.forEach((input) => {
        input.addEventListener('change', (e) => {
            let input = e.target;
            let value = input.value;
            let inputName = input.getAttribute('name');
            /* convert 24h time to 12h time */
            if (strIsTime(value) && !strIs12hTime(value)) {
                let time12h = covert24hTo12h(value);
                value = time12h;
            }
            localStorage.setItem(inputName, value)
            SemesterData[inputName] = value;
        });
        let inputName = input.getAttribute('name');
        /* load data form local-storage */
        let localStorageValue = localStorage.getItem(inputName);
        /* initialize item if it does not exist in local-storage */
        /* to reset/clear item in local-storage:
        //localStorage.setItem(inputName, '');
        */
        if (!localStorageValue) {
            localStorageValue = "";
        }
        if (strIsTime(localStorageValue)) {
            if (strIs12hTime(localStorageValue)) {
                let time24h = covert12hTo24h(localStorageValue);
                /* set value to time input */
                input.value = time24h.toLocaleUpperCase();
            } else {
                let time12h = covert24hTo12h(localStorageValue);
                localStorage.setItem(inputName, time12h);
                localStorageValue = time12h.toLocaleUpperCase();
            }
        } else {
            input.value = localStorageValue.toLocaleUpperCase();
        }
        /* set semester-data value */
        SemesterData[inputName] = localStorageValue;
    });
}
refreshSemesterData();