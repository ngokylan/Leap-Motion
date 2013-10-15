var no_data = [];
var zeroes = [0,0,0,0,0,0,0,0,0,0];
var not_number = ['a','b','c','d','e'];
var number_character = ['a','b','c',0,1,2];
var valid_data = [0,1,2,3,4,5,6,7,8,9,10];
var negative_number = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0];
var negative_to_positive = [-5,-4,-3,-2,-1,0,1,2,3,4,5];


// getArrayAverage() Tests
var average_no_data = getArrayAverage(no_data);	//NAN
var average_zeroes = getArrayAverage(zeroes);	//0
var average_not_number = getArrayAverage(not_number);	//NAN
var average_number_character = getArrayAverage(number_character);	//NAN
var average_valid_data = getArrayAverage(valid_data);	//5
var average_negative_number = getArrayAverage(negative_number);	//-5
var average_negative_to_positive = getArrayAverage(negative_to_positive);	//0

console.log(average_no_data);
console.log(average_zeroes);
console.log(average_not_number);
console.log(average_number_character);
console.log(average_valid_data);
console.log(average_negative_number);
console.log(average_negative_to_positive);