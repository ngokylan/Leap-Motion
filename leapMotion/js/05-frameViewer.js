var canvas = document.getElementById('handViewer');	//This is the canvas element the hand is displayed on
var context = canvas.getContext('2d');	//This is the context of the canvas, where the data is written
var playbackFrames = null;	//The frames that are imported from a file
var playbackCurrentFrame=0;	//The current frame that should be displayed in playback
var playbackTimer = null;	//The timer for the playback of the frames
var playbackFramerate=1000/60;	//This is the rate at which frames are replayed - 60 frames a second
var playbackStarted = false;	//Whether or not the playback is started or stopped
var playbackFrameCount = null; //The amount of frames in the current recording

function frameController(frame){

}

//On click of the openFile button
$("#openFile").click(function() {
	getFile();
});

//On click of the close file button
$("#closeFile").click(function() {
	closeFile();
});

//On click of the playback controll button
$("#playbackControl").click(function() {
	if(playbackFrames!=null){
		if(playbackStarted==false){
			//Calling the startplayback function
			startPlayback();
		}else if(playbackStarted==true){
			//calling the stopPlayback function
			stopPlayback();
		}
	}else{
		setControlState("No file chosen for playback");
	}
});

function getFile(){
	$.get('files/frameDump-1.txt', function(data) {
		playbackFrames=data.split("\n\r");

		playbackFrameCount = playbackFrames.length;

		for(var i=0;i<playbackFrames.length;i++){
			playbackFrames[i] = JSON.parse(playbackFrames[i]);
			if(playbackFrames[i+1]==""){
				break;
			}
		}

		setControlState("File Loaded");
	});
}

function setControlState(message){
	$("#controlState").html(message);
}
function setPlaybackControl(message){
	$("#playbackControl").html(message);
}


function startPlayback(){
	//Setting the control message to started
	setControlState("Playback Started");

	//Setting the button text to pause playback
	setPlaybackControl("Pause Playback");

	//Starting the playback of the file
	playbackTimer = setInterval("getFrameData()", playbackFramerate);
	
	//Setting the playback started variable to true
	playbackStarted = true;
}

function stopPlayback(){
	clearInterval(playbackTimer)
	playbackStarted = false;
	setPlaybackControl("Continue Playback");
}

function resetPlayback(){
	clearInterval(playbackTimer)
	playbackStarted = false;
	playbackCurrentFrame=0;
	context.clearRect (0 ,0 , 500 , 500);

	setControlState("Playback reset");
	setPlaybackControl("Start Playback");
}

function closeFile(){

	clearInterval(playbackTimer)
	playbackFrames = null;
	playbackCurrentFrame=0;
	playbackTimer = null;
	playbackFramerate=1000/60;
	playbackStarted = false;

	context.clearRect (0 ,0 , 500 , 500);
	
	setControlState("No Data Loaded");
	setPlaybackControl("Start Playback");
}

function getFrameData(){
	setControlState(playbackFrameCount + " - " + playbackCurrentFrame);
	if(playbackCurrentFrame==(playbackFrameCount-1)){
		playbackCurrentFrame=0;
	}

	drawFrame(playbackFrames[playbackCurrentFrame]);
	playbackCurrentFrame++;
}

function drawFrame(frame){
	context.clearRect (0 ,0 , 500 , 500);

	if(frame.hands.length>0){
		for(var i=0;i<frame.hands.length;i++){

			var palmX = normalised(frame.hands[i].palmPosition[0])
			var palmY = normalised(frame.hands[i].palmPosition[2])

			for(var x=0;x<frame.pointables.length;x++){
				if(frame.pointables[x].handId==frame.hands[i].id){
					var tipX = normalised(frame.pointables[x].tipPosition[0])
					var tipY = normalised(frame.pointables[x].tipPosition[2])
					context.beginPath();
					context.moveTo(palmX, palmY);
					context.lineTo(tipX, tipY);
					context.lineWidth = 10;
					context.lineCap = 'round';
					context.stroke();
				}
			}
		}
	}
}
function normalised(value){
	var normalisedValue = value+250;
	return normalisedValue;
}