function selectAiOverviewElement() {
    return document.querySelector("#eKIzJc");
}

// Variables
let removeGoogleAIOverviews = true;
let hideInterval;

// Function to hide or show the AI overview element
function hideShowAIOverview(hide = true) {
    const aiOverviewElement = selectAiOverviewElement();
    if (aiOverviewElement) {
        if (hide) {
            aiOverviewElement.style.display = "none";
        }
        else {
            aiOverviewElement.style.display = "";
        }
    }
    else {
        // If element is not found, wait for it to appear and then hide or show it
        // Clear any existing interval to avoid multiple intervals running
        if (hideInterval) {
            clearInterval(hideInterval);
        }
        hideInterval = setInterval(() => {
            const aiOverviewElement = selectAiOverviewElement();
            if (aiOverviewElement) {
                if (hide) {
                    aiOverviewElement.style.display = "none";
                } 
                else {
                    aiOverviewElement.style.display = "";
                }
                clearInterval(hideInterval); 
            }
        }, 100);
    }
}

// Initial call to hide the AI overview element before checking the storage value
// Storage value takes time to load, so we hide it initially
hideShowAIOverview(true);

// Get the value from Chrome storage
getFromChromeStorage("removeGoogleAIOverviews", (value) => {
    removeGoogleAIOverviews = checkIfAValueIsSet(value, true);

    if (value !== undefined) {
        // Save the value if it is not set
        saveToChromeStorage("removeGoogleAIOverviews", removeGoogleAIOverviews);
    }

    // Remove the AI overview if the setting is enabled
    hideShowAIOverview(removeGoogleAIOverviews);
});

// Listen for changes in Chrome storage to update the page
// If value changes, reload the page
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.removeGoogleAIOverviews) {
        const newValue = changes.removeGoogleAIOverviews.newValue;
        if (newValue !== removeGoogleAIOverviews) {
            removeGoogleAIOverviews = newValue;
            // Hide or show the AI overview element based on the new value
            hideShowAIOverview(removeGoogleAIOverviews);
        }
    }
});