import { validatePrice, validateUrl, setTrackedItems } from "./util.mjs";

async function getPrice() {

}

function handleTrackClick(e) {
    var urlInput = document.getElementById('url');
    var thresholdInput = document.getElementById('threshold')
    if (urlInput && thresholdInput) {
        var url = urlInput.value;
        var threshold = thresholdInput.value;
        // if (!validatePrice(threshold)) {
        //     window.alert("Please enter a valid price");
        //     thresholdInput.value = "";
        //     return;
        // }
        // if (!validateUrl(url)) {
        //     window.alert("Please enter a valid url");
        //     urlInput.value = "";
        //     return;
        // }

        var trackedItemsList = document.getElementById('tracked-items');
        var trackItem = document.createElement("li");

        trackItem.innerHTML = `
            <span class="item-header">Tracked Item: ${url}</span>
            <div class="details">
                Threshold Price: ${threshold}
            </div>
        `;
        trackItem.addEventListener('click', () => {
            trackItem.classList.toggle('active');
        });

        if (trackedItemsList) {
            trackedItemsList.appendChild(trackItem);
            setTrackedItems(url, threshold);
        }

        urlInput.value = "";
        thresholdInput.value = "";

        fetch("https://www.trendyol.com/beybi/pn5-polyester-orme-nitril-is-eldiveni-1-cift-p-241997251?boutiqueId=61&merchantId=393383&sav=true", {
            method: "GET",
            headers: {
                'Content-Type': 'text/html'
            }
        }).then(data => {
            console.log("data", data)
        }).catch(e => console.log("error", e));
    }
}

function handleTrackCleanClick() {
    chrome.storage.local.clear(() => {
        console.log("the storage is cleared");
    });
    var trackedItems = document.getElementById('tracked-items');

    if (trackedItems) {
        trackedItems.textContent = '';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const trackedItemsList = document.getElementById('tracked-items');
    const trackedItems = await getTrackedItems();

    trackedItems.forEach(item => {
        var trackItem = document.createElement("li");

        trackItem.innerHTML = `
            <span class="item-header">Tracked Item: ${item.url}</span>
            <div class="details">
                Threshold Price: ${item.threshold}
            </div>
        `;
        trackItem.addEventListener('click', () => {
            trackItem.classList.toggle('active');
        });

        trackedItemsList.appendChild(trackItem);
    });
});


document.getElementById('track').addEventListener('click', handleTrackClick);
document.getElementById('clear-track').addEventListener('click', handleTrackCleanClick);