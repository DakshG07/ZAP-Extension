// background.js

// Called when the user clicks on the browser action.
console.log("At background.js")
//Old code
/*
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  console.log("Captured mouseclick.")
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    console.log("Sent message.")
  });
});
*/
chrome.storage.sync.set({"alarms": {}}, function() {
    console.log("Successfully started extension.");
  });
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //handle message
    if (request.msg==="time") {
    	chrome.alarms.create(request.name, {delayInMinutes: request.time});
    	console.log("Successfully created timer for "+request.time+" minutes.")
    }
  }
);

chrome.alarms.onAlarm.addListener(function( alarm ) {
  console.log("Got an alarm for "+alarm.name+"!");
  var aN = alarm.name
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.storage.sync.get(["alarms"], function(result) {
  	console.log('Alarm Zoom link: ' + result.alarms[aN]);
  	chrome.tabs.sendMessage(activeTab.id, {"message": "alarmed", "name": alarm.name, "zoom":result.alarms[aN]});
  	//Make new alarm
  	chrome.alarms.create(alarm.name, {delayInMinutes: 720});
  	console.log("Made new alarm.")
	});
    console.log("Sent alarm.");
  });
});
function alertCJS() {
chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
		const activeTab = tabs[0];
		// Send a message to the active tab
		chrome.tabs.sendMessage(activeTab.id, {
			"message": "start"
		});
	});
}
chrome.extension.onConnect.addListener(function(port) {
      console.log("Connected to port with popup.");
      port.onMessage.addListener(function(msg) {
           console.log("Message recieved: " + msg);
           if (msg == "create") {
           		//Send message from popup.js to send message to content.js.
           		alertCJS();
           		
  			}
      });
 })