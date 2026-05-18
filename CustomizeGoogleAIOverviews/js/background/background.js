// Import shared functions for use in the background script
importScripts("../shared/functions.js");

// Listen for the onInstalled event to open the welcome page on first install
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
        chrome.tabs.create({ url: chrome.runtime.getURL("welcome/index.html") });
    }
});


let selectors = ["#eKIzJc", ".n6owBd.awi2gc:has(.Q2WBBe.fQ8VVc.PVRc4d)", ".ofHStc.Dn7Fzd.OIPUDf", ".WTfRgd.CSBcfd"];

// On startup check if all the options are present and init them if necessary
getFromChromeStorage("options", (options) => {
    options = checkIfAValueIsSet(options, {});
    let newOptions = {};

    selectors.forEach(sel => {
        if (!options[sel]) {
            newOptions[sel] = false;
        }
        else {
            newOptions[sel] = true;
        }
    });

    if (JSON.stringify(options) !== JSON.stringify(newOptions)) {
        saveToChromeStorage("options", newOptions);
    }
});