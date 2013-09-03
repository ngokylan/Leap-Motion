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

  $.get('../files/test1.txt', function(data) {
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
      



      $(function () {
      $('#container').highcharts({
        chart: {
          zoomType: 'x',
          spacingRight: 20
        },
        title: {
          text: 'Tremor Report'
        },
        subtitle: {
          text: document.ontouchstart === undefined ?
          'Click and drag in the plot area to zoom in' :
          'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'linear',
                        maxZoom: 1, // fourteen days
                title: {
                  text: null
                }
            },
            yAxis: {
              title: {
                text: 'Moving Rate'
              }
            },
            tooltip: {
              shared: true
            },
            legend: {
              enabled: false
            },
            plotOptions: {
              area: {
                fillColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                  stops: [
                  [0, Highcharts.getOptions().colors[0]],
                  [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                  ]
                },
                lineWidth: 1,
                marker: {
                  enabled: false
                },
                shadow: false,
                states: {
                  hover: {
                    lineWidth: 1
                  }
                },
                threshold: null
              }
            },

             series: [{
                type: 'area',
              name: 'Left to right or X',
              pointInterval: 24 * 3600 * 1000,
                marker: {
                    symbol: 'square'
                },
                data: lefth_x
    
            }, {
              type: 'area',
                name: 'Up and down Z',
                pointInterval: 24 * 3600 * 1000,
                marker: {
                    symbol: 'diamond'
                },
                data: lefth_z
            }, {
                name: 'Y Back and forth',
                marker: {
                    symbol: 'circle'
                },
                data: lefth_y
            }]

          });
      });
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
  
}

function resetChart(){
   var lineChartData = "";

    
      lineChartData = {
        labels : [""],
        datasets : [
          {
            data : ""
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