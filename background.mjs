import { getTrackedItems } from "./util.mjs";
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



async function handleAlarm(alarm) {
    var trackedItems = [];
    try {
        trackedItems = await getTrackedItems();
    } catch (error) {
        console.log("error getting trackedItems", error);
    }
    console.log("backgroundjs", trackedItems);
    // console.log("alarm", alarm);
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon/128x128.png',
        title: 'Price Drop Alert!!!',
        message: 'The price is low',
        priority: 2
    });
}

chrome.alarms.onAlarm.addListener(handleAlarm);