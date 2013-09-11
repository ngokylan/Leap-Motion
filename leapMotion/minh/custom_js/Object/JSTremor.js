/*
 * Tremor is an object class that store captured data and analyzing output as a number for tremor assessment
 */

//declare a global variable to store Finger List for 1 hand only
var Finger_Arr = new Array();

//declare 3d point object with 3 dimension (x,y,z)
// x - represent for horizontal
// y - represent for vertical
// z - represent for depth
function Point_3D(val_x, val_y, val_z){
   //declare attributes;
   this.x = val_x;
   this.y = val_y;
   this.z = val_z;
 }

//declare Euclidean object for calculate distance between 2 3d point
function Euclidean(val_point1, val_point2){
    //declare attributes;
    this.point1 = val_point1;
    this.point2 = val_point2;

    //calculate distance
    this.calc_distance = function(){
        //fomular distance from (x1, y1, z1) to (x2, y2, z2) = sqrt(power(|x1-x2|) + power(|y1-y2|) + power(|z1-z2|))
        var return_distance = "";

        //power of diff of x between 2 points
        var diff_x = Math.pow(Math.abs(this.point1.x - this.point2.x), 2);

        //power of diff of y between 2 points
        var diff_y = Math.pow(Math.abs(this.point1.y- this.point2.y), 2);

        //power of diff of z between 2 points
        var diff_z = Math.pow(Math.abs(this.point1.z - this.point2.z), 2);

        //calculate distance
        return_distance = Math.sqrt(diff_x + diff_y + diff_z); // get 5 numbers in decimal part

        return return_distance;
      };
    }

//class Finger that hold a set of movement points and display on graph
function Finger(fingerid, present_chart_id){
  this.id = fingerid;

  this.move_point_arr = new Array();
  this.chart_id = present_chart_id;

  this.points = new Array();

  this.print_chart = function(){
    var ChartTremor_obj = new ChartTremor(this.move_point_arr, this.chart_id);

    ChartTremor_obj.generate_chart();
  }

}

function get_fingerindex_from_finger_list(number){
  var finger_index = "";
  if(Finger_Arr.length >= 0){
    for(var i = 0; i < Finger_Arr.length; i++)
    {
      if(Finger_Arr[i].id == number){
        finger_index = i;
      }
    }
  }
  return finger_index;
}

//declare attribute

