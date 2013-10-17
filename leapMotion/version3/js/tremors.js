var recording = false;	//Defines whether or not the system is recording frames
var recordedFrames = Array();	//Stores the recorded frames for the current recording
var preRecordFrames = Array();

var timeRequired = 5;	//The amount of time valid frames are recorded for
var rangeMultiplier = 2;	//A multiplier for the range of field values that are acceptable, multiplies a value of 20
var baseRangeVariance = 10;
var fingersRequired = 5;	//THe amounf of fingers required to be in the frame


$( document ).ready(function() {	//When the document loads this function is called
	$('#introModal').modal({	//Opens the modal dialog box
		keyboard:false,	//Makes the keyboard inputs not close the modal box
		backdrop:'static'	//Makes mouse clicks outside the modal not close the dialog box
	});
});

$(".beginRecording").click(function(){	//When the begin recording button is clicked
	recording=true;	//Sets recording to true
	recordedFrames = Array();	//empties the recorded frames array so all old entries are removed
	preRecordFrames = Array();
});

$(".openOptions").click(function(){	//When the options button in the modals is clicked
	
	$("#timeRequired").val(timeRequired); 	//Sets the input field to the current timeRequired
	$("#rangeMultiplier").val(rangeMultiplier);	//Sets the input field to hte current rangemultiplier value
	$("#fingersRequired").val(fingersRequired);	//Sets the input to the current fingers required value
	
	$('#optionsModal').modal({	//Opens the options modal dialog box
		keyboard:false,	//Makes the keyboard inputs not close the modal box
		backdrop:'static'	//Makes mouse clicks outside the modal not close the dialog box
	});
});

$("#optionsModal .cancelOptions").click(function(){	//The cancel button in the options modal box was clicked
	$('#introModal').modal({
		keyboard:false,	//Makes the keyboard inputs not close the modal box
		backdrop:'static'	//Makes mouse clicks outside the modal not close the dialog box
	});
});

$("#optionsModal .saveOptions").click(function(){	//The save button in the options modal was clicked
	
	timeRequired = $("#timeRequired").val();	//Storing the value in the input field for timeRequired
	rangeMultiplier = $("#rangeMultiplier").val();	//Storing the value in the input field for rangemultiplier
	fingersRequired = $("#fingersRequired").val();	//Storing the value in the input field for fingersRequired
	
	$('#introModal').modal({	//Opens the intro modal dialog vox
		keyboard:false,	//Makes the keyboard inputs not close the modal box
		backdrop:'static'	//Makes mouse clicks outside the modal not close the dialog box
	});	
});


function frameController(frame){	//Looping through every frame passed from the leap motion controller

	if(recording){	//if the system is currently recording frames
	
		displayHandsFingers(frame);	//Displaying the hands on the screen
		displayInfo(frame,fingersRequired);	//Displaying info about the hands on the screen
			
		if(validFrame(frame,(rangeMultiplier*baseRangeVariance),fingersRequired)){	//frame is valid
			
			if(preRecordFrames.length==60){	// if 1 second of valid frames has been recorded
				
				recordedFrames.push(frame);	//Pushing the current frame into the recordedFrames array
			
				if(recordedFrames.length==(timeRequired*60)){	//If the time required has been reached
				
					var extractedData = extractData(recordedFrames);	//extract the data from the frames recorded and stores them in extractedData
				
					updateResultsModal(extractedData);	//updating the data in the final results model - this also analyses the frames
				
					$('#resultsModal').modal({	//Opening the modal
						keyboard:false,	//Making the keyboard not close the modal
						backdrop:'static'	//making mouse clicks outside the modal not close the modal
					});
					recording = false;	//Setting recording to false so no more frames are recorded
				}
				
			}else{
				preRecordFrames.push(frame);	//Pushing a frame in to the prerecorded array
			}
			
		}else{	//frame is not valid
			recordedFrames = Array();	//Clearing the recordedFrames array
			preRecordFrames = Array();	//Clearing the preRecord array
		}
	}
}


