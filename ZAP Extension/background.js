// background.js

// Called when the user clicks on the browser action.
console.log("At background.js")
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  console.log("Captured mouseclick.")
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    console.log("Sent message.")
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.browserAction.setBadgeText({text: request.tr.toString()});
  }
);