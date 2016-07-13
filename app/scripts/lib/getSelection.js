import setSelection from "./setSelection";

const selection = window.getSelection().toString();

console.log("selection: ", selection);

if(selection.length > 0){
    setSelection(selection);
}
