<?php require('scripts/header.php');?>
<div class="container">
	<div class="row">
		<div class="col-md-4">
			<h3>Base Connection Information</h3>
			<div id='baseConnectionInfo'>
				
			</div>
		</div>
		<div class="col-md-8">
			<h3>Tracking Information</h3>
			<canvas id="handViewer" class='well' width="500" height="500"></canvas>
			<div id='coordinates'>Hello</div>
		</div>

	</div>
</div>
<?php require('scripts/scripts.html');?>
<script src="js/04-handViewer.js"></script>
<script src="js/leap.js"></script>
<script src="js/lmController.js"></script>


<?php require('scripts/footer.php');?>