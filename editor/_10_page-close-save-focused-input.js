window.addEventListener('beforeunload', function(event) {
  document.activeElement.blur();
  document.activeElement.dispatchEvent(new Event('change'));
});