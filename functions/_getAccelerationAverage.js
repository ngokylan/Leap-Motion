function getAccelerationAverage(velocityAr,timestamps){

	var accelerationAr = new Array();
	
	for(var i=0;i<velocityAr.length;i++){
		
		if(velocityAr[i+1]!=undefined){
			var velocityChange = velocityAr[i+1] - velocityAr[i];
			var timeChange = timestamps[i+1] - timestamps[i];
	
			accelerationAr.push(velocityChange / timeChange);
		}
		
	}
	
	var accelerationTotal = 0;
	
	for(var i=0;i<accelerationAr.length;i++){
		
		accelerationTotal += accelerationAr[i];
		
	}

	return accelerationTotal/ accelerationAr.length;
}