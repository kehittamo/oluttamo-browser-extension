import setSelection from "./lib/setSelection";

const selection = window.getSelection().toString();

if(selection.length > 0){
    setSelection(selection);
}
