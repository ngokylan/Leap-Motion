function validFrame(frame){
	var validHands = validHands(frame.hands.length);
	var validFingers = validFingers(frame.pointables.length);
	var validLeftRightPosition = validLeftRightPosition(frame.hands[0].palmPosition[0]);
	var validUpDownPosition = validUpDownPosition(frame.hands[0].palmPosition[1]);
	var validForwardBackwardPosition = validForwardBackwardPosition(frame.hands[0].palmPosition[2]);
}

function validHands(handsDetected){
	if(handsDetected==1){
		return 1;
	}else if(handsDetected > 1){
		return 2;
	}else if(handsDetected < 1){
		return 0;
	}	
}

function validFingers(fingersDetected){
	if(fingersDetected==5){
		return 1;
	}else if(fingersDetected > 5){
		return 2;
	}else if(fingersDetected < 5){
		return 0;
	}		
}

function validLeftRightPosition(leftRight){
	if(leftRight < 20 && leftRight > -20){
		return 1
	}else if(leftRight > 20){
		return 2;
	}else if(leftRight < -20){
		return 0;
	}	
}

function validUpDownPosition(upDown){
	if(upDown < 120 && upDown > 80){
		return 1;
	}else if(upDown > 120){
		return 2
	}else if(upDown < 80){
		return 0	
	}	
}
	
	
function validForwardBackwardPosition(forwardBackward){
	if(forwardBackward < 20 && forwardBackward > -20){
		return 1;
	}else if(forwardBackward > 20){
		return 0
	}else if(forwardBackward < -20){
		return 2;
	}
}