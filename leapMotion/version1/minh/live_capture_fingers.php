<?php require('../scripts/header_minh.php');?>

<?php require('../scripts/scripts_minh.html');?>
<script src="./jsg/leap.min.js"></script>

<!-- Minh import JSTremor object class -->
<script src="./custom_js/Object/JSTremor.js"></script>

<!-- Minh import ChartTremor object class -->
<script src="./custom_js/Object/ChartTremor.js"></script>

<style>
  html, body { width:100%; height:100%; font-size: 15px; font-family: Helvetica, Arial, sans-serif;}
  #pointables { width:1300px; height:260px; margin: 0 auto;}
  #Euclidean_pointables { width:1300px; height:260px; margin: 0 auto;}
  #hands { width:1570px; height:260px;  margin: 0 auto;}
  #Euclidean_hands { width:1300px; height:260px; margin: 0 auto;}
  .parcoords text { font-size: 13px; opacity: 0.6; font-weight: bold; }
  .parcoords text.label { font-size: 15px; opacity: 1;}
  h2 { text-align: center; margin: 48px 0 6px; }
</style>


<h2>Fingers</h2>
<div id="pointables" class="parcoords"></div>
<h2>Finger Euclidean <button id="btn_pointable_Euclidean" class="btn btn-info">Display Euclidean Chart</button></h2>
<div class="row">
  <div class="span4">
    <h2> Finger 1</h2>
    <div id="finger0_Euclidean_chart" style="min-width: 150px; height: 200px; margin: 0 auto"></div>
  </div>
  
  <div class="span4"><h2> Finger 2</h2><div id="finger1_Euclidean_chart" style="min-width: 150px; height: 200px; margin: 0 auto"></div></div>
  <div class="span4"><h2> Finger 3</h2><div id="finger2_Euclidean_chart" style="min-width: 150px; height: 200px; margin: 0 auto"></div></div>
  <div class="span4"><h2> Finger 4</h2><div id="finger3_Euclidean_chart" style="min-width: 150px; height: 200px; margin: 0 auto"></div></div>
  <div class="span4"><h2> Finger 5</h2><div id="finger4_Euclidean_chart" style="min-width: 150px; height: 200px; margin: 0 auto"></div></div>
</div>


<!-- <script src="//js.leapmotion.com/0.2.0-beta1/leap.min.js"></script> -->

<script src="js/d3.v3.min.js"></script>
<script src="js/d3.parcoords.js"></script>
<link href="js/d3.parcoords.css" rel="stylesheet" type="text/css"></link>

<script src="../js/leap.js"></script>
<script src="../js/lmController.js"></script>

<!-- high charts API -->
<script src="graph2/js/highcharts.js"></script>
<script src="graph2/js/modules/exporting.js"></script>


<!-- Minh custom_js for main process of this page -->
<script src="./custom_js/live_capture_fingers.js"></script>

<?php require('../scripts/footer.php');?>
