$( document ).ready(function() {
	$('#introModal').modal('show')
});

var recording = false;
var recordedFrames = Array();
var finishedRecording = false;

var timeRequired = 5;
var tolerance = 2;
var fingersRequired = 5;

$(".beginRecording").click(function(){
	recording=true;
	recordedFrames = Array();
	finishedRecording = false;
});

$(".openOptions").click(function(){
	
	$("#timeRequired").val(timeRequired);
	$("#tolerance").val(tolerance);
	$("#fingersRequired").val(fingersRequired);		
	
	$("#optionsModal").modal('show');
});

$(".cancelOptions").click(function(){
	$("#introModal").modal('show');
});

$(".saveOptions").click(function(){
	
	timeRequired = $("#timeRequired").val();
	tolerance = $("#tolerance").val();
	fingersRequired = $("#fingersRequired").val();		
	
	$("#introModal").modal('show');		
});


function frameController(frame){	//Looping through every frame passed from the leap motion controller

	if(recording){
	
		displayHandsFingers(frame);	//Displaying the hands on the screen
		displayInfo(frame,tolerance);	//Displaying info about the hands on the screen
	
		if(finishedRecording!=true){	//Checking if we have finished recording
			
			if(validFrame(frame,tolerance)){	//frame is valid
				
				recordedFrames.push(frame);
				
				if(recordedFrames.length==(5*60)){
					finishedRecording=true;
					
					var extractedData = extractData(recordedFrames);
					
					updateResultsModal(extractedData);
					
					$("#resultsModal").modal('show');
					recording = false;
				}
				
			}else{	//frame is not valid
				recordedFrames = Array();
			}
			
		}else{
			
		}	
	}
}

function updateResultsModal(data_set){
	var output = "";

	output+="<div class='well'>";
	output+="Finger 0<br><br>";
	output+="Y Hertz: "+getFrequency(data_set[0][1])+" Hz<br>";
	output+="Y Amplitude: "+getAmplitude(data_set[0][1])+" mm<br>";
	output+="Y Velocity: "+getVelocityAverage(data_set[0][3])+" mm/s<br>";
	output+="Y Acceleration: "+getAccelerationAverage(data_set[0][3],data_set[0][4])+" mm/s&sup2;<br>";
	output+="</div>";

	output+="<div class='well'>";
	output+="Finger 1<br><br>";
	output+="Y Hertz: "+getFrequency(data_set[1][1])+" Hz<br>";
	output+="Y Amplitude: "+getAmplitude(data_set[1][1])+" mm<br>";
	output+="Y Velocity: "+getVelocityAverage(data_set[1][3])+" mm/s<br>";
	output+="Y Acceleration: "+getAccelerationAverage(data_set[1][3],data_set[1][4])+" mm/s&sup2;<br>";
	output+="</div>";

	output+="<div class='well'>";
	output+="Finger 2<br><br>";
	output+="Y Hertz: "+getFrequency(data_set[2][1])+" Hz<br>";
	output+="Y Amplitude: "+getAmplitude(data_set[2][1])+" mm<br>";
	output+="Y Velocity: "+getVelocityAverage(data_set[2][3])+" mm/s<br>";
	output+="Y Acceleration: "+getAccelerationAverage(data_set[2][3],data_set[2][4])+" mm/s&sup2;<br>";
	output+="</div>";

	output+="<div class='well'>";
	output+="Finger 3<br><br>";
	output+="Y Hertz: "+getFrequency(data_set[3][1])+" Hz<br>";
	output+="Y Amplitude: "+getAmplitude(data_set[3][1])+" mm<br>";
	output+="Y Velocity: "+getVelocityAverage(data_set[3][3])+" mm/s<br>";
	output+="Y Acceleration: "+getAccelerationAverage(data_set[3][3],data_set[3][4])+" mm/s&sup2;<br>";
	output+="</div>";

	output+="<div class='well'>";
	output+="Finger 4<br><br>";
	output+="Y Hertz: "+getFrequency(data_set[4][1])+" Hz<br>";
	output+="Y Amplitude: "+getAmplitude(data_set[4][1])+" mm<br>";
	output+="Y Velocity: "+getVelocityAverage(data_set[4][3])+" mm/s<br>";
	output+="Y Acceleration: "+getAccelerationAverage(data_set[4][3],data_set[4][4])+" mm/s&sup2;<br>";
	output+="</div>";
	
	
	$("#resultsModal .modal-body").html(output);
}

