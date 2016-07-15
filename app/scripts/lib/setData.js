import { SEARCH_RESULTS_OPEN_KEY_NAME, SEARCH_KEY_NAME, BEER_KEY_NAME } from "../constants";
import getCurrentSearchString from "./getCurrentSearchString";
import search from "../search";

function setData(key, data) {
    switch (key) {
    case BEER_KEY_NAME:
        chrome.storage.local.set({[BEER_KEY_NAME]: data}, function() {});
        break;

    case SEARCH_KEY_NAME:
        getCurrentSearchString((searchQuery) => {
            if (searchQuery === data){
                search();
            } else {
                chrome.storage.local.set({[SEARCH_KEY_NAME]: data}, function() {});
            }
        });
        break;
    }
}

export default setData;
