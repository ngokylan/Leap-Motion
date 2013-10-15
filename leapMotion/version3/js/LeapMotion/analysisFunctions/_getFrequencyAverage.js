//Takes an array containing one coordinate
function getFrequency(positionAr){

	var direction =null;
	var changes = 0;
	var previousCoordinate = null;
	
	

	for(var i=0;i<positionAr.length;i++){
		if(previousCoordinate!=null){
			if(direction==null){
				if(positionAr[i]>previousCoordinate){
					direction="up";
				}else{
					direction="down";
				}
			}else{
				if(direction=="up"){
					if(positionAr[i]<previousCoordinate){
						changes++;
						direction="down";
					}
				}else if(direction=="down"){
					if(positionAr[i]>previousCoordinate){
						changes++;
						direction="up";
					}
				}
			}
		}
		previousCoordinate = positionAr[i];
	}

	console.log(positionAr.length/60);

	return changes/(positionAr.length/60);
	
	

}