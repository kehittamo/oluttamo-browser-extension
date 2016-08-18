import { SEARCH_RESULTS_OPEN_KEY_NAME, SEARCH_KEY_NAME, BEER_KEY_NAME } from "../constants";
import getData from "./getData";
import search from "../search";
import browserObject from "./browserObject";

function setData(key, data) {
    switch (key) {
    case BEER_KEY_NAME:
        browserObject.storage.local.set({[BEER_KEY_NAME]: data}, function() {});
        browserObject.storage.local.set({[data.query]: data}, function() {});
        break;

    case SEARCH_KEY_NAME:
        getData((SEARCH_KEY_NAME))
        .then((searchQuery) => {
            if (searchQuery === data){
                search();
            } else {
                browserObject.storage.local.set({[SEARCH_KEY_NAME]: data}, function() {});
            }
        })
        .catch((err) => {
            console.error(err);
        });
        break;
    }
}

export default setData;
