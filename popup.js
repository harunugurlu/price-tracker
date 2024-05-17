function handleClick(e) {
    var urlInput = document.getElementById('url');
    var thresholdInput = document.getElementById('threshold')
    if(urlInput && thresholdInput) {
        var url = urlInput.value;
        var threshold = thresholdInput.value;
        console.log("input url", url);
        console.log("input threshold", threshold);
        if(!validatePrice(threshold)) {
            window.alert("Please enter a valid price");
            thresholdInput.value = "";
            return;
        }
        if(!validateUrl(url)) {
            window.alert("Please enter a valid url");
            urlInput.value = "";
            return;
        }
        
        var trackedItems = document.getElementById('tracked-items');
        var trackItem = document.createElement("li");
        
        trackItem.innerText = `Tracked Item: ${url} \nThreshold Price: ${threshold}`

        if(trackedItems) {
            trackedItems.appendChild(trackItem)
        }
    }
}

function validatePrice(price) {
    if(price < 0) {
        return false;
    }
    else return true;
}

function validateUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }
document.getElementById('track').addEventListener('click', handleClick);