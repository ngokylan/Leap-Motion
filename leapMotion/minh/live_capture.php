<?php require('../scripts/header_minh.php');?>

<?php require('../scripts/scripts_minh.html');?>
<script src="./jsg/leap.min.js"></script>

<style>
html, body { width:100%; height:100%; font-size: 15px; font-family: Helvetica, Arial, sans-serif;}
#pointables { width:1300px; height:260px; margin: 0 auto;}
#hands { width:1570px; height:260px;  margin: 0 auto;}
.parcoords text { font-size: 13px; opacity: 0.6; font-weight: bold; }
.parcoords text.label { font-size: 15px; opacity: 1;}
h2 { text-align: center; margin: 48px 0 6px; }
</style>
<h2>Pointables</h2>
<div id="pointables" class="parcoords"></div>
<h2>Hands</h2>
<div id="hands" class="parcoords"></div>
<!-- <script src="//js.leapmotion.com/0.2.0-beta1/leap.min.js"></script> -->
<script src="js/d3.v3.min.js"></script>
<script src="js/d3.parcoords.js"></script>
<link href="js/d3.parcoords.css" rel="stylesheet" type="text/css"></link>
<script>
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
    id: 25,
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

pointParcoords.ctx.foreground.lineWidth = 3.5;
handParcoords.ctx.foreground.lineWidth = 6;

d3.selectAll("text.label")
  .attr("dy", function(d,i) { return i % 2 ? -32 : -8; });

Leap.loop(function(obj) {
  var pointables = obj.pointables.map(function(d) {
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
    }
  });

  var hands = obj.hands.map(function(d) {
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

  pointParcoords.data(pointables).render();
  handParcoords.data(hands).render();
});
</script>

<?php require('../scripts/footer.php');?>
