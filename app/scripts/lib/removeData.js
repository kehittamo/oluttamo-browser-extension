import browserObject from "./browserObject";

function removeData(key) {
    return new Promise((resolve, reject) => {
        browserObject.storage.local.remove(key, () => {
            resolve(true);
        });
    });
}

export default removeData;