/*
	* Outputs the final results to the modal dialog box
	* takes on parameter which is extracted data from the recorded frames
*/
function updateResultsModal(data_set){
	var output = "";
	
	//[][0] = X's
	//[][1] = Y's
	//[][2] = Z's
	//[][3] = Velocities
	//[][4] = timestamps

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

function displayInfo(frame,fingersRequired){

	var handsDetected = validHands(frame.hands.length);
	var fingersDetected = validFingers(frame.pointables.length,fingersRequired);
	
	var leftRight = null;
	var upDown = null;
	var forwardBackward = null;
	
	var positionText = "";
	
	if(frame.hands[0]!=undefined){
		leftRight = validLeftRightPosition(frame.hands[0].palmPosition[0],(rangeMultiplier*baseRangeVariance));
		upDown = validUpDownPosition(frame.hands[0].palmPosition[1],(rangeMultiplier*baseRangeVariance));
		forwardBackward = validForwardBackwardPosition(frame.hands[0].palmPosition[2],(rangeMultiplier*baseRangeVariance));
		//œpositionText = "<div class='well'>"+frame.hands[0].palmPosition[0]+"<br>"+frame.hands[0].palmPosition[1]+"<br>"+frame.hands[0].palmPosition[2]+"</div>"
	}

	var handsDetectedMessage;
	var fingersDetectedMessage;
	var leftRightMessage;
	var upDownMessage;
	var forwardBackwardMessage;

	var handsDetectedMessage_error = "";
	if(handsDetected==1){
		handsDetectedMessage_error = "text-success";
		handsDetectedMessage = "1 Hand Detected";
	}else if(handsDetected==2){
		handsDetectedMessage_error = "text-danger";
		handsDetectedMessage = "Too many hands";
	}else if(handsDetected==0){
		handsDetectedMessage = "No hands detected";
	}
	
	var handsDetectedMessage_div = "<div class='well " + handsDetectedMessage_error + "'><h5>Hands: </h5>"+ handsDetectedMessage+"</div>";
	
	var fingersDetectedMessage_error = "";
	if(fingersDetected==1){
		fingersDetectedMessage_error = "text-success";
		fingersDetectedMessage = fingersRequired + " fingers Detected";
	}else if(fingersDetected==2){
		fingersDetectedMessage_error = "text-danger";
		fingersDetectedMessage = "Too many fingers";
	}else if(fingersDetected==0){
		fingersDetectedMessage = "Not enough fingers";
	}	
	
	var fingersDetectedMessage_div = "<div class='well " + fingersDetectedMessage_error + "'><h5>Fingers: </h5>"+ fingersDetectedMessage+"</div>";
	
	var leftRightMessage_error = "";
	if(leftRight==1){
		leftRightMessage_error = "text-success";
		leftRightMessage = "Good Position";
	}else if(leftRight==2){
		leftRightMessage_error = "text-danger";
		leftRightMessage = "Too far right";
	}else if(leftRight==0){
		leftRightMessage_error = "text-danger";
		leftRightMessage = "Too far left";
	}else{
		leftRightMessage = "No Data Available";
	}
	
	var leftRightMessage_div = "<div class='well " + leftRightMessage_error + "'><h5>Left/Right: </h5>"+ leftRightMessage+"</div>";
	
	var upDownMessage_error = "";
	if(upDown==1){
		upDownMessage_error = "text-success";
		upDownMessage = "Good Position";
	}else if(upDown==2){
		upDownMessage_error = "text-danger";
		upDownMessage = "Too High";
	}else if(upDown==0){
		upDownMessage_error = "text-danger";
		upDownMessage = "Too Low";
	}else{
		upDownMessage = "No Data Available";
	}
	
	var upDownMessage_div = "<div class='well " + upDownMessage_error + "'><h5>Up/Down: </h5>"+ upDownMessage+"</div>";
	
	
	var forwardBackwardMessage_error = "";
	if(forwardBackward==1){
		forwardBackwardMessage_error = "text-success";
		forwardBackwardMessage = "Good Position";
	}else if(forwardBackward==2){
		forwardBackwardMessage_error = "text-danger";
		forwardBackwardMessage = "Too far backward";
	}else if(forwardBackward==0){
		forwardBackwardMessage_error = "text-danger";
		forwardBackwardMessage = "Too far forward";
	}else{
		forwardBackwardMessage = "No Data Available";
	}
	
	var forwardBackwardMessage_div = "<div class='well " + forwardBackwardMessage_error + "'><h5>Foward/Backward: </h5>"+ forwardBackwardMessage+"</div>";
	
	
	$("#infoPanel > div:first-child").html("");
	
	$("#infoPanel > div:first-child").append(positionText);
	
	var progress = parseInt((recordedFrames.length/(timeRequired*60)*100));
	$("#infoPanel > div:first-child").append("<div class='well'><h5>Progress</h5><div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow='"+progress+"' aria-valuemin='0' aria-valuemax='100' style='width: "+progress+"%;'><span class='sr-only'>"+progress+"% Complete</span></div></div></div>");
	$("#infoPanel > div:first-child").append(handsDetectedMessage_div);
	$("#infoPanel > div:first-child").append(fingersDetectedMessage_div);
	$("#infoPanel > div:first-child").append(leftRightMessage_div);
	$("#infoPanel > div:first-child").append(upDownMessage_div);
	$("#infoPanel > div:first-child").append(forwardBackwardMessage_div);	
	
}