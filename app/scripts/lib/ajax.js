import { BEER_API_URL, BEER_API_SEARCH_PREFIX } from "../constants";

export const ajaxSearch = (searchQuery) => {
    return new Promise((resolve, reject) => {
        const httpRequest = new XMLHttpRequest();
        // Replace all forward slashes with %20, remove all "-" and use lowercase
        const escapedQuery = searchQuery.replace(/\s{0,}\/\s{0,}/g, "%20").replace("-", "").toLowerCase();
        httpRequest.open("GET", `${BEER_API_URL}${BEER_API_SEARCH_PREFIX}${escapedQuery}`);
        httpRequest.send();
        httpRequest.onload = () => {
            if(httpRequest.status >= 200 && httpRequest.status < 300){
                resolve(JSON.parse(httpRequest.responseText));
            } else if(httpRequest.status === 404){
                resolve([]);
            } else {
                reject(httpRequest.status, httpRequest.statusText);
            }
        };
        httpRequest.onerror = () => {
            reject(httpRequest.status, httpRequest.statusText);
        };
    });
};

export const ajaxCreateBeer = (data) => {
    return new Promise((resolve, reject) => {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", `${BEER_API_URL}/beers/`, true);
        httpRequest.setRequestHeader("token", "E9BiNbg5vh1aTmraksRl7HBA5WF8NO");
        httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        httpRequest.send(data);
        httpRequest.onload = () => {
            if(httpRequest.status >= 200 && httpRequest.status < 300){
                resolve(JSON.parse(httpRequest.responseText));
            } else {
                reject(httpRequest.status, httpRequest.statusText);
            }
        };
        httpRequest.onerror = () => {
            reject(httpRequest.status, httpRequest.statusText);
        };
    });
};
