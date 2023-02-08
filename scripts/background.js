chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == "complete") {
    if (tab.url == "chrome://newtab/") {
      chrome.tabs.update(tabId, {url: "homepage.html"});
    }
  }
});

let timerTime;
let timerID;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  
  if (request.message === 'START_TIMER') {
    console.log('START_TIMER message received in background.js');
    timerActive = chrome.storage.sync.get(['timerActive']).value;
    timerTime = request.time;
    console.log('Timer start time will be: ' + timerTime + 'ms');
    if (timerActive === 'false') startTimer();
    else console.log('Timer already active!');
  }

  if (request.message === 'GET_TIMER') {
    sendResponse({time: timerTime});
  }

});

function startTimer() {
  chrome.storage.sync.set({ 'timerActive': 'true' });
  console.log('Timer started');
  timerID = setInterval(function() {
    timerTime = timerTime - 1000;
    if (timerTime <= 0) {
      clearInterval(timerID);
      chrome.storage.sync.set({ 'timerActive': 'false' });
      console.log('Timer stopped');
    }
    console.log('Timer active: ' + chrome.storage.sync.get(['timerActive']) 
    +' Timer: ' + timerTime + 'ms');
  }, 1000);
}