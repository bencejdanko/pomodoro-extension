// Check the status of the timer
chrome.storage.local.get(['timerActive'], function(result) {
  if (result.timerActive) {
    // Get the list of blocked websites
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

// Set the timer
chrome.storage.local.set({timerActive: true}, function() {
  setTimeout(function() {
    chrome.storage.local.set({timerActive: false});
  }, userSpecifiedTime);
});