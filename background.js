// const STORAGE_KEY = "user-preference-alarm-enabled";

async function checkAlarmState() {
    //   const { alarmEnabled } = await chrome.storage.get(STORAGE_KEY);

    //   if (alarmEnabled) {
    //     const alarm = await chrome.alarms.get("demo-alarm");

    //     if (!alarm) {
    //       await chrome.alarms.create({ periodInMinutes: 0.5 });
    //     }
    //   }
    console.log("alarm state check")
    await chrome.alarms.create('demo-alarm', {
        periodInMinutes: 10
    })
}

checkAlarmState();


chrome.alarms.onAlarm.addListener((alarm) => {
    var urlInput = document.getElementById('url');
    var thresholdInput = document.getElementById('threshold')
    if (urlInput && thresholdInput) {
        var url = urlInput.value;
        var threshold = thresholdInput.value;
        
        console.log("input url", url);
        console.log("input threshold", threshold);

        var trackedItems = document.getElementById('tracked-items');
        var trackItem = document.createElement("li");

        trackItem.innerText = `Tracked Item: ${url} \nThreshold Price: ${threshold}`

        if (trackedItems) {
            trackedItems.appendChild(trackItem)
        }
    }
    console.log("alarm", alarm);
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon/128x128.png',
        title: 'Price Drop Alert!!!',
        message: 'The price is low',
        priority: 2
    });
})