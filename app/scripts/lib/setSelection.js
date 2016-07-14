import { SEARCH_KEY_NAME } from "../constants";
import getCurrentSearchString from "./getCurrentSearchString";
import search from "../search";

function setSelection(selectionText) {
    getCurrentSearchString((searchQuery) => {
        if (searchQuery === selectionText){
            search();
        } else {
            chrome.storage.local.set({[SEARCH_KEY_NAME]: selectionText}, function() {});
        }
    });
}

export default setSelection;
