/*
	* Created By		-	Joshua Stopper
	* Last Edited Date	-	15/10/13
	* Last Edited By	- 	Joshua Stopper
	* Description		-	Calculates the average acceleration and returns a value
	* Notes				-	http://formulas.tutorvista.com/physics/average-acceleration-formula.html
*/
function getAccelerationAverage(velocityAr,timestamps){	//Two arrays with the same amount of items

	var accelerationAr = new Array();	//Initializing an array to hold the accelerations
	
	for(var i=0;i<velocityAr.length;i++){	//Looping over all the velocities in the array
		
		if(velocityAr[i+1]!=undefined){	//If the current index + 1 does not equal undefined (if it is undefined there is no next value to calculate with)
			var velocityChange = velocityAr[i+1] - velocityAr[i];	//get the next velocity minus the current velocity
			var timeChange = timestamps[i+1] - timestamps[i];	//Get the next time minus the current time
	
			accelerationAr.push(velocityChange / timeChange);	//divide velocity by time
		}
		
	}
	
	var accelerationTotal = 0;	//
	
	for(var i=0;i<accelerationAr.length;i++){
		
		accelerationTotal += accelerationAr[i];
		
	}

	return accelerationTotal/ accelerationAr.length;
}