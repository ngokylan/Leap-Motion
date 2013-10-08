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
			<div id='trackingInformation'>
				
			</div>
		</div>
		<div class="col-md-2">
			<h3>Controls</h3>
			<div id='controlState' class='well'>
				Not Recording
			</div>

			<div id='controls'>
				<label for="profileName">User:</label>
				<input type='text' id='profileName' class='form-control'>
				<label for="recordingDelay">Recording Delay:</label>
				<input type='text' id='recordingDelay' value='5' class='form-control'><br>
				<button id='startStopRecording' class='btn btn-success btn-block'>Start Recording</button>
				<button id='resetRecording' class='btn btn-danger btn-block'>Reset Recording</button>
				<button id='saveRecording' class='btn btn-primary btn-block'>Save Recording</button>

				
			</div>
		</div>

	</div>
</div>
<?php require('scripts/scripts.html');?>
<script src="js/03-frameSaver.js"></script>
<script src="js/leap.js"></script>
<script src="js/lmController.js"></script>
<script src="js/FileSaver.min.js"></script>


<?php require('scripts/footer.php');?>