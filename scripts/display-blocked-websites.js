var textArea = document.getElementById('blocked-websites');


chrome.storage.sync.get(['blockedWebsites'], function (result) {
    var blockedWebsites = result.blockedWebsites || [];
    for (var i = 0; i < blockedWebsites.length; i++) {
        textArea.innerHTML += blockedWebsites[i] + '\n';
    }
});

textArea.addEventListener('change', function (event) {
    console.log("Blocked websites changed");
    var blockedWebsites = textArea.value.split('\n');

    for (var i = 0; i < blockedWebsites.length; i++) {
        if (!blockedWebsites[i].startsWith('https://')) {
            blockedWebsites[i] = 'https://' + blockedWebsites[i];
        }
    }
    chrome.storage.sync.set({ blockedWebsites: blockedWebsites });
});