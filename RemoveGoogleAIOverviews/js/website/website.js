let intervalId;
let timeSince = 0;
const timeToKill = 10000;

// Interval to check for the AI overview element
intervalId = setInterval(() => {
    const aiOverviewElement = document.querySelector("#eKIzJc");
    timeSince += 100;

    // Check if the AI overview element is present
    if (aiOverviewElement) {
       clearInterval(intervalId);

        getFromChromeStorage("options", (options) => {
            updateFromOptions(options);
        });
    }

    // Kill the interval if the AI overview element is not found within the time limit
    if (timeSince >= timeToKill) {
        clearInterval(intervalId);
    }
}, 100);

// Listen for changes to the Chrome storage
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.options) {
        const newValue = changes.options.newValue;
        const oldValue = changes.options.oldValue;

        // Compare oldValue and newValue to determine what changed
        const changedOptions = findOptionsThatChanged(oldValue, newValue);
        if (Object.keys(changedOptions).length > 0) {
            // Handle the change
            updateFromOptions(changedOptions);
        }
    }
});