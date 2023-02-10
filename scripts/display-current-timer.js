var display = document.getElementById('current-timer');
var count;

chrome.runtime.sendMessage({message: "GET_TIMER"}, function(response) {
    count = response.time || 0;
    var countdown = setInterval(function() {
        var minutes = Math.floor((count % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((count % (1000 * 60)) / 1000);
        display.innerHTML = minutes + "m " + seconds + "s ";
        count = count - 1000;

        if (count < 0) {
            clearInterval(countdown);
            chrome.storage.sync.clear();
        }

    }, 1000);

});