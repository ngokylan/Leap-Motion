var frames = null;
var canvas = document.getElementById('handViewer');
var context = canvas.getContext('2d');
var currentFrame=0;
var playbackTimer;
var frameRate=1000/60;

function frameController(frame){

}

$("#openRecording").click(function() {

	$.get('files/frameDump-1.txt', function(data) {
		frames=data.split("\n\r");

		for(var i=0;i<frames.length;i++){
			frames[i] = JSON.parse(frames[i]);
			if(frames[i+1]==""){
				break;
			}
		}

		//console.log(frames[500]);

		$("#controlState").html("Data Loaded");
	});
});

$("#closeRecording").click(function() {
	clearInterval(playbackTimer)
	currentFrame=0;
	frames=null;
	context.clearRect (0 ,0 , 500 , 500);
	$("#controlState").html("No Data Loaded");
});


$("#playRecording").click(function() {
	if(frames!=null){
		
		$("#controlState").html("Playback Started");
		currentFrame=0;
		playbackTimer = setInterval(function(){getFrameData()}, frameRate);
	}
});


function getFrameData(){

	if(currentFrame>=frames.length){
		clearInterval(playbackTimer)
	}

	drawFrame(frames[currentFrame]);
	currentFrame++;


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