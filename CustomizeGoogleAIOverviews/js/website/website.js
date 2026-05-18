const isSearchResultsPage = window.location.pathname === "/search" &&
    new URLSearchParams(window.location.search).has("q");

if (isSearchResultsPage) {
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
}