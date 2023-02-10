chrome.storage.sync.get(['currentTask'], function (result) {
    var currentTask = result.currentTask || "No task";
    var currentTaskDisplay = document.getElementById('current-task');
    currentTaskDisplay.innerHTML = currentTask;
});