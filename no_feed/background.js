chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if(changeInfo.url) {
    chrome.tabs.sendMessage( tabId, {
      message: 'no feed please!',
      url: changeInfo.url
    })
  }
});
