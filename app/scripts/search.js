import React from "react";
import { render } from "react-dom";
import SearchResults from "./components/SearchResults";
import { SEARCH_KEY_NAME, REACT_ROOT_DIV_ID, BEER_API_URL, BEER_API_SEARCH_PREFIX } from "./constants";

chrome.storage.local.get(SEARCH_KEY_NAME, (items) => {
    console.log("Search: ",items[SEARCH_KEY_NAME]);
    createRootDiv(()=>{
        const httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = (data) => {
            if(httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
                const json = JSON.parse(httpRequest.responseText);
                render(<SearchResults data={json}/>, document.getElementById(REACT_ROOT_DIV_ID));
            };
        };
        httpRequest.open("GET", `${BEER_API_URL}${BEER_API_SEARCH_PREFIX}${items[SEARCH_KEY_NAME]}`);
        httpRequest.send();
    });
});


const createRootDiv = (cb) => {
    const elementExists = document.getElementById(REACT_ROOT_DIV_ID);
    if(!elementExists){
        let g = document.createElement("div");
        g.id = REACT_ROOT_DIV_ID;
        document.body.insertBefore(g, document.body.firstChild);
        return cb();
    } else {
        return cb();
    }
};