function colorPickerFromEuclidean(distance){
	
	var localDistance = distance;
	
	localDistance = parseInt((localDistance/100)*255);
	
	if(localDistance>255){
		localDistance=255
	}
	if(localDistance<0){
		localDistance = 0;
	}
	
	var r = 0 + localDistance;
	var g = 255 - localDistance;
	var b = 0;
	

	
	return "rgba("+r+","+g+","+b+",1)";
}