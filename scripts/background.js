chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == "complete") {
    if (tab.url == "chrome://newtab/") {
      chrome.tabs.update(tabId, {url: "homepage.html"});
      
    }
  }
});