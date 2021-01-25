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
  	classes.push((Object.keys(result.alarms))[0]);
  	if ((Object.keys(result.alarms))[0] != undefined) {
  	addClass((Object.keys(result.alarms))[0]);
  	} else {
  	addClass("You have no classes.")
  	}
});
for(var i = 0; i < count; i++) {
    var item = classes[i];
    addClass(item);
}
$("#addclass").click(function () {
   port.postMessage("create");
});