// Function to save data to Chrome storage
function saveToChromeStorage(key, value) {
    chrome.storage.sync.set({[key]: value});
}

// Function to get data from Chrome storage
function getFromChromeStorage(key, callback) {
    chrome.storage.sync.get([key], function(result) {
        callback(result[key]);
    });
}

// Checks if a chrome storage value is set
function checkIfAValueIsSet(value, defaultValue){
    if(value == undefined){
        return defaultValue;
    }
    else{
        return value;
    }
}

function checkIfOptionsAreSet(selectors, callback) {
    // On startup check if all the options are present and init them if necessary
    getFromChromeStorage("options", (options) => {
        options = checkIfAValueIsSet(options, {});
        let newOptions = {};

        selectors.forEach(sel => {
            if (options[sel] === undefined) {
                newOptions[sel] = true;
            }
            else {
                newOptions[sel] = options[sel];
            }
        });

        if (JSON.stringify(options) !== JSON.stringify(newOptions)) {
            saveToChromeStorage("options", newOptions);
        }
        if (callback) {
            callback(newOptions);
        }
    });
}