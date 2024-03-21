/* this is the button that redirect user to settings page */
const _EditorButtonId ='home-page-btn';
let editorButton = document.getElementById(_EditorButtonId);
editorButton.addEventListener('click', (e) => {
    console.log('go home')
    window.location.href = "../editor/index.html"; // go to the parent directory
})