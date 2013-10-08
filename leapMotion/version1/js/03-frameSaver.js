var currentlyRecording = false;
var recordedData = "";
var framesRecorded = 0;

var countDownTimer;
var counter;

function frameController(frame){
	$("#trackingInformation").html("<h5>Frames Recorded: "+framesRecorded+", Time Recorded: "+framesRecorded/60+"</h5>");

	if(currentlyRecording==true){
		var output = JSON.stringify(frame.data);
		
		//If this is broken its because the \n\r is not working properly
		//\n\r will make each record be on a new line
		//THis is used to import that data later
		$("#trackingInformation").append(output);
		recordedData+=output+"\n\r";
		framesRecorded++;
	}else{
		//$("#trackingInformation").append(recordedData);
	}
}

$("#startStopRecording").click(function() {
	
	if(currentlyRecording==true){
		currentlyRecording=false;
		$("#startStopRecording").html('Start Recording');
		$("#controlState").html('Not Recording');
	}else if(currentlyRecording==false){
		
		counter=$("#recordingDelay").val();
		beginRecording();
	}
});

function beginRecording(){
	if(counter==0){
		recordedData = '';
		framesRecorded = 0;

		//Need to build a timer so this value is taken into account
		var recordingDelay = $("#recordingDelay").val();

		currentlyRecording=true;

		$("#startStopRecording").html('Stop Recording');
		$("#controlState").html('Recording');
	}else{
		$("#controlState").html("Recording in "+counter);
		counter--;
		countDownTimer=setTimeout(function(){beginRecording()},1000);
	}
}


$("#saveRecording").click(function() {

	var date = new Date();
	
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDay();

	var user = $("#profileName").val();

	if(user==''){
		alert('Please enter a name for the user!');
	}else{
		var fileName = year+"-"+month+"-"+day+"_"+hour+":"+minute+":"+second+"_"+user+".txt"
		var blob = new Blob([recordedData], {type: "text/plain;charset=utf-8"});
		saveAs(blob, fileName);	
	}
});

$("#resetRecording").click(function() {
		currentlyRecording=false;
		$("#startStopRecording").html('Start Recording');
		$("#controlState").html('Not Recording');
		recordedData = '';
		framesRecorded = 0;
});