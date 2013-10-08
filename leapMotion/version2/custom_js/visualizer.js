var frames = null;  //The frames that are imported from a file
var timeFrame = null;
var framesRecorded = 0;


function moveFinger(Finger, posX, posY, posZ, dirX, dirY, dirZ) {
  Finger.style.webkitTransform = "translateX("+posX+"px) translateY("+posY+"px) translateZ("+posZ+"px) rotateX("+dirX+"deg) rotateY(0deg) rotateZ("+dirZ+"deg)";
}

function moveSphere(Sphere, posX, posY, posZ, rotX, rotY, rotZ) {
  Sphere.style.webkitTransform = "translateX("+posX+"px) translateY("+posY+"px) translateZ("+posZ+"px) rotateX("+rotX+"deg) rotateY(0deg) rotateZ(0deg)";
}

var fingers = {};
var spheres = {};
Leap.loop(function(frame) {
  var fingerIds = {};
  var handIds = {};
  if (frame.hands === undefined ) {
    var handsLength = 0
  } else {
    var handsLength = frame.hands.length;
  }

  for (var handId = 0, handCount = handsLength; handId != handCount; handId++) {
    var hand = frame.hands[handId];
    var posX = (hand.palmPosition[0]*3);
    var posY = (hand.palmPosition[2]*3)-200;
    var posZ = (hand.palmPosition[1]*3)-400;
    var rotX = (hand._rotation[2]*90);
    var rotY = (hand._rotation[1]*90);
    var rotZ = (hand._rotation[0]*90);
    var sphere = spheres[hand.id];
    if (!sphere) {
      var sphereDiv = document.getElementById("sphere").cloneNode(true);
      sphereDiv.setAttribute('id',hand.id);
      sphereDiv.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);
      document.getElementById('scene').appendChild(sphereDiv);
      spheres[hand.id] = hand.id;
    } else {
      var sphereDiv =  document.getElementById(hand.id);
      if (typeof(sphereDiv) != 'undefined' && sphereDiv != null) {
        moveSphere(sphereDiv, posX, posY, posZ, rotX, rotY, rotZ);
      }
    }
    handIds[hand.id] = true;
  }
  for (handId in spheres) {
    if (!handIds[handId]) {
      var sphereDiv =  document.getElementById(spheres[handId]);
      sphereDiv.parentNode.removeChild(sphereDiv);
      delete spheres[handId];
    }
  }

  for (var pointableId = 0, pointableCount = frame.pointables.length; pointableId != pointableCount; pointableId++) {
    var pointable = frame.pointables[pointableId];
    var posX = (pointable.tipPosition[0]*3);
    var posY = (pointable.tipPosition[2]*3)-200;
    var posZ = (pointable.tipPosition[1]*3)-400;
    var dirX = -(pointable.direction[1]*90);
    var dirY = -(pointable.direction[2]*90);
    var dirZ = (pointable.direction[0]*90);
    var finger = fingers[pointable.id];
    if (!finger) {
      var fingerDiv = document.getElementById("finger").cloneNode(true);
      fingerDiv.setAttribute('id',pointable.id);
      fingerDiv.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);
      document.getElementById('scene').appendChild(fingerDiv);
      fingers[pointable.id] = pointable.id;
    } else {
      var fingerDiv =  document.getElementById(pointable.id);
      if (typeof(fingerDiv) != 'undefined' && fingerDiv != null) {
        moveFinger(fingerDiv, posX, posY, posZ, dirX, dirY, dirZ);
      }
    }
    fingerIds[pointable.id] = true;
  }
  for (fingerId in fingers) {
    if (!fingerIds[fingerId]) {
      var fingerDiv =  document.getElementById(fingers[fingerId]);
      fingerDiv.parentNode.removeChild(fingerDiv);
      delete fingers[fingerId];
    }
  }
  // document.getElementById('showHands').addEventListener('mousedown', function() {
  //   document.getElementById('app').setAttribute('class','show-hands');
  // }, false);
  // document.getElementById('hideHands').addEventListener('mousedown', function() {
  //   document.getElementById('app').setAttribute('class','');
  // }, false);
});


/*
Minh - load default hand position from file
*/
function load_default_hand_position(){
  $.get('files/standard_hand_position.txt', function(data) {
    playbackFrames=data.split("\n\r");

    playbackFrameCount = playbackFrames.length;

    for(var i=0;i<playbackFrames.length;i++){
      playbackFrames[i] = JSON.parse(playbackFrames[i]);
      if(playbackFrames[i+1]==""){
        break;
      }
    }

    //call function to show default hand in the 3d context
    draw_default_hand_position(playbackFrames);
  });

  //call function to get dumb file to analyze 
  //note this should be change in future to store in a variable for analyzing directly
  getFile_data();
}

