import { SEARCH_KEY_NAME } from "../constants";
import browserObject from "./browserObject";

function getCurrentSearchString(cb) {
    browserObject.storage.local.get(SEARCH_KEY_NAME, (items) => {
        return cb(items[SEARCH_KEY_NAME]);
    });
}

export default getCurrentSearchString;
