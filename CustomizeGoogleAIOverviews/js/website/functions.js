const styleTagId = "CGAIOHideStyles";
const hiddenSelectorState = {};

// Function to get or create the style tag for hiding elements
function getOrCreateHideStyleTag() {
    let styleTag = document.getElementById(styleTagId);

    if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = styleTagId;
        (document.head || document.documentElement).appendChild(styleTag);
    }

    return styleTag;
}

// Helper to observe the DOM until a selector has matching elements, then run callback and disconnect since not all of the ai overview elements may be present initially
function observeForSelector(selector, cb) {
    const runCheck = () => {
        const found = document.querySelectorAll(selector);
        if (found && found.length > 0) {
            cb(found);
            return true;
        }
        return false;
    };

    // If already present, run immediately
    if (runCheck()) return;

    const observer = new MutationObserver((mutations, obs) => {
        if (runCheck()) {
            obs.disconnect();
        }
    });

    observer.observe(document.documentElement || document.body, { childList: true, subtree: true });
}

// Function to update the UI based on options
function updateFromOptions(options) {
    options = checkIfAValueIsSet(options, {});
    Object.entries(options).forEach(([selector, value]) => {
        // All selectors now use the style tag system, including the video element
        hiddenSelectorState[selector] = value;
        const styleTag = getOrCreateHideStyleTag();
        const hiddenSelectors = Object.keys(hiddenSelectorState).filter(selector => hiddenSelectorState[selector] === true);

        styleTag.textContent = hiddenSelectors
        .map(selector => {
            return `${selector} { display: none !important; }`;
        })
        .join("\n");
    });
}

// Optimization function to find changed options and only update those
function findOptionsThatChanged(oldOptions, newOptions) {
    const changedOptions = {};
    Object.keys(newOptions).forEach(key => {
        if (oldOptions[key] !== newOptions[key]) {
            changedOptions[key] = newOptions[key];
        }
    });
    return changedOptions;
}