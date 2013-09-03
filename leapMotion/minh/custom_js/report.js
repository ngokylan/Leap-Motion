var frames;

function frameController(frame){

}

var leftHand_arr = new Array();
var lefth_x = new Array();
var lefth_z = new Array();
var lefth_y = new Array();

var rightHand_arr = new Array();
var righth_x = new Array();
var righth_z = new Array();
var righth_y = new Array();

$("#openRecording").click(function() {

  $.get('../files/frameDump-1.txt', function(data) {
    frames=data.split("\n\r");

    
    var countHand = 0;

    for(var i=0;i<frames.length;i++){
      var t = JSON.parse(frames[i]);

      if(t.hands.length == 2){
        leftHand_arr.push(t.hands[0].palmPosition);
        rightHand_arr.push(t.hands[1].palmPosition);

        countHand = 2;
      }else if(t.hands.length == 1){
        leftHand_arr.push("");
        lefth_x.push(t.hands[0].palmPosition[0]);
        lefth_z.push(t.hands[0].palmPosition[1]);
        lefth_y.push(t.hands[0].palmPosition[2]);

        countHand = 1;
      }
    

      frames[i] = t;
      if(frames[i+1]==""){
        break;
      }
    }

    console.log(frames[500].pointables);

    //call function to generate chart
    generate_chart(leftHand_arr, rightHand_arr, countHand);

    $("#controlState").html("Data Loaded");
  });
});

$("#closeRecording").click(function() {
  $("#controlState").html("No Data Loaded");
  frames=null;
});

function generate_chart(leftHand_arr, rightHand_arr, countHand){

    var lineChartData = "";

    if(countHand == 1){
      lineChartData = {
        labels : leftHand_arr,
        datasets : [
          {
            strokeColor : "rgba(255,51,102,1)",
            pointStrokeColor : "#FF3366",
            data : lefth_x
          },{
            strokeColor : "rgba(23,74,88,1)",
            pointStrokeColor : "#00B88A",
            data : lefth_y
          },{
            strokeColor : "rgba(93,123,23,1)",
            pointStrokeColor : "#3366FF",
            data : lefth_z
          }
        ]
        
      };
    }else if(countHand == 2){

      lineChartData = {
        labels : ["","","","","","",""],
        datasets : [
          {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,1)",
            pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#fff",
            data : [frames[500].hands[0].palmPosition[0],frames[501].hands[0].palmPosition[0],frames[502].hands[0].palmPosition[0]]
          },
          {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            pointColor : "rgba(151,187,205,1)",
            pointStrokeColor : "#fff",
            data : [frames[500].hands[1].palmPosition[0],frames[501].hands[1].palmPosition[0],frames[502].hands[1].palmPosition[0]]
          }
        ]
        
      };
    
    }
   
  // new Chart(document.getElementById("doughnut").getContext("2d")).Doughnut(doughnutData);
  new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData, {datasetFill:false,pointDot:false});
  
}

function resetChart(){
   var lineChartData = "";

    
      lineChartData = {
        labels : [""],
        datasets : [
          {
            strokeColor : "rgba(255,51,102,1)",
            pointStrokeColor : "#FF3366",
            data : null
          }
        ]
        
      };

  new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);

  var leftHand_arr = new Array();
  var lefth_x = new Array();
  var lefth_z = new Array();
  var lefth_y = new Array();

  var rightHand_arr = new Array();
  var righth_x = new Array();
  var righth_z = new Array();
  var righth_y = new Array();
}

$("#closeRecording").click(function() {
    currentlyRecording=false;
    $("#startStopRecording").html('Start Recording');
    $("#controlState").html('Not Recording');
    recordedData = '';
    framesRecorded = 0;

    resetChart();
});