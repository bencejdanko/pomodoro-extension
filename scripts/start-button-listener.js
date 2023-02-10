document.getElementById('start-timer-button').addEventListener('click', function () {

    chrome.storage.sync.get(['timerActive']).then((result) => {
        if (response === 'false') {
            console.log("Timer not active, starting timer...");

            var task = document.getElementById('new-task-input').value;
            if (task === '') task = 'No task';
            chrome.storage.sync.set({ 'currentTask': task });
            console.log('Current task in storage set to ' + task);
            document.getElementById('current-task').innerHTML = task;

            var newTimerInput = document.getElementById('new-timer-input').value;
            chrome.storage.sync.set({ 'timer': newTimerInput });
            console.log('Timer in storage set to ' + newTimerInput + ' minutes');
            chrome.runtime.sendMessage({ message: 'START_TIMER', time: Date.now(), timer: newTimerInput });
            console.log('START_TIMER message sent to background.js');
        

        } else if (response === 'true') { 
            console.log('Timer already active!');
        } else {
            console.log('Error: Timer status not set');
        }
      });
    
});