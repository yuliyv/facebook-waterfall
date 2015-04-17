var extensionURL = function(relativeURL){
    if(window.chrome !== undefined){
        // Chrome extension
        return chrome.extension.getURL(relativeURL);
    }else{
        // Firefox extension
        return self.options.urls[relativeURL];
    }
};

chrome.storage.sync.get({
    overlayText: 'time is running out',
    overlayStyle: '',
    imageUrl: null,
    future: "01/27/2100",
    useCountdown: false,
    countdownText: "until...",
    countdownStyle: '',
    hideLeft: false,
    hideRight: false,
    hideComposer: false,
    hideTop: false,
    hideTrending: true,
    hideTicker: true
}, function(items) {
    // This delay ensures that the elements have been created by Facebook's
    // scripts before we attempt to replace them
    setInterval(function(){
        /**
         * HTML for the Waterfall and countdown timer.  Here is where we need to insert the waterfall overlay text.
         * @type {string}
         */
        var waterHTML = "<div class='waterfall' style='" + items.overlayStyle + "'>" + items.overlayText + "</div>" +
            "<div id='futureCountdown' class='ticker' style='" + items.countdownStyle + "'></div>";

        /**
         * Generate the DIV for displaying the waterfall div which will replace the newsfeed.
         * @type {*|jQuery|HTMLElement}
         */
        var waterDiv = $(waterHTML);

        // Replace the news feed
        $("div#pagelet_home_stream").replaceWith(waterDiv);
        $("div[id^='topnews_main_stream']").replaceWith(waterDiv);

        // Fade in the waterfall
        var waterfalls = $(".waterfall");
        waterfalls.fadeIn(2000, function(){
            $("#futureCountdown").fadeIn(1000, function() {});
        });

        // Update the background image of the waterfall if there is a custom image URL specified
        if (items.imageUrl) {
            waterfalls.css('background-image', 'url("' + items.imageUrl + '")');
        }

        // Fade out and delete the top bar
        if (items.hideTop) {
            $("#pagelet_bluebar").fadeOut( "fast", function() {
                $("#pagelet_bluebar").remove();
            });
        }

        // Fade out and delete the ticker
        if (items.hideTicker) {
            $("div#pagelet_ticker").remove();
        }

        // Fade out and delete the right column
        if (items.hideRight) {
            $("#rightCol").fadeOut( "fast", function() {
                $("#rightCol").remove();
            });
        }

        // Fade out and delete the left column
        if (items.hideLeft) {
            $("#leftCol").fadeOut("fast", function() {
                $("#leftCol").remove();
            });
        }

        // Fade out and delete the post composer
        if (items.hideComposer) {
            $("#pagelet_composer").fadeOut("fast", function() {
                $("#pagelet_composer").remove();
            });
        }

        // Fade out and delete the trending box
        if (items.hideTrending) {
            $("div#pagelet_trending_tags_and_topics").remove();
        }

        // If we are using the countdown timer then we need to setup and interval to countdown to the future date.
        if (items.useCountdown && document.getElementById("futureCountdown")) {
            var target_date = new Date(items.future).getTime();

            // variables for time units
            var days, hours, minutes, seconds;

            // update the tag with id "countdown" every 1 second
            setInterval(function () {
                // get tag element
                var countdown = document.getElementById("futureCountdown");

                // find the amount of "seconds" between now and target
                var current_date = new Date().getTime();
                var seconds_left = (target_date - current_date) / 1000;

                // do some time calculations
                days = parseInt(seconds_left / 86400);
                seconds_left = seconds_left % 86400;

                hours = parseInt(seconds_left / 3600);
                seconds_left = seconds_left % 3600;

                minutes = parseInt(seconds_left / 60);
                seconds = parseInt(seconds_left % 60);

                // format countdown string + set tag value
                var countdownSlice = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
                if (countdown) {
                    countdown.innerHTML = items.countdownText + "<br>" + countdownSlice;
                }
            }, 1000);
        }
    }, 1000);
});


