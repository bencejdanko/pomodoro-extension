chrome.storage.sync.set({
  timer: 25,
  currentTask: "Work on my project",
  blockedWebsites: ["https://www.youtube.com/", "https://www.facebook.com/", "https://www.instagram.com/", "https://www.reddit.com/", "https://www.twitter.com/"]
  ,timerActive: 'false',
}, function() {
  console.log("Default values for timer and goal have been set in sync storage.");
});

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
    timerTime = request.timer * 60000; // Convert minutes to milliseconds
    startTimer();
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
  }, 1000);
}