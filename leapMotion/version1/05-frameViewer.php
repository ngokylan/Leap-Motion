<?php require('scripts/header.php');?>
<div class="container">
	<div class="row">
		<div class="col-md-4">
			<h3>Base Connection Information</h3>
			<div id='baseConnectionInfo'>
				
			</div>
		</div>
		<div class="col-md-6">
			<h3>Tracking Information</h3>
			<canvas id="handViewer" class='well' width="500" height="500"></canvas>
		</div>
		<div class="col-md-2">
			<h3>Controls</h3>
			<div id='controlState' class='well'>
				No Data Recorded
			</div>

			<div id='controls'>
				<button id='openFile' class='btn btn-success btn-block'>Open File</button>
				<button id='closeFile' class='btn btn-danger btn-block'>Close File</button>
				<button id='playbackControl' class='btn btn-primary btn-block'>Start Playback</button>
			</div>
		</div>

	</div>
</div>
<?php require('scripts/scripts.html');?>
<script src="js/05-frameViewer.js"></script>
<script src="js/leap.js"></script>
<script src="js/lmController.js"></script>

<?php require('scripts/footer.php');?>