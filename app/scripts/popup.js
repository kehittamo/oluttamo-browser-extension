"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                if(chrome.tabs){
                    chrome.tabs.create({active: true, url: location});
                } else if(browser.tabs){
                    browser.tabs.create({active: true, url: location});
                }
            };
        })();
    }
});
