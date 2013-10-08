<?php require('../scripts/header_minh.php');?>

<link href="css/visualizer.css" rel="stylesheet">

<div id="measure_result" class="container">
  <div class="row">
    <div class="col-md-10">
      <h3>Device Status</h3>
      <div id='baseConnectionInfo'>

      </div>
      <h3>Tracking Information</h3>
      <div id='frequencyInformation'></div>
    </div>
    <div class="col-md-2">
      <h3>Controls</h3>
      <div id='controlState' class='well'>
        No Data Recorded
      </div>

      <div id='controls'>
        <button id='startStopRecording' class='btn btn-success btn-block'>Start</button>
        <button id='closeFile' class='btn btn-danger btn-block'>Close File</button>
        <button id='openFile' class='btn btn-success btn-block'>Open File</button>
      </div>
    </div>
  </div>
</div>

<div id="measure_virtualizer" class="container-fluid hidden hidenonspace">
  <div class="row-fluid">



    <div id="context_3d">
      <div id="app" class="show-hands">
        <!--   <button id="showHands">Show Hands</button>
        <button id="hideHands">hide Hands</button> -->
        <div id="scene">
          <div id="cube" class="cube">
            <div class="face tp"></div>
            <div class="face lt"></div>
            <div class="face rt"></div>
            <div class="face ft"></div>
            <div class="face bk"></div>
          </div>
          <div id="finger" class="cube finger">
            <div class="face tp"></div>
            <div class="face lt"></div>
            <div class="face rt"></div>
            <div class="face ft"></div>
            <div class="face bk"></div>
          </div>
          <div id="sphere" class="cube sphere">
            <div class="face tp"></div>
            <div class="face lt"></div>
            <div class="face rt"></div>
            <div class="face ft"></div>
            <div class="face bk"></div>
          </div>
        </div>
      </div>

    </div>

  </div>

  <div id="capturing_control">
    <div id='controls'>
    <br><br>
    <div id="recording_progress" class="well">
      <div class="progress progress-striped active">
        <div class="progress-bar progress-bar-success"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
          <span class="sr-only">45% Complete</span>
        </div>
      </div>
       <span style="color: black">Capturing...</span>
    </div>
     <button id='analyzeFile' class='btn btn-primary btn-block'>Analyze File </button>
   </div>
 </div>

 <div class="row-fluid hidden hidenonspace">
  <div class="col-md-7 col-md-offset-3">
    <canvas id="handViewer" class='well' width="500" height="500"></canvas>
  </div>
</div>
</div>

<div class="modal fade" id="instruction_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 id="instruction_title" class="modal-title">Moving Hand to the right spot on top of the device</h4>
      </div>
      <div class="modal-body">
        <img id="instruction_img" src="img/start-instruction.gif" style="width:600px; height:300px; ">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->



<script src="js/leap.min.js"></script>
<?php require('../scripts/scripts_minh.html');?>

<!-- frame saver script -->
<script src="custom_js/03-frameSaver.js"></script>
<script src="custom_js/lmController.js"></script>
<script src="../js/FileSaver.min.js"></script>

<!-- visualizer script -->
<script src="custom_js/visualizer.js"></script>

<?php require('../scripts/footer.php');?>