/*
Minh - draw default hand
*/
function draw_default_hand_position(frames){
  var fingerIds = {};
  var handIds = {};

  for(var k = 0; k < frames.length; k++){
    var frame = frames[k];
    if(frame != null && frame != undefined && frame != ""){
      if (frame.hands === undefined ) {
        var handsLength = 0
      } else {
        var handsLength = frame.hands.length;
      }

      for (var handId = 0, handCount = handsLength; handId != handCount; handId++) {
        var hand = frame.hands[handId];
        var posX = (hand.palmPosition[0]*3);
        var posY = (hand.palmPosition[2]*3)-200;
        var posZ = (hand.palmPosition[1]*3)-400;
        var rotX = (hand._rotation[2]*90);
        var rotY = (hand._rotation[1]*90);
        var rotZ = (hand._rotation[0]*90);
        var sphere = spheres[hand.id];
        if (!sphere) {
          var sphereDiv = document.getElementById("sphere").cloneNode(true);
          sphereDiv.setAttribute('id',hand.id);
          sphereDiv.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);
          document.getElementById('scene').appendChild(sphereDiv);
          spheres[hand.id] = hand.id;
        } else {
          var sphereDiv =  document.getElementById(hand.id);
          if (typeof(sphereDiv) != 'undefined' && sphereDiv != null) {
            moveSphere(sphereDiv, posX, posY, posZ, rotX, rotY, rotZ);
          }
        }
        handIds[hand.id] = true;
      }
      for (handId in spheres) {
        if (!handIds[handId]) {
          var sphereDiv =  document.getElementById(spheres[handId]);
          sphereDiv.parentNode.removeChild(sphereDiv);
          delete spheres[handId];
        }
      }

      for (var pointableId = 0, pointableCount = frame.data.pointables.length; pointableId != pointableCount; pointableId++) {
        var pointable = frame.data.pointables[pointableId];
        var posX = (pointable.tipPosition[0]*3);
        var posY = (pointable.tipPosition[2]*3)-200;
        var posZ = (pointable.tipPosition[1]*3)-400;
        var dirX = -(pointable.direction[1]*90);
        var dirY = -(pointable.direction[2]*90);
        var dirZ = (pointable.direction[0]*90);
        var finger = fingers[pointable.id];
        if (!finger) {
          var fingerDiv = document.getElementById("finger").cloneNode(true);
          fingerDiv.setAttribute('id',pointable.id);
          fingerDiv.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);
          document.getElementById('scene').appendChild(fingerDiv);
          fingers[pointable.id] = pointable.id;
        } else {
          var fingerDiv =  document.getElementById(pointable.id);
          if (typeof(fingerDiv) != 'undefined' && fingerDiv != null) {
            moveFinger(fingerDiv, posX, posY, posZ, dirX, dirY, dirZ);
          }
        }
        fingerIds[pointable.id] = true;
      }
      for (fingerId in fingers) {
        if (!fingerIds[fingerId]) {
          var fingerDiv =  document.getElementById(fingers[fingerId]);
          fingerDiv.parentNode.removeChild(fingerDiv);
          delete fingers[fingerId];
        }
      }
    }
  }
}

//On click of the playback controll button
$("#analyzeFile").click(function() {

  currentlyRecording = false;//********** stop recording

  if(frames!=null){

    analyseFingers(extractFingers());

  }else{
    setControlState("No data has been captured!");
  }

  //call function to fade out the result
  
  $("#startStopRecording").html('Start Recording');
  $("#controlState").html('Not Recording');
  displayResult();

  //call function to reset "start capturing" button
  resetStartStopbutton();
});

function setControlState(message){
  $("#controlState").html(message);
}
function setPlaybackControl(message){
  $("#playbackControl").html(message);
}

function setFrequencyInformation(message){
  $("#frequencyInformation").html(message);
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

  for(var i=0;i<frames.length;i++){ //looping through all the frames

    if(frames[i] != "" && frames[i] != null){//minh validating empty frame

    for(var x=0;x<frames[i].pointables.length;x++){ //looping through each of the fingers

      for(var z=0;z<frames[i].pointables[x].tipPosition.length;z++){  //Looping through tip X, Y, Z coordinates of the finger

        if(x < fingerPositions.length){
          fingerPositions[x][z].push(frames[i].pointables[x].tipPosition[z]); //Pushing the position in to the position array
        }

      }
      fingerPositions[x][3].push(get3dEuclidean(fingerPositions[x][0][i],0,fingerPositions[x][1][i],0,fingerPositions[x][2][i],0));
      fingerPositions[x][4].push(frames[i].pointables[x].tipVelocity[1]);
    }
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

function get3dEuclidean(x1,x2,y1,y2,z1,z2){
  return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2))+((z1-z2)*(z1-z2)));
}

