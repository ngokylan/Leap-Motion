<?php require('../scripts/header_minh.php');?>
	
<body>


<script src="graph/Chart.js"></script>
<link href = "stylesg/slides.css" rel="stylesheet" />
<div align='center' class="container">
<div class="span4">
		<div class="col-md-2">
			<h3>Controls</h3>
			<div id='controlState' class='well'>
				No Data Recorded
			</div>

			<div id='controls'>
				<button id='openRecording' class='btn btn-success btn-block'>Open Recording</button>
				<button id='closeRecording' class='btn btn-danger btn-block'>Close Recording</button>
				<!--  <button id='playRecording' class='btn btn-primary btn-block'>Play Recording</button> -->
			</div>
		</div>
</div>
	<div class="row">
  			<div class="col-md12 pull-right"><canvas id="line" height="500" width="800"></canvas></div>
		
		
	</div>
	<div class="row">
  		<div class="col-md-12">	
  			<div><span style="background-color: rgba(255,51,102,1)">&nbsp;&nbsp;&nbsp;&nbsp;</span> Left to right or X</div>
  			<div><span style="background-color: rgba(23,74,88,1)">&nbsp;&nbsp;&nbsp;&nbsp;</span> Up and down Z</div>
  			<div><span style="background-color: rgba(93,123,23,1)">&nbsp;&nbsp;&nbsp;&nbsp;</span> Y Back and forth</div>
  		</div>
		
	</div>

	
</div>


<?php require('../scripts/scripts_minh.html');?>
<script src="../js/FileSaver.min.js"></script>

<!-- import custom js for report page -->
<script src="custom_js/report.js"></script>

<?php require('../scripts/footer.php');?>
