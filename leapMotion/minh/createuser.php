<?php require('../scripts/header_minh.php');?>


	<link href="FortAwesome-Font-Awesome-ee55c85/css/font-awesome.css" rel="stylesheet"/>
	<link href="FortAwesome-Font-Awesome-ee55c85/css/font-awesome-ie7.css" rel="stylesheet"/>
	
	<!-- import custom javascript -->
	<script type="text/javascript" src="custom_js/ajax/xhr.js"></script>
	<script type="text/javascript" src="custom_js/ajax/ajaxprocess.js"></script>



	<div class="container-fluid">
		<div class="row-fluid">
			
			<div class="span8 well">
				<div class="navbar navbar-static">
					<div class="navbar-inner">
						<div class="container" style="width: auto;">
							<h3 class="brand">Create Users</h3>

						</div>
					</div>
				</div>
				<form id="edit-profile" class="form-horizontal">
				<div class="row-fluid">
					<div class="span12">
						
							<fieldset>
								<div class="control-group">
									<label class="control-label" for="username">Name</label>
									<div class="controls span5">
										<input class="form-control" size="10" type="text" class="input-medium disabled" id="name" value="">

									</div>
									<!-- /controls -->
								</div>
								<!-- /control-group -->
							</fieldset>
						
					</div>
				</div>
				<br>
				<div class="row-fluid">
					<div class="span12">
						<button type="reset" class="btn btn-default">Clear</button>
						<button onclick="createUser();" type="button" class="btn btn-success">Submit</button>
					</div>
				</div>
				</form>

			</div>
			<div class="span2">
				<!--ad space-->
			</div>
		</div>
	</div>

	<?php require('../scripts/scripts_minh.html');?>
	<script src="../js/FileSaver.min.js"></script>

	<!-- import custom js for report page -->
	<script src="custom_js/report2.js"></script>



	<script src="graph2/js/highcharts.js"></script>
	<script src="graph2/js/modules/exporting.js"></script>

<?php require('../scripts/footer.php');?>