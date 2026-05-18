// Import shared functions for use in the background script
importScripts("../shared/functions.js");

// Listen for the onInstalled event to open the welcome page on first install
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
        chrome.tabs.create({ url: chrome.runtime.getURL("welcome/index.html") });
    }
});


let selectors = ["#eKIzJc", ".n6owBd.awi2gc:has(.Q2WBBe.fQ8VVc.PVRc4d)", ".ofHStc.Dn7Fzd.OIPUDf", ".WTfRgd.CSBcfd"];

checkIfOptionsAreSet(selectors);