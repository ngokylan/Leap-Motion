/*
	* Created By		-	Joshua Stopper
	* Last Edited Date	-	15/10/13
	* Last Edited By	- 	Joshua Stopper
	* Description		-	Calculates the average amplitude and returns a value
*/
function getAmplitude(positionAr){
	
	var average = getArrayAverage(positionAr);
	
	var direction = null;
	var previousCoordinate = null;
	var ampValues = Array();

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
						
						ampValues.push(previousCoordinate);

						direction="down";

					}
				}else if(direction=="down"){
					if(positionAr[i]>previousCoordinate){

						ampValues.push(previousCoordinate);
						direction="up";

					}
				}
			}
		}
		previousCoordinate = positionAr[i];
	}

	for(var i=0;i<ampValues.length;i++){
		if(ampValues[i]>average){
			ampValues[i] = ampValues[i]-average;
		}else{
			ampValues[i] = average-ampValues[i];
		}
	}

	var amplitude=0;

	for(var i=0;i<ampValues.length;i++){
		amplitude+=ampValues[i];
	}

	return amplitude/ampValues.length;
}