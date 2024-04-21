/* this is the button that redirect user to settings page */
/* the id of the editor button */
const _EditorButtonId ='home-page-btn';
/* get the editor-button element */
let editorButton = document.getElementById(_EditorButtonId);
// open editor on click
editorButton.addEventListener('click', (e) => {
    // open editor page
    window.location.href = "../editor/index.html";
});