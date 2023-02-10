chrome.storage.sync.get(['blockedWebsites'], function (result) {
    var blockedWebsites = result.blockedWebsites || [];
    for (var i = 0; i < blockedWebsites.length; i++) {
        document.getElementById('blocked-websites').innerHTML += blockedWebsites[i] + '\n';
    }
  });