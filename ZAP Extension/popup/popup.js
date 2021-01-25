var classList = $("#classes");
var classes = [];
var count = classes.length;
var port = chrome.extension.connect({
      name: "Sample Communication"
 });
//Loop through classes; append each new one.
function addClass(className) {
classList.append("<p>"+className+"</p>");
}
chrome.storage.sync.get(["alarms"], function(result) {
	var alarms = Object.keys(result.alarms);
  	if ((Object.keys(result.alarms))[0] != undefined) {
  	for (var i = 0; i < alarms.length; i++) {
    // Iterate over numeric indexes from 0 to 5, as everyone expects.
    addClass(alarms[i]);
	}
  	} else {
  	addClass("You have no classes.");
  	}
});
for(var i = 0; i < count; i++) {
    var item = classes[i];
    addClass(item);
}
$("#addclass").click(function () {
   port.postMessage("create");
});