function getFile_data(){
  $.get('../files/steady_josh_2.txt', function(data) {
    frames=data.split("\n\r");

    for(var i=0;i<frames.length;i++){

      if(frames[i] != ""){//validating empty element in last array
        frames[i] = JSON.parse(frames[i]);
        if(frames[i+0]==""){
          break;
        }
      }
    }

    setControlState("File Loaded");
    timeFrame = frames.length/60;
  });
}


/*************************** Start - Frame process */
//On click of the openFile button
$("#openFile").click(function() {
  getFile_data();
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

function closeFile(){

  playbackFrames = null;
  playbackCurrentFrame=0;
  playbackTimer = null;
  playbackFramerate=1000/60;
  playbackStarted = false;

  //context.clearRect (0 ,0 , 500 , 500);
  
  setControlState("No Data Loaded");
  setPlaybackControl("Start Playback");

  //reset output infor html tag
  $("#frequencyInformation").html("");
}

function getFrameData(){
  setControlState(playbackFrameCount + " - " + playbackCurrentFrame);
  if(playbackCurrentFrame==(playbackFrameCount-1)){
    playbackCurrentFrame=0;
  }

  drawFrame(playbackFrames[playbackCurrentFrame]);
  playbackCurrentFrame++;
}

var currentlyRecording = false;
$("#startStopRecording").click(function() {

 if(currentlyRecording==false){
    //call function to fade in the virtual 3D hand viewer for capturing 
    startCapturing_screen();

    //enable recording progress bar
    $("#recording_progress").attr("class","");

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

      if($("#instruction_img").attr("src") == "img/start-instruction.gif"){

        counter=$("#recordingDelay").val();
        beginRecording();
      }

    }else{

      if($("#instruction_img").attr("src") == "img/end-instruction.gif"){
        currentlyRecording =false;
      }
    }
  });

});

function beginRecording(){
  //minh
  //noise filter using WFLC algorithm should be apply here

  recordedData = '';
  framesRecorded = 0;

    //Need to build a timer so this value is taken into account
    var recordingDelay = $("#recordingDelay").val();

    if(currentlyRecording == true){

      $("#startStopRecording").html('Stop Recording');
      $("#controlState").html('Recording');
    }else{
      currentlyRecording = true; // ********************* enable recording
    }

  }

  $("#resetRecording").click(function() {
    currentlyRecording=false;
    $("#startStopRecording").html('Start Recording');
    $("#controlState").html('Not Recording');
    recordedData = '';
    framesRecorded = 0;
  });


  //record frame
  function record_frame(frame){

    if(currentlyRecording==true){
      $("#no_recorded_frames").html(framesRecorded);
      $("#no_recorded_times").html(framesRecorded/60);
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

      timeFrame = frames.length/60;
    }
  }


/*************************** End - Frame process */


/*************************** Start - Page animation process */
function startCapturing_screen() {
  $('#measure_virtualizer').attr("class","row-fluid")
  $('#measure_result').fadeOut(700);
  $('#measure_virtualizer').delay(1500).fadeIn(1000);
  $('#capturing_control').delay(1500).fadeIn(1000);

    //hide navbar
    $("#main_nav_bar").fadeIn(700);
    $("#main_nav_bar").attr("class","navbar navbar-inverse navbar-fixed-top hidden hidenonspace");
    $("#body").attr("style","padding-top: 0") //remove padding top of top nav bar
  }

  function displayResult(){
    $('#measure_result').delay(2000).fadeIn(1000);
    $('#measure_virtualizer').fadeOut(3000);
    $('#capturing_control').fadeIn(1000);

    //show navbar
    $("#main_nav_bar").attr("class","navbar navbar-inverse navbar-fixed-top");
    $("#main_nav_bar").fadeIn(700);
    $("#body").attr("style","padding-top: 50px") //restore padding top of top nav bar
  }

  function resetStartStopbutton(){
    //currentlyRecording=true;
    //set img src for the instruction
    $("#instruction_title").html("Moving Hand out of the device");
    $("#instruction_img").attr("src","img/end-instruction.gif");
    $("#instruction_modal").modal("show");
    setTimeout(function (){
      $("#instruction_modal").modal("hide");
      //reset GUI 
      $("#no_recorded_frames").html("");
      $("#no_recorded_times").html("");
    },5000);

    currentlyRecording=false;

    frames = null;
    framesRecorded = 0;

    //disable recording progress bar
    $("#recording_progress").attr("class","");

    
    $("#startStopRecording").html('Start Recording');
    $("#controlState").html('Not Recording');
  }
  /*************************** End - Page animation process */



