import React from "react";
import { render } from "react-dom";
import SearchResults from "./components/SearchResults";
import { SEARCH_KEY_NAME, REACT_ROOT_DIV_ID, BEER_API_URL, BEER_API_SEARCH_PREFIX } from "./constants";
import getCurrentSearchString from "./lib/getCurrentSearchString";

function search(){
    getCurrentSearchString((searchQuery) =>{
        createRootDiv(()=>{
            const httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = (data) => {
                // TODO: handle errors :)
                if(httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
                    const json = JSON.parse(httpRequest.responseText);
                    render(<SearchResults q={searchQuery} data={json}/>, document.getElementById(REACT_ROOT_DIV_ID));
                };
            };
            httpRequest.open("GET", `${BEER_API_URL}${BEER_API_SEARCH_PREFIX}${searchQuery}`);
            httpRequest.send();
        });
    });
}

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

search();

export default search;
