function validFrame(frame,tolerance,fingersRequired){

	var variance = 20 * tolerance;

	var isHandsValid = validHands(frame.hands.length);
	var isFingersValid = validFingers(frame.pointables.length,fingersRequired);
	
	if(frame.hands[0]!=undefined){
		var isValidLeftRight = validLeftRightPosition(frame.hands[0].palmPosition[0],variance);
		var isValidUpDown = validUpDownPosition(frame.hands[0].palmPosition[1],variance);
		var isValidFowardBackward = validForwardBackwardPosition(frame.hands[0].palmPosition[2],variance);
	}
	
	if(isHandsValid==1 && isFingersValid==1 && isValidLeftRight==1 && isValidUpDown==1 && isValidFowardBackward==1){
		return true;
	}else{
		return false;
	}
}

function validHands(handsDetected){
	if(handsDetected==1){
		return 1;
	}else if(handsDetected>1){
		return 2;
	}else if(handsDetected<1){
		return 0;
	}
}

function validFingers(fingersDetected,fingersRequired){
	if(fingersDetected==fingersRequired){
		return 1;
	}else if(fingersDetected>fingersRequired) {
		return 2;
	}else if(fingersDetected< fingersRequired){
		return 0;
	}	
}

function validLeftRightPosition(leftRight,variance){
	if(leftRight < (0+variance) && leftRight > (0-variance)){
		return 1;
	}else if(leftRight<(0-variance)){
		return 0;
	}else if(leftRight>(0+variance)){
		return 2;
	}
}

function validUpDownPosition(upDown,variance){
	if(upDown < (100+variance) && upDown > (100-variance)){
		return 1;
	}else if(upDown< (0-variance)){
		return 0;
	}else if(upDown> (0+variance)){
		return 2;
	}
}
	
	
function validForwardBackwardPosition(forwardBackward,variance){
	if(forwardBackward < (0+variance) && forwardBackward > (0-variance)){
		return 1;
	}else if(forwardBackward>(0+variance)){
		return 2;
	}else if(forwardBackward< (0-variance)){
		return 0;
	}
}