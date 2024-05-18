export function setTrackedItems(url, threshold) {
    chrome.storage.local.get("trackedItems").then((result) => {
        let trackedItems = result.trackedItems || [];
        if (!Array.isArray(trackedItems)) {
            trackedItems = [];
        }
        trackedItems.push({ url: url, threshold: threshold });
        chrome.storage.local.set({ trackedItems: trackedItems }).then(() => {
            console.log("The value is set as", trackedItems);
            return trackedItems;
        });
    });
}

export function validatePrice(price) {
    if (price < 0) {
        return false;
    }
    else return true;
}

export function validateUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

export function getTrackedItems() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("trackedItems").then(result => {
            // console.log("getTrackedItems result", result);
            if (result.trackedItems) {
                resolve(result.trackedItems);
            } else {
                resolve([]);
            }
        }).catch(error => {
            console.error("Error getting tracked items:", error);
            reject(error);
        });
    });
}
