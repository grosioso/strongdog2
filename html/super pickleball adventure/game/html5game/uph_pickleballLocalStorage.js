function localStorageGetNumber(key) {
    return getGeneric(key, -1);
}

function localStorageGetString(key) {
    return getGeneric(key, "");
}

function getGeneric(key, def) {
    if (!localStorage) {
        console.log("[PICKLEBALL] localStorage is not available on get");
        return def;
    }
    try {
        const res = localStorage.getItem(key);
        if (res) {
            return res;
        } else {
            console.log("[PICKLEBALL] localStorage couldn't get item")
            return def;
        }
    } catch(e) {
        console.log("[PICKLEBALL] exception thrown in get: " + e)
        return def;
    }
}

function localStorageSetNumber(key, value) {
    setGeneric(key, value);
}

function localStorageSetString(key, value) {
    setGeneric(key, value);
}

function setGeneric(key, value) {
    if (!localStorage) {
        console.log("[PICKLEBALL] localStorage is not available on set");
        return;
    }
    try {
        localStorage.setItem(key, value);
    } catch(e) {
        console.log("[PICKLEBALL] exception thrown in set: " + e)
    }
}