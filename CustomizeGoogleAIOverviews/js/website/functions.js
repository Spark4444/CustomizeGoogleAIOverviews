// Function to show/hide an element based on shouldShow boolean
function showHide(element, shouldShow) {
    element.style.display = shouldShow ? "" : "none";
}

// Function to show/hide elements based on options
function showHideElement(selector, shouldShow) {
    const elements = document.querySelectorAll(selector);
    if (elements && elements.length > 0) {
        elements.forEach(element => {
            showHide(element, shouldShow);
        });
    } else {
        // Observer
        observeForSelector(selector, (els) => {
            els.forEach(el => showHide(el, shouldShow));
        });
    }
}

// Function to find the main section element of the video element
function FindParent(element) {
    let parentElement = element;
    while (parentElement) {
        if (parentElement.classList.contains("n6owBd") && parentElement.classList.contains("awi2gc")) {
            return parentElement;
        }
        parentElement = parentElement.parentElement;
    }
    return null;
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

        // If the selector is for the video element then get the 3rd parent element
        if (selector === ".Q2WBBe.fQ8VVc.PVRc4d") {
            const videoElements = document.querySelectorAll(selector);
            if (videoElements && videoElements.length > 0) {
                videoElements.forEach(videoElement => {
                    const parentElement = FindParent(videoElement);
                    if (parentElement) {
                        showHide(parentElement, value);
                    }
                });
            }
            else {
                // Observer
                observeForSelector(selector, (els) => {
                    els.forEach(videoElement => {
                        const parentElement = FindParent(videoElement);
                        if (parentElement) {
                            showHide(parentElement, value);
                        }
                    });
                });
            }
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