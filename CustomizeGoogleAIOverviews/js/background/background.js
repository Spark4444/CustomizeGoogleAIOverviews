chrome.runtime.onInstalled.addListener((details) => {
    chrome.tabs.create({ url: chrome.runtime.getURL("welcome/index.html") });
});