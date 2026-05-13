let selectors = ["#eKIzJc", ".Q2WBBe.fQ8VVc.PVRc4d", ".ofHStc.Dn7Fzd.OIPUDf"];

function showHide(element, shouldShow) {
    element.style.display = shouldShow ? "" : "none";
}
// Function to show/hide elements based on options
function showHideElement(selector, shouldShow) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        showHide(element, shouldShow);
    });
}

// Function to get the nth parent element
function getParentElementLoop(element, times) {
    let currentElement = element;
    for (let i = 0; i < times; i++) {
        currentElement = currentElement.parentElement;
        if (!currentElement) break;
    }
    return currentElement;
}

// Function to update the UI based on options
function updateFromOptions(options) {
    options = checkIfAValueIsSet(options, {});
    Object.entries(options).forEach(([selector, value]) => {

        // If the selector is for the video element then get the 3rd parent element
        if (selector === ".Q2WBBe.fQ8VVc.PVRc4d") {
            const videoElements = document.querySelectorAll(selector);
            videoElements.forEach(videoElement => {
                const parentElement = getParentElementLoop(videoElement, 3);
                if (parentElement) {
                    showHide(parentElement, value);
                }
            });
        }
        else {
            showHideElement(selector, value);
        }
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