let _STORE_KEY_ = '_RIDER_LIST_';

function saveRiderList (riderList) {
    try {
        let contentString = JSON.stringify(riderList);
        window.localStorage.setItem(_STORE_KEY_, contentString);
        return true;
    } catch (e) {
        return false;
    }
}

function loadRiderList () {
    let contentString = window.localStorage.getItem(_STORE_KEY_);

    try {
        return JSON.parse(contentString);
    } catch (e) {
        return null;
    }
}

export {
    saveRiderList,
    loadRiderList
};
