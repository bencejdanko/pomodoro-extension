let timerTime;
let timerID;

chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.sync.set({timerActive: 'false'});
    chrome.storage.sync.set({blockedWebsites: ['https://www.youtube.com/', 'https://www.facebook.com/', 'https://www.instagram.com/', 'https://www.reddit.com/', 'https://www.netflix.com/', 'https://www.twitch.tv/']});
    console.log("Default settings set");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

   chrome.storage.sync.get(['timerActive']).then((result) => {

    if (tab.url == "chrome://newtab/") { 
      chrome.tabs.update(tabId, {url: "homepage.html"});
   } else if (result.timerActive == 'true') {
      console.log("Timer is active! Checking if blocked website is visited...")
        chrome.storage.sync.get(['blockedWebsites'], function(result) {
          if (result.blockedWebsites.includes(tab.url)) {
            console.log("Blocked website is visited!");
            chrome.tabs.update(tabId, {url: "homepage.html"});
          }
        });
      } else if (result.timerActive == 'false') {
        console.log("Timer is not active - no action taken for blocking websites");
      }
    });
  });
  //}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  
  if (request.message === 'START_TIMER') {
    console.log('START_TIMER message received in background.js');
    timerTime = request.timer * 60000; // Convert minutes to milliseconds
    startTimer();
  }

  if (request.message === 'GET_TIMER') {
    (async () => {
    sendResponse({time: timerTime});
    })();
    return true;
  }

});

function startTimer() {
  chrome.storage.sync.set({timerActive: 'true'});
  console.log('Timer started! Timer is now active');
  timerID = setInterval(function() {
    timerTime = timerTime - 1000;
    if (timerTime <= 0) {
      clearInterval(timerID);
      chrome.storage.sync.set({timerActive: 'true'});
      console.log('Timer stopped! Timer is now inactive');
    } 
  }, 1000);
}