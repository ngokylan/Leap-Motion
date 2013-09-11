

function ChartTremor(points_distance_arr, divid){

  this.calc_distance_arr = points_distance_arr;
  this.div_id = divid;

    //function to generate chart
    this.generate_chart = function(){
      $('#' + this.div_id).highcharts({
        chart: {
          zoomType: 'y',
          spacingRight: 200.00005
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
            maxZoom: 10000000, // fourteen days
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
            name: 'Euclidean of movement',
            pointInterval: 24 * 3600 * 1000,
            marker: {
              symbol: 'square'
            },
            data: points_distance_arr

          }]

        });
    };

    //reset chart function
    this.resetChart = function(){
      $("#" + this.div_id).empty(); 

      options.series = [];
      chart = new Highcharts.Chart(options);
    };

    
}


