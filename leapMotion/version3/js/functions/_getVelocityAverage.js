function getVelocityAverage(velocityAr){
	
	
	var totalDisplacement = 0;

	for(var i=0;i<velocityAr.length;i++){	
	
		totalDisplacement += velocityAr[i];
		
	}
	
	return totalDisplacement/(velocityAr.length);
	
}