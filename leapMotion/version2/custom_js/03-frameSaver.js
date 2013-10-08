var currentlyRecording = false;
var recordedData = "";
var framesRecorded = 0;

var countDownTimer;
var counter;

function frameController(frame){
	$("#no_recorded_frames").html("Frames Recorded: "+framesRecorded);
	$("#no_recorded_times").html("Time Recorded: "+framesRecorded/60);
	if(currentlyRecording==true){
		if(frames == null){
			frames = new Array();
		}else{
			frames.push(frame.data);

		//If this is broken its because the \n\r is not working properly
		//\n\r will make each record be on a new line
		//THis is used to import that data later
		//$("#trackingInformation").append(output);
		//recordedData+=output+"\n\r";
		framesRecorded++;
	}
}else{
		//$("#trackingInformation").append(recordedData);
	}
}

$("#startStopRecording").click(function() {

	if(currentlyRecording==false){
		//set img src for the instruction
		$("#instruction_title").html("Moving Hand to the right spot on top of the device");
		$("#instruction_img").attr("src","img/start-instruction.gif");

		$("#instruction_modal").modal("show");
		setTimeout(function (){
			$("#instruction_modal").modal("hide");
		},5000);
	}else{
		//set img src for the instruction
		$("#instruction_title").html("Moving Hand out of the device");
		$("#instruction_img").attr("src","img/end-instruction.gif");
		$("#instruction_modal").modal("show");
		setTimeout(function (){
			$("#instruction_modal").modal("hide");
			setTimeout(function(){
				currentlyRecording=false;
			},1500);
		},5000);

		//disable recording progress bar
		$("#recording_progress").attr("class","hidden hidenonspace");

		
		$("#startStopRecording").html('Start Recording');
		$("#controlState").html('Not Recording');
	}

	//set hide event in modal
	$('#instruction_modal').on('hidden.bs.modal', function () {
		if(currentlyRecording==false){

			counter=$("#recordingDelay").val();
			beginRecording();
		}
	});
});

function beginRecording(){
	if(counter==0){
		//enable recording progress bar
		$("#recording_progress").attr("class","well");

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