function JSTremor(palm_arr, pointable_arr){
    //palm
    this.palm = palm_arr;
    // this.handid = "";
    // this.directionX = "";
    // this.directionY = "";
    // this.directionZ = "";
    // this.palmNormalX = "";
    // this.palmNormalY = "";
    // this.palmNormalZ = "";
    // this.palmPositionX = "";
    // this.palmPositionY = "";
    // this.palmPositionZ = "";
    // this.palmVelocityX = "";
    // this.palmVelocityY = "";
    // this.palmVelocityZ = "";
    // this.sphereCenterX = "";
    // this.sphereCenterY = "";
    // this.sphereCenterZ = "";
    // this.sphereRadius = "";

    //pointable finger tips
    this.fingers = pointable_arr;
    // this.fingerid = "";
    // this.handId = "";
    // this.fingerlength = "";
    // this.directionX = "";
    // this.directionY = "";
    // this.directionZ = "";
    // this.tipPositionX = "";
    // this.tipPositionY = "";
    // this.tipPositionZ = "";
    // this.tipVelocityX = "";
    // this.tipVelocityY = "";
    // this.tipVelocityZ = "";

    this.current_move_direction = "";

    //declare function for calculate Euclidean distance for palm
    this.cal_palm_euclidean = function(){

      var return_distance_arr = new Array();
      if(this.palm.length >= 2){

        for(var i = 1; i < this.palm.length; i++){


          if(this.palm[i] instanceof Object && this.palm[i-1] instanceof Object && this.palm[i-1][0] !== undefined && this.palm[i][0] !== undefined){

              //console.log(this.palm[i]);
              
              console.log(JSON.stringify(this.palm[i][0]));

              var tmp = this.palm[i-1][0];
              var x1 = tmp.palmNormalX;
              var y1 = tmp.palmNormalY;
              var z1 = tmp.palmNormalZ;

              var tmp2 = this.palm[i][0];
              var x2 = tmp2.palmNormalX;
              var y2 = tmp2.palmNormalY;
              var z2 = tmp2.palmNormalZ;

              var is_tremor = false;

              //check changing direction of x
              // if(x2 < x1 && y2 > y1){ //move up
              //     this.current_move_direction = "up";
              // }else if(x2 > x1 && y2 < y1){
              //     this.current_move_direction = "down";
              // }

              //check changing direction of 
              if(this.current_move_direction == ""){
                is_tremor = true;
              }
              else if(this.current_move_direction == "up" && y2 < y1)// if prev move is "up" and current move is "down" = is_tremor
              {
                is_tremor = true;
              }
              else if(this.current_move_direction == "down" && y2 > y1)// if prev move is "down" and current move is "up" = is_tremor
              {
                is_tremor = true;
              }

              //start calculate if is_tremor flag is true
              if(is_tremor == true){
                //instantiate 3D point object
                var prev_point = new Point_3D(x1, y1, z1); // previous 3d point
                var current_point = new Point_3D(x2, y2, z2); // current 3d point

                //instantiate Euclidean object
                var Euclidean_obj = new Euclidean(prev_point, current_point);

                //calculate Eclidean distance between 2 3D points
                return_distance_arr.push(Euclidean_obj.calc_distance());
              }

              //set current direction for next point comparison
              if(y2 > y1){ //move up
                this.current_move_direction = "up";
              }else if(y2 < y1){
                this.current_move_direction = "down";
              }
            }

          }
        }

        return return_distance_arr; // distance output as an array

      };

    //declare function for calculate Euclidean distance for finger tips
    this.cal_fingers_euclidean = function(){

      if(this.fingers.length >= 2){

        for(var i = 1; i < this.fingers.length; i++){

          if(this.fingers[i] instanceof Object && this.fingers[i-1] instanceof Object && this.fingers[i-1][0] !== undefined && this.fingers[i][0] !== undefined){

              //console.log(this.palm[i]);
              
              console.log(JSON.stringify(this.palm[i][0]));

              var tmp = this.fingers[i-1][0];
              var x1 = tmp.tipPositionX;
              var y1 = tmp.tipPositionY;
              var z1 = tmp.tipPositionZ;
              var fingerid = tmp.id;

              var tmp2 = this.fingers[i][0];
              var x2 = tmp2.tipPositionX;
              var y2 = tmp2.tipPositionY;
              var z2 = tmp2.tipPositionZ;
              var fingerid2 = tmp2.id;

              var is_tremor = false;

              if(fingerid == fingerid2)//same finger
              {
                    //create an tempt Finger object to keep movement points
                    var Finger_obj = "";
                    if(Finger_Arr.length > 0) // check whether Finger_Arr array contains any Finger object or not
                    {
                      var new_finger_index = Finger_Arr.length - 1;
                      Finger_obj = new Finger(fingerid, "finger" + new_finger_index + "_Euclidean_chart");
                    }

                    //check duplicate finger in finger array
                    var Finger_id_of_global_arr = get_fingerindex_from_finger_list(fingerid); //if the Fingerid of current captured movement is exist in global array, get that Finger object for adding new point to Finger object points array
                    if(Finger_id_of_global_arr == ""){

                        //create a first Finger object
                        Finger_obj = new Finger(fingerid, "finger" + Finger_Arr.length + "_Euclidean_chart");

                        //add a finger to finger list
                        Finger_Arr.push(Finger_obj);

                        Finger_id_of_global_arr = 0;

                      }

                    //check changing direction of x
                    // if(x2 < x1 && y2 > y1){ //move up
                    //     this.current_move_direction = "up";
                    // }else if(x2 > x1 && y2 < y1){
                    //     this.current_move_direction = "down";
                    // }

                    //check changing direction of 
                    if(this.current_move_direction == ""){
                      is_tremor = true;
                    }
                    else if(this.current_move_direction == "up" && y2 < y1)// if prev move is "up" and current move is "down" = is_tremor
                    {
                      is_tremor = true;
                    }
                    else if(this.current_move_direction == "down" && y2 > y1)// if prev move is "down" and current move is "up" = is_tremor
                    {
                      is_tremor = true;
                    }

                    //start calculate if is_tremor flag is true
                    if(is_tremor == true){
                      //instantiate 3D point object
                      var prev_point = new Point_3D(x1, y1, z1); // previous 3d point
                      var current_point = new Point_3D(x2, y2, z2); // current 3d point

                      //instantiate Euclidean object
                      var Euclidean_obj = new Euclidean(prev_point, current_point);

                      //calculate Eclidean distance between 2 3D points and add to current Finger Euclidean calculation
                      var current_Finger = Finger_Arr[Finger_id_of_global_arr];
                      current_Finger.move_point_arr.push(Euclidean_obj.calc_distance());
                    }

                    //set current direction for next point comparison
                    if(y2 > y1){ //move up
                      this.current_move_direction = "up";
                    }else if(y2 < y1){
                      this.current_move_direction = "down";
                    }
                  }

                }

              }
            }

          };

          this.filter_data_foreach_finger = function(){
              if(this.fingers.length > 0){

                for(var i = 0; i < this.fingers.length; i++){

                  if(this.fingers[i] instanceof Object && this.fingers[i][0] !== undefined){

                      //console.log(this.palm[i]);
                      
                      console.log(this.fingers[i][0].id);

                      var tmp2 = this.fingers[i][0];
                      var x2 = tmp2.tipPositionX;
                      var y2 = tmp2.tipPositionY;
                      var z2 = tmp2.tipPositionZ;
                      var fingerid2 = tmp2.id;

                      var is_tremor = false;

                     
                        //create an tempt Finger object to keep movement points
                        var Finger_obj = "";
                        if(Finger_Arr.length > 0) // check whether Finger_Arr array contains any Finger object or not
                        {
                          var new_finger_index = Finger_Arr.length - 1;
                          Finger_obj = new Finger(fingerid2, "finger" + new_finger_index + "_Euclidean_chart");
                        }

                        //check duplicate finger in finger array
                        var Finger_id_of_global_arr = get_fingerindex_from_finger_list(fingerid2); //if the Fingerid of current captured movement is exist in global array, get that Finger object for adding new point to Finger object points array
                        if(Finger_id_of_global_arr == ""){

                            if(Finger_Arr.length > 0){
                                Finger_id_of_global_arr = Finger_Arr.length;
                            }else{
                                Finger_id_of_global_arr = 0;
                            }

                            //create a first Finger object
                            Finger_obj = new Finger(fingerid2, "finger" + Finger_id_of_global_arr + "_Euclidean_chart");

                            //add a finger to finger list
                            Finger_Arr.push(Finger_obj);

                        }

                        //instantiate 3D point object
                        var current_point = new Point_3D(x2, y2, z2); // current 3d point

                        //calculate Eclidean distance between 2 3D points and add to current Finger Euclidean calculation
                        var current_Finger = Finger_Arr[Finger_id_of_global_arr];
                        current_Finger.points.push(current_point);

                      }

                    }

                  }
            

          };

          this.cal_all_fingers_euclidean = function(){

              if(Finger_Arr.length > 0){

                for(var k=0; k < Finger_Arr.length; k++){

                  var Finger_tempt_obj_points_arr = Finger_Arr[k].points;

                  if(Finger_tempt_obj_points_arr.length >= 2){

                    for(var i = 1; i < Finger_tempt_obj_points_arr.length; i++){

                              //console.log(this.palm[i]);
                              
                              //console.log(Finger_tempt_obj_points_arr[i]);

                              var tmp = Finger_tempt_obj_points_arr[i-1];
                              var x1 = tmp.x;
                              var y1 = tmp.y;
                              var z1 = tmp.z;
                              var fingerid = tmp.id;

                              var tmp2 = Finger_tempt_obj_points_arr[i];
                              var x2 = tmp2.x;
                              var y2 = tmp2.y;
                              var z2 = tmp2.z;
                              var fingerid2 = tmp2.id;

                              var is_tremor = false;

                              //check changing direction of x
                              // if(x2 < x1 && y2 > y1){ //move up
                              //     this.current_move_direction = "up";
                              // }else if(x2 > x1 && y2 < y1){
                              //     this.current_move_direction = "down";
                              // }

                              //check changing direction of 
                              if(this.current_move_direction == ""){
                                is_tremor = true;
                              }
                              else if(this.current_move_direction == "up" && y2 < y1)// if prev move is "up" and current move is "down" = is_tremor
                              {
                                is_tremor = true;
                              }
                              else if(this.current_move_direction == "down" && y2 > y1)// if prev move is "down" and current move is "up" = is_tremor
                              {
                                is_tremor = true;
                              }

                              //start calculate if is_tremor flag is true
                              if(is_tremor == true){
                                //instantiate 3D point object
                                var prev_point = new Point_3D(x1, y1, z1); // previous 3d point
                                var current_point = new Point_3D(x2, y2, z2); // current 3d point

                                //instantiate Euclidean object
                                var Euclidean_obj = new Euclidean(prev_point, current_point);

                                //calculate Eclidean distance between 2 3D points and add to current Finger Euclidean calculation
                                var current_Finger = Finger_Arr[k];
                                current_Finger.move_point_arr.push(Euclidean_obj.calc_distance());
                              }

                              //set current direction for next point comparison
                              if(y2 > y1){ //move up
                                this.current_move_direction = "up";
                              }else if(y2 < y1){
                                this.current_move_direction = "down";
                              }
                          
                        }
                      }
                    }
                }

          };

          this.print_fingers_chart = function(){
            if(Finger_Arr.length > 0){
              for(var i = 0 ; i < Finger_Arr.length; i++){//loop each Finger
                var Finger_obj = Finger_Arr[i];

                  Finger_obj.print_chart(i); // print Euclidean calculation to the chart
                }
            }

            //clear global variable Finger_Arr
            Finger_Arr = new Array();
        };
      }


