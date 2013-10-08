function validFrame(frame){
	var isHandsValid = validHands(frame.hands.length);
	var isFingersValid = validFingers(frame.pointables.length);
	
	if(frame.hands[0]!=undefined){
		var isValidLeftRight = validLeftRightPosition(frame.hands[0].palmPosition[0]);
		var isValidUpDown = validUpDownPosition(frame.hands[0].palmPosition[1]);
		var isValidFowardBackward = validForwardBackwardPosition(frame.hands[0].palmPosition[2]);
	}
	
	if(isHandsValid && isFingersValid && isValidLeftRight && isValidUpDown && isValidFowardBackward){
		return true;
	}else{
		return false;
	}
}

function validHands(handsDetected){
	if(handsDetected==1){
		return true;
	}else{
		return false;
	}
}

function validFingers(fingersDetected){
	if(fingersDetected==5){
		return true;
	}else {
		return false;
	}	
}

function validLeftRightPosition(leftRight){
	if(leftRight < 20 && leftRight > -20){
		return true;
	}else{
		return false;
	}
}

function validUpDownPosition(upDown){
	if(upDown < 120 && upDown > 80){
		return true;
	}else {
		return false;
	}
}
	
	
function validForwardBackwardPosition(forwardBackward){
	if(forwardBackward < 20 && forwardBackward > -20){
		return true;
	}else{
		return false;
	}
}