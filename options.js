/**
 * Saves options to chrome.storage.sync.
 */
function save_options() {
    var overlayText    = document.getElementById('overlayText').value;
    var overlayStyle   = document.getElementById('overlayStyle').value;
    var imageUrl       = document.getElementById('imageUrl').value;
    var future         = document.getElementById('future').value;
    var countdownText  = document.getElementById('countdownText').value;
    var useCountdown   = document.getElementById('useCountdown').checked;
    var countdownStyle = document.getElementById('countdownStyle').value;
    var hideLeft       = document.getElementById('hideLeft').checked;
    var hideRight      = document.getElementById('hideRight').checked;
    var hideComposer   = document.getElementById('hideComposer').checked;
    var hideTop        = document.getElementById('hideTop').checked;
    var hideTrending   = document.getElementById('hideTrending').checked;
    var hideTicker     = document.getElementById('hideTicker').checked;
    chrome.storage.sync.set({
        overlayText: overlayText,
        overlayStyle: overlayStyle,
        imageUrl: imageUrl,
        future: future,
        useCountdown: useCountdown,
        countdownText: countdownText,
        countdownStyle: countdownStyle,
        hideLeft: hideLeft,
        hideRight: hideRight,
        hideComposer: hideComposer,
        hideTop: hideTop,
        hideTrending: hideTrending,
        hideTicker: hideTicker
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}


/**
 * Restores select box and checkbox state using the preferences stored in chrome.storage.
 */
function restore_options() {
    chrome.storage.sync.get({
        overlayText: 'time is running out',
        overlayStyle: '',
        imageUrl: null,
        future: "01/27/2100",
        useCountdown: false,
        countdownText: null,
        countdownStyle: '',
        hideLeft: false,
        hideRight: false,
        hideComposer: false,
        hideTop: false,
        hideTrending: true,
        hideTicker: true
    }, function(items) {
        document.getElementById('overlayText').value    = items.overlayText;
        document.getElementById('overlayStyle').value   = items.overlayStyle;
        document.getElementById('imageUrl').value       = items.imageUrl;
        document.getElementById('future').value         = items.future;
        document.getElementById('useCountdown').checked = items.useCountdown;
        document.getElementById('countdownStyle').value = items.countdownStyle;
        document.getElementById('countdownText').value  = items.countdownText;
        document.getElementById('hideLeft').checked     = items.hideLeft;
        document.getElementById('hideRight').checked    = items.hideRight;
        document.getElementById('hideComposer').checked = items.hideComposer;
        document.getElementById('hideTop').checked      = items.hideTop;
        document.getElementById('hideTrending').checked = items.hideTrending;
        document.getElementById('hideTicker').checked   = items.hideTicker;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);