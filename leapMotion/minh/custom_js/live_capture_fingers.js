  var color = d3.scale.category10();

  var pointParcoords = d3.parcoords()("#pointables")
  .margin({
    top: 60,
    left: 0,
    right: 0,
    bottom: 10
  })
  .data([{
    id: 0,
    handId: -1,
    length: 0,
    directionX: -1,
    directionY: -1,
    directionZ: -1,
    tipPositionX: -250,
    tipPositionY: 0,
    tipPositionZ: -250,
    tipVelocityX: -1000,
    tipVelocityY: -1000,
    tipVelocityZ: -1000
  }, {
    id: 150,
    handId: 25,
    length: 100,
    directionX: 1,
    directionY: 1,
    directionZ: 1,
    tipPositionX: 150,
    tipPositionY: 200,
    tipPositionZ: 250,
    tipVelocityX: 200,
    tipVelocityY: 200,
    tipVelocityZ: 200
  }])
  .alpha(1)
  .color(function(d) { return color(d.handId);})
  .render()
  .reorderable();


  pointParcoords.ctx.foreground.lineWidth = 3.5;

  d3.selectAll("text.label")
  .attr("dy", function(d,i) { return i % 2 ? -32 : -8; });


//Minh declare array for pointables and hands
var pointables_arr = new Array();
var hands_arr = new Array();
var frame_container = "";

Leap.loop(function(frame_obj) {

  frame_container = frame_obj;

  var pointables = frame_obj.pointables.map(function(d) {
    return {
      id: d.id,
      handId: d.handId,
      length: d.length,
      directionX: d.direction[0],
      directionY: d.direction[1],
      directionZ: d.direction[2],
      tipPositionX: d.tipPosition[0],
      tipPositionY: d.tipPosition[1],
      tipPositionZ: d.tipPosition[2],
      tipVelocityX: d.tipVelocity[0],
      tipVelocityY: d.tipVelocity[1],
      tipVelocityZ: d.tipVelocity[2]
    };
  });

  pointables_arr.push(pointables);

  pointParcoords.data(pointables).render();
});


//Minh
//instantiate JSTremor object
var JSTremor_pointable = new JSTremor(hands_arr, pointables_arr);
$("#btn_pointable_Euclidean").click(function(){

  JSTremor_pointable.pointable = pointables_arr;

  //calculate Euclidean distance of entire movement points
  //JSTremor_pointable.cal_fingers_euclidean();
  JSTremor_pointable.filter_data_foreach_finger();
  JSTremor_pointable.cal_all_fingers_euclidean();

  //print out chart for each finger
  JSTremor_pointable.print_fingers_chart();

  clear_arr();
});

var Frame_object = "";

function frameController(frame){

  Frame_object = frame;
  
  var output="";

  if(frame.hands.length<1){
    output="There are no hands";
  }else{

    for(var i=0;i<frame.hands.length;i++){

      //pointables_arr = frame.hands[i].pointables;
    
    }
  }

  //alert(output);
}


function clear_arr(){

  hands_arr = new Array();
  pointables_arr = new Array();

  JSTremor_pointable.pointable = pointables_arr;
}