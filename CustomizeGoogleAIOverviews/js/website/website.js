const timeToKill = 10000; 

// Replace polling setInterval with MutationObserver
let observer = new MutationObserver((mutations, obs) => {
    const aiOverviewElement = document.querySelector("#eKIzJc");
    if (aiOverviewElement) {
        obs.disconnect();

        getFromChromeStorage("options", (options) => {
            updateFromOptions(options);
        });
    }
});

observer.observe(document.documentElement || document.body, { childList: true, subtree: true });

// Fallback to stop observing after timeToKill milliseconds
setTimeout(() => {
    observer.disconnect();
}, timeToKill);

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