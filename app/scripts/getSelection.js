import setData from "./lib/setData";
import { SEARCH_KEY_NAME } from "./constants";

const selection = window.getSelection().toString();

if(selection.length > 0){
    setData(SEARCH_KEY_NAME, selection);
}
