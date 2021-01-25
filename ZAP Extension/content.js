// content.js
console.log("ZAP Extension is LIVE and RUNNING!");
var clicks = 0;
var openZoom = function(zoom) {
  window.open(zoom, "_blank");
}
var runE = function() {
var ampm, ask, cH, cS, cM, check, className, classZoom, date, hour, hourInt, meetingL, meetingid, meetingpwd, minute, minuteInt, name, post, time, timeSplit, urlE, urlP, cMs;
post = function(msg) {
  alert(msg);
};
ask = function(msg) {
  return prompt(msg);
};
check = function(msg) {
  return confirm(msg);
};
//Timer function. To be changed.
var wait = function(time, name) {
	chrome.runtime.sendMessage({"msg": "time", "time": time/60000, "name": name});
	post("Sent message!");
}	
//Accidental creation.

//Notify. To be changed.
var notify = function(noti) {
  post(noti);
}

function save(alarm, zoom){
	post("Storing alarm...");
	var newAlarms = {};
	//Gets current alarms. Empty: {"alarms": {}}
	post("Getting alarms...")
	chrome.storage.sync.get(["alarms"], function(result) {
		newAlarms = result;
		post("Got alarms.\nAdding alarms...");
		newAlarms.alarms[alarm] = zoom;
		post("Alarms: "+newAlarms);
  		chrome.storage.sync.set(newAlarms, function() {
    		post("Successfully stored alarm for "+alarm+"!");
  		});
  	});
}

post('Welcome to ZAP Class Setup!');
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
} else if (hourInt === 12) {
  hour = "0";
  hourInt = 0;
}
hourInt = parseInt(hour);
minuteInt = parseInt(minute);
post(`HOUR: ${hour}\nMINUTE: ${minute}`);
urlE = /j\/(\d*)\?pwd=/; //Regex for meeting id. TRANSLATE: "j/", then a set of numbers, then "?pwd=".
urlP = /\?pwd=(.*)/; //Regex for meeting password. TRANSLATE: "?pwd=", then a set of characters. 
meetingid = (urlE.exec(classZoom))[1]; //Runs regex for matches; the [1] at the end gets the second value from the list, which is the full group.
meetingpwd = (urlP.exec(classZoom))[1];//Same thing here, but for password.
meetingL = `zoommtg://zoom.us/join?confno=${meetingid}&pwd=${meetingpwd}&zc=0`; //Create zoommtg:// url scheme.
post(`MEETING ID: ${meetingid}\nMEETING PWD: ${meetingpwd}\nMEETING LINK: ${meetingL}`);
var setTimer = function(hI, mI) {
  //Get current time.
  date = new Date();
  cH = date.getHours();
  cM = date.getMinutes();
  cS = date.getSeconds();
  cMs = date.getMilliseconds();
  post("Got time!");
  post("Got func!")
  var inTime = (((((((hI*60)+mI) - ((cH*60)+cM))*60)*1000)-(cS*1000))-cMs);
  post("Set time!!")
  wait(inTime, className); //Set a timer that rings on the time. Sends message to background.js.
  save(className, meetingL); //Save class to storage.
  post(`Set timeout!\nSet for ${inTime} milliseconds!`);
}
setTimer(hourInt, minuteInt);
//Previous code in place of setTimer: (Doesn't work.)
/*
if (cH === hourInt && cM === minuteInt) {
post(`It's time for ${className}!`);
window.open(meetingL, "_blank");
break;
} else {
  chrome.runtime.sendMessage({"tr": (minuteInt-cM)});
}
*/

}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message == "start" ) {
      console.log(`Extension clicked: ${clicks}`);
      clicks++;
      console.log("Running extension...");
      runE();
    } else if (request.message==="alarmed") {
      alert("It's time for "+request.name+"!");
      openZoom(request.zoom);
    }
  }
);