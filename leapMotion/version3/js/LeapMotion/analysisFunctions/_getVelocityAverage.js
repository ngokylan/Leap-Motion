/*
	* Created By		-	Joshua Stopper
	* Last Edited Date	-	15/10/13
	* Last Edited By	- 	Joshua Stopper
	* Description		-	Calculates the average velocity and returns a value
*/
function getVelocityAverage(velocityAr){
	
	var totalDisplacement = 0;

	for(var i=0;i<velocityAr.length;i++){	
		totalDisplacement += velocityAr[i];	
	}
	
	return totalDisplacement/(velocityAr.length);
}