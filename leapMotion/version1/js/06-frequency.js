var frames = null;	//The frames that are imported from a file
var timeFrame = null

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
$("#analyzeFile").click(function() {
	if(frames!=null){

		analyseFingers(extractFingers());

	}else{
		setControlState("No file chosen for playback");
	}
});

function getFile(){
	$.get('files/steady_josh_2.txt', function(data) {
		frames=data.split("\n\r");

		for(var i=0;i<frames.length;i++){
			frames[i] = JSON.parse(frames[i]);
			if(frames[i+0]==""){
				break;
			}
		}

		setControlState("File Loaded");
		timeFrame = frames.length/60;
	});
}

function setControlState(message){
	$("#controlState").html(message);
}
function setPlaybackControl(message){
	$("#playbackControl").html(message);
}

function setFrequencyInformation(message){
	$("#frequencyInformation").html(message);
}

function startPlayback(){
	//Setting the control message to started
	setControlState("Playback Started");

	//Setting the button text to pause playback
	setPlaybackControl("Pause Playback");
}

function stopPlayback(){
	setPlaybackControl("Continue Playback");
}

function resetPlayback(){
	setControlState("Playback reset");
	setPlaybackControl("Start Playback");
}

function closeFile(){

	frames = null;
	
	setControlState("No Data Loaded");
	setPlaybackControl("Start Playback");
}

function analyseFingers(data_set){
	var output = "";

	output+="<div class='well'>";
	output+="Finger 0<br>";
	output+="Y Hertz: "+getFrequency(data_set[0][1])+"<br>";
	output+="Y Amplitude: "+getAmplitude(data_set[0][1])+"<br>";
	output+="</div>";

	output+="<div class='well'>";
	output+="Finger 1<br>";
	output+="Y Hertz: "+getFrequency(data_set[1][1])+"<br>";
	output+="Y Amplitude: "+getAmplitude(data_set[1][1])+"<br>";
	output+="</div>";

	output+="<div class='well'>";
	output+="Finger 2<br>";
	output+="Y Hertz: "+getFrequency(data_set[2][1])+"<br>";
	output+="Y Amplitude: "+getAmplitude(data_set[2][1])+"<br>";
	output+="</div>";

	output+="<div class='well'>";
	output+="Finger 3<br>";
	output+="Y Hertz: "+getFrequency(data_set[3][1])+"<br>";
	output+="Y Amplitude: "+getAmplitude(data_set[3][1])+"<br>";
	output+="</div>";

	output+="<div class='well'>";
	output+="Finger 4<br>";
	output+="Y Hertz: "+getFrequency(data_set[4][1])+"<br>";
	output+="Y Amplitude: "+getAmplitude(data_set[4][1])+"<br>";
	output+="</div>";

	setFrequencyInformation(output);
}

//This function analyses a frame of data for tremor
//It returns an integer which represents the frequency of the tremor
//It only analyses one hand and each of the fingers associated with the hand
function extractFingers(){

	var fingerPositions = Array(
		Array( //Finger 0
			Array(), //finger x
			Array(), //finger y
			Array(), //finger z
			Array(), //Euclidean
			Array()
		),
		Array( //Finger 1
			Array(), //finger x
			Array(), //finger y
			Array(), //finger z
			Array(), //Euclidean
			Array()
		),
		Array( //Finger 2
			Array(), //finger x
			Array(), //finger y
			Array(), //finger z
			Array(), //Euclidean
			Array()
		),
		Array( //Finger 3
			Array(), //finger x
			Array(), //finger y
			Array(), //finger z
			Array(), //Euclidean
			Array()
		),
		Array( //Finger 4
			Array(), //finger x
			Array(), //finger y
			Array(), //finger z
			Array(), //Euclidean
			Array()
		)
	);

	for(var i=0;i<frames.length;i++){	//looping through all the frames
		
		for(var x=0;x<frames[i].pointables.length;x++){	//looping through each of the fingers

			for(var z=0;z<frames[i].pointables[x].tipPosition.length;z++){	//Looping through tip X, Y, Z coordinates of the finger
				
				fingerPositions[x][z].push(frames[i].pointables[x].tipPosition[z]); //Pushing the position in to the position array

			}
			fingerPositions[x][3].push(get3dEuclidean(fingerPositions[x][0][i],0,fingerPositions[x][1][i],0,fingerPositions[x][2][i],0));
			fingerPositions[x][4].push(frames[i].pointables[x].tipVelocity[1]);
		}
	}
	console.log(fingerPositions);
	return fingerPositions;
}

function getArrayAverage(array){
	
	var average = 0;

	for(var i=0;i<array.length;i++){
		average +=array[i];

	}

	return average/array.length;
}

function getAmplitude(positionAr){
	
	var average = getArrayAverage(positionAr);
	
	var direction = null;
	var previousCoordinate = null;
	var ampValues = Array();

	for(var i=0;i<positionAr.length;i++){
		if(previousCoordinate!=null){
			if(direction==null){
				if(positionAr[i]>previousCoordinate){
					direction="up";
				}else{
					direction="down";
				}
			}else{
				if(direction=="up"){
					if(positionAr[i]<previousCoordinate){
						
						ampValues.push(previousCoordinate);

						direction="down";

					}
				}else if(direction=="down"){
					if(positionAr[i]>previousCoordinate){

						ampValues.push(previousCoordinate);
						direction="up";

					}
				}
			}
		}
		previousCoordinate = positionAr[i];
	}

	for(var i=0;i<ampValues.length;i++){
		if(ampValues[i]>average){
			ampValues[i] = ampValues[i]-average;
		}else{
			ampValues[i] = average-ampValues[i];
		}
	}

	var amplitude=0;

	for(var i=0;i<ampValues.length;i++){
		amplitude+=ampValues[i];
	}

	return amplitude/ampValues.length;
}

function get3dEuclidean(x1,x2,y1,y2,z1,z2){
	return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2))+((z1-z2)*(z1-z2)));
}
//Takes an array containing one coordinate
function getFrequency(positionAr){

	var direction =null;
	var changes = 0;
	var previousCoordinate = null;

	for(var i=0;i<positionAr.length;i++){
		if(previousCoordinate!=null){
			if(direction==null){
				if(positionAr[i]>previousCoordinate){
					direction="up";
				}else{
					direction="down";
				}
			}else{
				if(direction=="up"){
					if(positionAr[i]<previousCoordinate){
						changes++;
						direction="down";
					}
				}else if(direction=="down"){
					if(positionAr[i]>previousCoordinate){
						changes++;
						direction="up";
					}
				}
			}
		}
		previousCoordinate = positionAr[i];
	}

	return changes/timeFrame;

}