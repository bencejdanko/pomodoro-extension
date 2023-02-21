
    document.getElementById('start-timer-button').addEventListener('click', wrap);

    function wrap() {
        chrome.storage.sync.get(['timerActive']).then((result) => {
            if (result.timerActive == 'false') {
                console.log("Timer not active, starting timer...");

                var task = document.getElementById('new-task-input').value;
                if (task == '') task = 'No task';
                chrome.storage.sync.set({ 'currentTask': task });
                console.log('Current task in storage set to ' + task);
                document.getElementById('current-task').innerHTML = task;

                var newTimerInput = document.getElementById('new-timer-input').value;
                chrome.storage.sync.set({ 'timer': newTimerInput });
                console.log('Timer in storage set to ' + newTimerInput + ' minutes');
                chrome.runtime.sendMessage({ message: 'START_TIMER', time: Date.now(), timer: newTimerInput });
                console.log('START_TIMER message sent to background.js');


            } else if (result.timerActive == 'true') {
                console.log('Timer already active!');
            } else {
                console.log('Error: Timer status not set, setting timer status to false');
                chrome.storage.sync.set({ timerActive: 'false' });
                console.log('Attempt to start timer again');
                wrap();
            }
        });
    }