import React from "react";
import { render } from "react-dom";
import SearchResults from "./components/SearchResults";
import { BEER_KEY_NAME, SEARCH_KEY_NAME, REACT_ROOT_DIV_ID } from "./constants";
import getCurrentSearchString from "./lib/getCurrentSearchString";
import setData from "./lib/setData";
import ajaxSearch from "./lib/ajaxSearch";

/*
* Search beer data from Oluttamo API
*/
function search(){
    getCurrentSearchString((searchQuery) =>{
        if(searchQuery){
            ajaxSearch(searchQuery)
            .then((result) => {
                if(result.length === 0){
                    addSearchResults(searchQuery, [], "404");
                } else {
                    setData(BEER_KEY_NAME, {query: searchQuery, data: result, url: window.location.href});
                    addSearchResults(searchQuery, result);
                }
            })
            .catch((err) => {
                // TODO: better error message
                console.error("Oh noes, something went wrong while fetching beers :(", err);
            });
        }
    });
}

// render search results react element
function addSearchResults(searchQuery, data, error=false){
    createRootDiv(()=>{
        render(<SearchResults q={searchQuery} data={data} error={error}/>, document.getElementById(REACT_ROOT_DIV_ID));
    });
}

// Create react root div it doesn't exist yet
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
