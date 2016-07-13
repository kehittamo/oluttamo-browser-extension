import setSelection from "./setSelection";

export default function createMenu() {
    const menus = [
        { id: "search-beer", title: "Search beer: " },
    ];
    let shortcuts = {};
    chrome.commands.getAll(commands => {
        commands.forEach(({ name, shortcut }) => {
            shortcuts[name] = shortcut;
        });
    });
    menus.forEach(({ id, title }) => {
        chrome.contextMenus.create({
            id: id,
            title: title + "%s",
            contexts: ["selection"],
        });
    });
}

chrome.contextMenus.onClicked.addListener(({ menuItemId, selectionText }) => {
    setSelection(selectionText);
});
