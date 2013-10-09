function colorPickerFromEuclidean(distance){
	
	
	var localDistance = distance;
	
	if(localDistance > 255){
		localDistance = 255;
	}
	
	var r = 0 + distance;
	var g = 255 - distance;
	var b = 0;

	if(r<0){
		r=0;
	}
	if(g>255){
		g=255
	}
	
	//console.log(localDistance);
	
	return "rgba("+r+","+g+","+b+",1)";
}