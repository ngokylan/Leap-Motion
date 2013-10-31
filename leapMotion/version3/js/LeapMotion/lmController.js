/*
	* Created By		-	Joshua Stopper
	* Last Edited Date	-	15/10/13
	* Last Edited By	- 	Joshua Stopper
	* Description		-	Establishes a base connection with the leap motion drivers, passes the latest frame to frameController function
*/
/*
	* This defines a new leapMotion controller
	* The parameters are in the following order
	* host: 'ip'
	* port: int
	* enable Gestures: boolean
	* frameEventName: 'animationFrame','frame','deviceFrame'
*/
var controller = new Leap.Controller();

$(document).ready(function() {
	//This makes the initial connection with the lmDevice
	//Nothing will happen if this is not called
	controller.connect();	
});

//This event fires when a successful connection has been made with the lmDevice
controller.on('connect', function() {
	//baseInfo("Successfully connected.");
});

//This is fired when the script is already running and the lmDevice is then connected
controller.on('deviceConnected', function() {
	//baseInfo("A Leap device has been connected.");
});

//This is fired when the script is running and the lmDevice is disconnected
controller.on('deviceDisconnected', function() {
	//baseInfo("A Leap device has been disconnected.");
});

//This is fired at 60 frames per second no matter what
//If there is no new data for the frame, the previous frames data is sent
//'frame' can also be 'animationFrame'
controller.on('frame', function(frame) {
	frameController(frame);
});