chrome.storage.sync.get(['blockedWebsites'], function (result) {
    var blockedWebsites = result.blockedWebsites || [];

    // Generate the list of blocked websites
    var blockedWebsitesList = document.getElementById('blocked-websites-list');
    for (var i = 0; i < blockedWebsites.length; i++) {
        var website = blockedWebsites[i];
        var item = document.createElement('li');
        item.textContent = website;
        blockedWebsitesList.appendChild(item);
    }
  });