function displayInfo(frame,tolerance){

	variance = tolerance*20;

	var handsDetected = validHands(frame.hands.length);
	var fingersDetected = validFingers(frame.pointables.length);
	
	var leftRight = null;
	var upDown = null;
	var forwardBackward = null;
	
	if(frame.hands[0]!=undefined){
		leftRight = validLeftRightPosition(frame.hands[0].palmPosition[0],variance);
		upDown = validUpDownPosition(frame.hands[0].palmPosition[1],variance);
		forwardBackward = validForwardBackwardPosition(frame.hands[0].palmPosition[2],variance);
	}

	var handsDetectedMessage;
	var fingersDetectedMessage;
	var leftRightMessage;
	var upDownMessage;
	var forwardBackwardMessage;

	if(handsDetected==1){
		handsDetectedMessage = "1 Hand Detected";
	}else if(handsDetected==2){
		handsDetectedMessage = "Too many hands";
	}else if(handsDetected==0){
		handsDetectedMessage = "No hands detected";
	}
	
	if(fingersDetected==1){
		fingersDetectedMessage = "5 fingers Detected";
	}else if(fingersDetected==2){
		fingersDetectedMessage = "Too many fingers";
	}else if(fingersDetected==0){
		fingersDetectedMessage = "Not enough fingers";
	}	
	
	if(leftRight==1){
		leftRightMessage = "Good Position";
	}else if(leftRight==2){
		leftRightMessage = "Too far right";
	}else if(leftRight==0){
		leftRightMessage = "Too far left";
	}else{
		leftRightMessage = "No Data Available";
	}
	
	if(upDown==1){
		upDownMessage = "Good Position";
	}else if(upDown==2){
		upDownMessage = "Too High";
	}else if(upDown==0){
		upDownMessage = "Too Low";
	}else{
		upDownMessage = "No Data Available";
	}
	
	if(forwardBackward==1){
		forwardBackwardMessage = "Good Position";
	}else if(forwardBackward==2){
		forwardBackwardMessage = "Too far backward";
	}else if(forwardBackward==0){
		forwardBackwardMessage = "Too far forward";
	}else{
		forwardBackwardMessage = "No Data Available";
	}
	
	
	$("#infoPanel > div:first-child").html("");
	
	//$("#infoPanel > div:first-child").append("<div class='well'>"+frame.hands[0].palmPosition[0]+"<br>"+frame.hands[0].palmPosition[1]+"<br>"+frame.hands[0].palmPosition[2]+"</div>");
	
	var progress = parseInt((recordedFrames.length/(timeRequired*60)*100));
	$("#infoPanel > div:first-child").append("<div class='well'><h5>Progress</h5><div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow='"+progress+"' aria-valuemin='0' aria-valuemax='100' style='width: "+progress+"%;'><span class='sr-only'>60% Complete</span></div></div></div>");
	$("#infoPanel > div:first-child").append("<div class='well'><h5>Hands: </h5>"+ handsDetectedMessage+"</div>");
	$("#infoPanel > div:first-child").append("<div class='well'><h5>Fingers: </h5>"+ fingersDetectedMessage+"</div>");
	$("#infoPanel > div:first-child").append("<div class='well'><h5>Left/Right: </h5>"+ leftRightMessage+"</div>");
	$("#infoPanel > div:first-child").append("<div class='well'><h5>Up/Down: </h5>"+ upDownMessage+"</div>");
	$("#infoPanel > div:first-child").append("<div class='well'><h5>Foward/Backward: </h5>"+ forwardBackwardMessage+"</div>");	
	
}