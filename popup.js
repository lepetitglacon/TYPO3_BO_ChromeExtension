let typo3Button = document.getElementById('typo3_button')

typo3Button.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log(tab.url)

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor(tab.url),
    });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor(url) {
    let typo3 = ""
    console.log(url)
    if (url[-1] == "/") {
        typo3 = "typo3"
    } else {
        typo3 = "/typo3"
    }
    window.open(url+typo3, '_blank');
}