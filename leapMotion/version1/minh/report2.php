<?php require('../scripts/header_minh.php');?>


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
			<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
		</div>

	</div>


	<?php require('../scripts/scripts_minh.html');?>
	<script src="../js/FileSaver.min.js"></script>

	<!-- import custom js for report page -->
	<script src="custom_js/report2.js"></script>



<script src="graph2/js/highcharts.js"></script>
<script src="graph2/js/modules/exporting.js"></script>

<?php require('../scripts/footer.php');?>
