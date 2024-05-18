import { validatePrice, validateUrl, setTrackedItems } from "./util";

function handleClick(e) {
    var urlInput = document.getElementById('url');
    var thresholdInput = document.getElementById('threshold')
    if (urlInput && thresholdInput) {
        var url = urlInput.value;
        var threshold = thresholdInput.value;
        if (!validatePrice(threshold)) {
            window.alert("Please enter a valid price");
            thresholdInput.value = "";
            return;
        }
        if (!validateUrl(url)) {
            window.alert("Please enter a valid url");
            urlInput.value = "";
            return;
        }

        var trackedItems = document.getElementById('tracked-items');
        var trackItem = document.createElement("li");

        trackItem.innerText = `Tracked Item: ${url} \nThreshold Price: ${threshold}`

        if (trackedItems) {
            trackedItems.appendChild(trackItem)
            setTrackedItems(url,threshold);
        }
    }
}


document.getElementById('track').addEventListener('click', handleClick);