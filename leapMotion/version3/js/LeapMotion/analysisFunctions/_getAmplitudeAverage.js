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

	for(var i=0;i<positionAr.length;i++){ //for each of the entries in the array
	
		if(previousCoordinate!=null){	//if the previous coordinate variable is not null
		
			if(direction==null){ // if the direction of travel is null
			
				if(positionAr[i]>previousCoordinate){ //if the current coordinate is greater than the previous coordinate
				
					direction="up"; // set the direction to be up
					
				}else{
				
					direction="down"; //set the direction to be down
					
				}
			}else{ //the direction is not null
			
				if(direction=="up"){ //if direction == up
				
					if(positionAr[i]<previousCoordinate){ //if current position is less than previous position
						
						ampValues.push(previousCoordinate); //log the position

						direction="down"; //set direction to down

					}
				}else if(direction=="down"){ //if the direction is down
				
					if(positionAr[i]>previousCoordinate){ //if the current position is greater than the previous position

						ampValues.push(previousCoordinate); //log the position
						
						direction="up"; //set direction to up

					}
				}
			}
		}
		previousCoordinate = positionAr[i]; //set previous coordinate to the current coordinate
	}


	//This loop normalises all the values to the average
	for(var i=0;i<ampValues.length;i++){ //for all the values pushed into the array

		if(ampValues[i]>average){	//if the value is greater than the average calculated position
			ampValues[i] = ampValues[i]-average; //minus the average position from the current position
		}else{
			ampValues[i] = average-ampValues[i]; //minus the current position from the average position
		}
	}

	var amplitude=0; 
	
	
	//Adding all the values together and then dividing by how many values to get an average
	for(var i=0;i<ampValues.length;i++){
	
		amplitude+=ampValues[i];
		
	}

	return amplitude/ampValues.length;
}