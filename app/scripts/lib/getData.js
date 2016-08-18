import { SEARCH_KEY_NAME } from "../constants";
import browserObject from "./browserObject";
const getData = (key) => {
    return new Promise((resolve, reject) => {
        browserObject.storage.local.get(key, (items) => {
            resolve(items[key]);
        });
    });
};

export default getData;
