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
    chrome.storage.local.get("trackedItems").then(result => {
        if(result.trackedItems) {
            return result.trackedItems;
        }
        else return null;
    })
}