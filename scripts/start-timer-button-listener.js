document.getElementById('start-timer-button').addEventListener('click', function () {

    chrome.storage.sync.get(['timerActive'], function (result) { 
        if (result.timerActive === 'false') {

            console.log("Timer not active, starting timer...");
            var newTimerInput = document.getElementById('new-timer-input').value;
            chrome.storage.sync.set({ 'timer': newTimerInput });
            console.log('Timer in storage set to ' + newTimerInput + ' minutes');
            chrome.runtime.sendMessage({ message: 'START_TIMER', time: Date.now(), timer: newTimerInput });
            console.log('START_TIMER message sent to background.js');
        

        } else { 
            console.log('Timer already active!');
        }
      });
    
});