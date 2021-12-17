let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor(tab.url),
    });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor(url) {
    window.open(url+"/typo3", '_blank');
}