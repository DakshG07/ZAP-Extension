// content.js
console.log("ZAP Extension is LIVE and RUNNING!");
//sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var clicks = 0;
var runE = function() {
var ampm, ask, cH1, cM2, check, className, classZoom, date, hour, hourInt, meetingL, meetingid, meetingpwd, minute, minuteInt, name, post, time, timeSplit, urlE, urlP;
post = function(msg) {
  return alert(msg);
};
ask = function(msg) {
  return prompt(msg);
};
check = function(msg) {
  return confirm(msg);
};
post('Welcome to Remider2.0!');
name = ask("Whats your name?");
console.log(`User logged in as - ${name}`);
time = ask("What time is your next class?\nE.G. 12:30. No need for AM/PM.");
className = ask("What is your next class?");
classZoom = ask("What is the Zoom link?\n(Most Zoom links should work, but not all may.");
ampm = ask(`Is ${className} at ${time}AM or ${time}PM? `);
timeSplit = time.split(":");
hour = timeSplit[0];
minute = timeSplit[1];
hourInt = parseInt(hour);
if (ampm === "pm") {
  hour = (hourInt + 12).toString();
}
hourInt = parseInt(hour);
minuteInt = parseInt(minute);
post(`HOUR: ${hour}\nMINUTE: ${minute}`);
urlE = /j\/(\d*)\?pwd=/;
urlP = /\?pwd=(.*)/;
meetingid = (urlE.exec(classZoom))[1];
meetingpwd = (urlP.exec(classZoom))[1];
meetingL = `zoommtg://zoom.us/join?confno=${meetingid}&pwd=${meetingpwd}&zc=0`;
post(`MEETING ID: ${meetingid}\nMEETING PWD: ${meetingpwd}\nMEETING LINK: ${meetingL}`);
while (true) {
  date = new Date();
  cH1 = date.getHours();
  cM2 = date.getMinutes();
  if (cH1 === hourInt && cM2 === minuteInt) {
    post(`It's time for ${className}!`);
    window.open(meetingL, "_blank");
    break;
  } else {
  	chrome.runtime.sendMessage({"tr": (minuteInt-cM2)});
  }
}
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      console.log(`Extension clicked: ${clicks}`);
      clicks++;
      console.log("Running extension...");
      runE();
    }
  }
//chrome.browserAction.setBadgeText({text: ""});
);