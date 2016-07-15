"use strict";

import { BEER_KEY_NAME, SEARCH_KEY_NAME, OLUTTAMO_SEARCH_SHORTCUT } from "./constants";

// Enable chromereload by uncommenting this line:
import "./lib/livereload";

import createMenu from "./lib/contextMenus";

chrome.runtime.onInstalled.addListener((details) => {
    createMenu();
});

chrome.commands.onCommand.addListener(shortcut => {
    if (shortcut === OLUTTAMO_SEARCH_SHORTCUT){
        setBadgeDetails("...", "#8CF0C8");
        chrome.tabs.executeScript(null, {
            file: "./scripts/getSelection.js",
            runAt: "document_end",
        });
    }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes[SEARCH_KEY_NAME]){
        setBadgeDetails("...", "#8CF0C8");
        chrome.tabs.executeScript(null, {
            file: "./scripts/search.js",
            runAt: "document_end",
        });
    } else if (changes[BEER_KEY_NAME]){
        setBadgeDetails("<3", "#9669AF");
    }
});

function setBadgeDetails(text, color){
    chrome.browserAction.setBadgeText({text: text});
    chrome.browserAction.setBadgeBackgroundColor({color: color});
}
