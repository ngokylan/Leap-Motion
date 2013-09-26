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
