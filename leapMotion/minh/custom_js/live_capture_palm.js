  var color = d3.scale.category10();



  var handParcoords = d3.parcoords()("#hands")
  .margin({
    top: 60,
    left: 20,
    right: 20,
    bottom: 10
  })
  .data([{
    id: 0,
    directionX: -1,
    directionY: -1,
    directionZ: -1,
    palmNormalX: -1,
    palmNormalY: -1,
    palmNormalZ: -1,
    palmPositionX: -250,
    palmPositionY: 0,
    palmPositionZ: -250,
    palmVelocityX: -1000,
    palmVelocityY: -1000,
    palmVelocityZ: -1000,
    sphereCenterX: -250,
    sphereCenterY: 0,
    sphereCenterZ: -250,
    sphereRadius: 0,
  }, {
    id: 25,
    directionX: 1,
    directionY: 1,
    directionZ: 1,
    palmNormalX: 1,
    palmNormalY: 1,
    palmNormalZ: 1,
    palmPositionX: 250,
    palmPositionY: 400,
    palmPositionZ: 250,
    palmVelocityX: 1000,
    palmVelocityY: 1000,
    palmVelocityZ: 1000,
    sphereCenterX: 250,
    sphereCenterY: 400,
    sphereCenterZ: 250,
    sphereRadius: 200
  }])
  .alpha(1)
  .color(function(d) { return color(d.id);})
  .render()
  .reorderable();

  handParcoords.ctx.foreground.lineWidth = 6;

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

  var hands = frame_obj.hands.map(function(d) {
    return {
      id: d.id,
      length: d.length,
      directionX: d.direction[0],
      directionY: d.direction[1],
      directionZ: d.direction[2],
      palmNormalX: d.palmNormal[0],
      palmNormalY: d.palmNormal[1],
      palmNormalZ: d.palmNormal[2],
      palmPositionX: d.palmPosition[0],
      palmPositionY: d.palmPosition[1],
      palmPositionZ: d.palmPosition[2],
      palmVelocityX: d.palmVelocity[0],
      palmVelocityY: d.palmVelocity[1],
      palmVelocityZ: d.palmVelocity[2],
      sphereCenterX: d.sphereCenter[0],
      sphereCenterY: d.sphereCenter[1],
      sphereCenterZ: d.sphereCenter[2],
      sphereRadius: d.sphereRadius
    }
  });
  hands_arr.push(hands);

  handParcoords.data(hands).render();
});


//Minh

//instantiate JSTremor object
var JSTremor_hand = new JSTremor(frame_container.hands, frame_container.pointables);
$("#btn_hand_Euclidean").click(function(){

  JSTremor_hand.palm = hands_arr;
  JSTremor_hand.pointable = pointables_arr;

  //calculate Euclidean distance of entire movement points
  var palm_euclidean_arr = JSTremor_hand.cal_palm_euclidean();
  //render on chart
  var ChartTremor_obj = new ChartTremor(palm_euclidean_arr, "hands_Euclidean_chart");

  ChartTremor_obj.generate_chart();

  clear_arr();
});

function clear_arr(){
  hands_arr = new Array();
  pointables_arr = new Array();
}