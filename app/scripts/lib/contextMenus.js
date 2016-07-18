import browserObject from "./browserObject";
import setData from "./setData";
import { SEARCH_KEY_NAME } from "../constants";

export default function createMenu() {
    const menus = [
        { id: "search-beer", title: "Search beer: " },
    ];
    let shortcuts = {};
    browserObject.commands.getAll(commands => {
        commands.forEach(({ name, shortcut }) => {
            shortcuts[name] = shortcut;
        });
    });
    menus.forEach(({ id, title }) => {
        browserObject.contextMenus.create({
            id: id,
            title: title + "%s",
            contexts: ["selection"],
        });
    });
}

browserObject.contextMenus.onClicked.addListener(({ menuItemId, selectionText }) => {
    setData(SEARCH_KEY_NAME, selectionText);
});
