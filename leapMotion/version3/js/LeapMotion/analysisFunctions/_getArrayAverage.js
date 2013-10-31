/*
	* Created By		-	Joshua Stopper
	* Last Edited Date	-	15/10/13
	* Last Edited By	- 	Joshua Stopper
	* Description		-	Calculates the average of all the values in the array
*/
function getArrayAverage(array){

	
	
	var average = 0;

	for(var i=0;i<array.length;i++){
		average +=array[i];

	}
	
	
	return average/array.length;
}