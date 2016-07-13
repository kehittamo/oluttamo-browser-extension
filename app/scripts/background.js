"use strict";

import { SEARCH_KEY_NAME } from "./constants";

// Enable chromereload by uncommenting this line:
import "./lib/livereload";

import createMenu from "./lib/contextMenus";

chrome.runtime.onInstalled.addListener(function (details) {
    createMenu();
});

chrome.commands.onCommand.addListener(shortcut => {
    console.log("shortcut: ", shortcut);
    chrome.tabs.executeScript(null, {
        file: "./scripts/getSelection.js",
        runAt: "document_end",
    });
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    console.log("namespace: ", namespace);
    console.log("changes: ", changes);
    chrome.storage.local.get(SEARCH_KEY_NAME, (items) => {
        console.log(`Value: ${items[SEARCH_KEY_NAME]}`);
        chrome.tabs.executeScript(null, {
            file: "./scripts/search.js",
            runAt: "document_end",
        });
    });
});
