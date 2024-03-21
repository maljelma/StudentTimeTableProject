const _TimeTableDataDownloadFileName = 'TimeTableData';
/* download */
let downloadBtn = document.getElementById(_DownloadButtonId);
downloadBtn.addEventListener('click', (e) => {
    // Object
    let dataObject = {TimeTableData,SemesterData}
    // Convert the JSON object to a string
    let jsonString = JSON.stringify(dataObject,null,'\t');

    // Create a Blob object from the JSON string
    let blob = new Blob([jsonString], { type: "application/json" });

    // Create a URL for the blob object
    let url = URL.createObjectURL(blob);

    // Create an anchor element with the download attribute
    let a = document.createElement("a");
    a.href = url;
    a.download = `${_TimeTableDataDownloadFileName}.json`;

    // Append the anchor element to the document body
    document.body.appendChild(a);

    // Simulate a click on the anchor element
    a.click();

    // Remove the anchor element from the document body
    document.body.removeChild(a);

});
/* download */
let loadBtn = document.getElementById(_LoadButtonId);
loadBtn.addEventListener('click', (e) => {
    // Create a variable to store the object
    let jsonObject;

    // Create an input element to select the file
    let input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    // Add an event listener to handle the file selection
    input.addEventListener("change", function (event) {
        // Get the selected file
        let file = event.target.files[0];

        // Create a FileReader object to read the file content
        let reader = new FileReader();

        // Add an event listener to handle the file load
        reader.addEventListener("load", function () {
            // Parse the file content as JSON
            jsonObject = JSON.parse(reader.result);

            /* load time-table-data */
            TimeTableData = jsonObject.TimeTableData;
            updateLocalStorageTimeTableData();
            loadTimeTableDataFromLocalStorage();

            /* load semester-data */
            SemesterData = jsonObject.SemesterData;
            for (let [key, value] of Object.entries(SemesterData)){
                localStorage.setItem(key,value);
            }
            refreshSemesterData();
        });

        // Read the file as text
        reader.readAsText(file);
    });

    // Append the input element to the document body
    document.body.appendChild(input);
    input.click();
    input.remove();
});

