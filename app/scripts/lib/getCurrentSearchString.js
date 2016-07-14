import { SEARCH_KEY_NAME } from "../constants";

function getCurrentSearchString(cb) {
    chrome.storage.local.get(SEARCH_KEY_NAME, (items) => {
        return cb(items[SEARCH_KEY_NAME]);
    });
}

export default getCurrentSearchString;
