<?php require('../scripts/header_minh.php');?>

<link href = "stylesg/slides.css" rel="stylesheet" />

<div align='center' class="container">
   <img src="./img/numberOfHeader.png" id="messageBox" />
  <div id="numberOfTutorial">

    <div id="interactiveArea" style="display:none">
      <h1 id= 'numberOfFingers'>0 Fingers</h1>

<div align='center' class="container">
	  	   <img src="./img/numbersOfFingers.png" id="messageBox" />
</div>
      <table class="table table-bordered" style="text-align:center; font-family:Arial">
        
        <tr id="row1">
          <td style="border:none"></td>
          <th id= "numberOfFingersHeader" colspan='3'> Number Of Fingers </th>

        </tr>
        <tr id="row2" style="font-weight:bold">
          <td id = 'modes' > Modes </td>
          <td id = 'finger1' > 1 Finger </td>
          <td id = 'finger2' > 2 Fingers </td>
          <td id = 'finger3' > 3+ Fingers </td>
        </tr>

        <tr id="row3">
          <td id = 'scrollAndClick' > Basic Mode </td>
          <td id = 'touch' > Click </td>
          <td id = 'scrollRotate' > Scroll,  Zoom and Rotate </td>
          <td id = 'scroll' > Scroll </td>
        </tr>


        <tr id="row3">
          <td id = 'fullTouch' > Advanced Mode</td>
          <td id = 'clickScroll' > Click , Scroll , Drag </td>
          <td id = 'zoomRotate' > Zoom , Rotate </td>
          <td id = 'draw' > Expose, Spaces </td>
        </tr>

      </table>
      <p> Quick Tip: Leave a gap between fingers to make sure they are seen. </p>

    </div>
  </div>
  <div class="buttons">
    <a class="btn btn-warning" href="touchScrollm.php"> <img src="./img/back.png"/></a>
    <a class="btn btn-info" href="readMorem.php"> <img src="./img/next.png"/></a>
  </div>
</div>

<?php require('../scripts/scripts_minh.html');?>
<script src="../js/FileSaver.min.js"></script>

<script src="./jsg/jquery-1.7.1.min.js"></script>
<script src="./jsg/leap.min.js"></script>
<script src="./jsg/init.js"></script>
<script src="./jsg/TUTORIAL.js"></script>
<script src="./jsg/numberOfTutorial.js"></script>

<?php require('../scripts/footer.php');?>
