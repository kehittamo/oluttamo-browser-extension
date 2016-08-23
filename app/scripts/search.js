import React from "react";
import { render } from "react-dom";
import SearchResults from "./components/SearchResults";
import { BEER_KEY_NAME, SEARCH_KEY_NAME, REACT_ROOT_DIV_ID } from "./constants";
import getData from "./lib/getData";
import setData from "./lib/setData";
import {ajaxSearch} from "./lib/ajax";

/*
* Search beer data from Oluttamo API
*/
function search(){
    let q = "";
    getData(SEARCH_KEY_NAME)
    .then((searchQuery) => {
        q = searchQuery;
        if(!searchQuery){
            throw{
                err: "no search query found!",
            };
        }
        return searchQuery;
    })
    .then((searchQuery) => {
        return getData(searchQuery);
    })
    .then((resultFromStorage) => {
        if(resultFromStorage && resultFromStorage.data){
            return resultFromStorage.data;
        } else {
            return ajaxSearch(q);
        }
    })
    .then((result) => {
        if(result.length === 0){
            addSearchResults(q, [], "404");
        } else {
            setData(BEER_KEY_NAME, {query: q, data: result, url: window.location.href});
            addSearchResults(q, result);
        }
    })
    .catch((err) => {
        // TODO: better error message
        console.error("Oh noes, something went wrong while fetching beers :(", err);
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
