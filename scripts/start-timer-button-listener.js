document.getElementById('start-timer-button').addEventListener('click', function () {
    var newTimerInput = document.getElementById('new-timer-input').value;
    chrome.storage.sync.set({ 'timer': newTimerInput });
    console.log('Timer in storage set to ' + newTimerInput + ' minutes');
    chrome.runtime.sendMessage({ message: 'START_TIMER' });
    console.log('START_TIMER message sent to background.js');
});