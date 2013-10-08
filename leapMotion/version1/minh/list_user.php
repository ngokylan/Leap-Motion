<?php require('../scripts/header_minh.php');?>
	
	
	<link href="DT_bootstrap/DT_bootstrap.css" rel="stylesheet"/>
	<link href="FortAwesome-Font-Awesome-ee55c85/css/font-awesome.css" rel="stylesheet"/>
	<link href="FortAwesome-Font-Awesome-ee55c85/css/font-awesome-ie7.css" rel="stylesheet"/>
	
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="span8 well">
				<div class="navbar navbar-static">
					<div class="navbar-inner">
						<div class="container" style="width: auto;">
							<h3 class="brand">User List and Files</h3>

						</div>
					</div>
				</div>

				<div class="row-fluid">
					<div class="span12">
						<table class="table table-striped responsive dataTable" id="tablelistuser" aria-describedby="example_info">
                            <thead>
                                <tr role="row">
                                	<th>ID</th>
                                	<th>Name</th>
                                	<th>File URL</th>
                                	<th>Created Date</th>
                                </tr>
                            </thead>
                        </table>
					</div>
				</div>

			</div>
			<div class="span2">
				<!--ad space-->
			</div>
		</div>
	</div>

	<?php require('../scripts/scripts_minh.html');?>
	<!-- import datatables -->
	<script src="DT_bootstrap/jquery.dataTables.js"></script>
	<script src="DT_bootstrap/DT_bootstrap.js"></script>
	<script src="DT_bootstrap/jquery.dataTables.columnFilter.js"></script>

	<script src="../js/FileSaver.min.js"></script>

	<!-- import custom js for report page -->
	<script src="custom_js/report2.js"></script>

	<script src="graph2/js/highcharts.js"></script>
	<script src="graph2/js/modules/exporting.js"></script>

	<script>
		loadUserList();
	</script>

<?php require('../scripts/footer.php');?>