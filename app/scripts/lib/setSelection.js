import { SEARCH_KEY_NAME } from "../constants";

function setSelection(selectionText) {
    chrome.storage.local.set({[SEARCH_KEY_NAME]: selectionText}, function() {});
}

export default setSelection;
