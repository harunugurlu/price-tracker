document.getElementById('track').addEventListener('click', () => {
    const url = document.getElementById('url').value;
    const threshold = document.getElementById('threshold').value;

    if (!url || !threshold) {
        document.getElementById('status').innerText = 'Please enter both URL and price threshold.';
        document.getElementById('status').style.color = 'red';
        return;
    }

    document.getElementById('status').innerText = 'Tracking price...';
    document.getElementById('status').style.color = 'green';

    // Save URL and threshold to storage
    chrome.storage.sync.get({ trackedItems: [] }, (data) => {
        const newItem = { url, threshold };
        const updatedItems = [...data.trackedItems, newItem];
        chrome.storage.sync.set({ trackedItems: updatedItems }, () => {
            updateTrackedItemsList(updatedItems);
            document.getElementById('status').innerText = 'Price tracking started.';
        });
    });

    document.getElementById('url').value = '';
    document.getElementById('threshold').value = '';
});

function updateTrackedItemsList(items) {
    const list = document.getElementById('tracked-items');
    list.innerHTML = '';
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.url} - Threshold: ${item.threshold}`;
        list.appendChild(listItem);
    });
}

// Load tracked items on popup open
chrome.storage.sync.get({ trackedItems: [] }, (data) => {
    updateTrackedItemsList(data.trackedItems);
});
