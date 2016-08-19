import { BEER_API_URL, BEER_API_SEARCH_PREFIX } from "../constants";

const ajaxSearch = (searchQuery) => {
    return new Promise((resolve, reject) => {
        const httpRequest = new XMLHttpRequest();
        // Replace all forward slashes with %20 and use lowercase
        const escapedQuery = searchQuery.replace(/\s{0,}\/\s{0,}/g, "%20").toLowerCase();
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

export default ajaxSearch;
