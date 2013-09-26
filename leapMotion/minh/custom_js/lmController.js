/*
	* This defines a new leapMotion controller
	* The parameters are in the following order
	* host: 'ip'
	* port: int
	* enable Gestures: boolean
	* frameEventName: 'animationFrame','frame','deviceFrame'
*/
var controller = new Leap.Controller();

//This event fires when a successful connection has been made with the lmDevice
controller.on('connect', function() {
	baseInfo("Successfully connected.");
});

//This is fired when the script is already running and the lmDevice is then connected
controller.on('deviceConnected', function() {
	baseInfo("A Leap device has been connected.");
});

//This is fired when the script is running and the lmDevice is disconnected
controller.on('deviceDisconnected', function() {
	baseInfo("A Leap device has been disconnected.");
});

//This is fired at 60 frames per second no matter what
//If there is no new data for the frame, the previous frames data is sent
//'frame' can also be 'animationFrame'
controller.on('frame', function(frame) {
	frameController(frame);
});

//This receives data from the device as fast as it can sent it
//This is faster than 60 frames per second
/*
controller.on('deviceFrame', function() {
  // your code here
});
*/


$(document).ready(function() {
	//This makes the initial connection with the lmDevice
	//Nothing will happen if this is not called
	controller.connect();	
});



var messageLog="<h5>Log History</h5>";
function baseInfo(state){

	var timestamp =  new Date().getTime();

	var currentState = "<br><h5>Current State:</h5> "+state+"<br><br>";

	messageLog = messageLog + timestamp+ " - " + state + "<br>";
	
	$("#baseConnectionInfo").html(currentState );

}