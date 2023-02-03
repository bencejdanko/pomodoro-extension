chrome.storage.sync.set({
  timer: 25,
  goal: "Work on my project"
}, function() {
  console.log("Default values for timer and goal have been set in sync storage.");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == "complete") {
    if (tab.url == "chrome://newtab/") {
      chrome.tabs.update(tabId, {url: "local/block.html"});
    }
  }
});

// Check the status of the timer
chrome.storage.local.get(['timerActive'], function(result) {
  if (result.timerActive) {
    chrome.storage.local.get(['blockedWebsites'], function(result) {
      var blockedWebsites = result.blockedWebsites;
      
      // Check the URL
      chrome.webNavigation.onCommitted.addListener(function(details) {
        if (blockedWebsites.includes(details.url)) {
          chrome.tabs.update({url: 'block.html'});
        }
      });
    });
  }
});