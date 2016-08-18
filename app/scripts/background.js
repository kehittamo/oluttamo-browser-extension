"use strict";

import { BEER_KEY_NAME, SEARCH_KEY_NAME, OLUTTAMO_SEARCH_SHORTCUT } from "./constants";

// Enable chromereload by uncommenting this line:
// import "./lib/livereload";

import createMenu from "./lib/contextMenus";
import browserObject from "./lib/browserObject";

if(browserObject.runtime.onInstalled){
    browserObject.runtime.onInstalled.addListener((details) => {
        createMenu();
    });
}

browserObject.commands.onCommand.addListener(shortcut => {
    if (shortcut === OLUTTAMO_SEARCH_SHORTCUT){
        // setBadgeDetails("...", "#8CF0C8");
        if(browserObject.tabs){
            browserObject.tabs.executeScript(null, {
                file: "./scripts/getSelection.js",
                runAt: "document_end",
            });
        }
    }
});

browserObject.storage.onChanged.addListener((changes, namespace) => {
    if (changes[SEARCH_KEY_NAME] && changes[SEARCH_KEY_NAME].newValue !== ""){
        // setBadgeDetails("...", "#8CF0C8");
        browserObject.tabs.executeScript(null, {
            file: "./scripts/search.js",
            runAt: "document_end",
        });
    } else if (changes[BEER_KEY_NAME]){
        // setBadgeDetails("<3", "#9669AF");
    }
});

function setBadgeDetails(text, color){
    browserObject.browserAction.setBadgeText({text: text});
    browserObject.browserAction.setBadgeBackgroundColor({color: color});
}
