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
    oldOptions = checkIfAValueIsSet(oldOptions, {});
    Object.keys(newOptions).forEach(key => {
        if (oldOptions[key] !== newOptions[key]) {
            changedOptions[key] = newOptions[key];
        }
    });
    return changedOptions;
}