function validFrame(frame){
	var validHands = validHands(frame.hands.length);
	var validFingers = validFingers(frame.pointables.length);
	
	var validLeftRightPosition = validLeftRightPosition(frame.hands[0].palmPosition[0]);
	var validUpDownPosition = validUpDownPosition(frame.hands[0].palmPosition[1]);
	var validForwardBackwardPosition = validForwardBackwardPosition(frame.hands[0].palmPosition[2]);
	
	
	if(validHands && validFingers && validLeftRightPosition && validUpDownPosition && validForwardBackwardPosition){
		return true
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