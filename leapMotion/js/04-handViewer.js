var canvas = document.getElementById('handViewer');
var context = canvas.getContext('2d');

function frameController(frame){	

	context.clearRect (0 ,0 , 500 , 500);

	if(frame.hands.length<1){
		//Do nothing
	}else{

		if(frame.pointables.length>1){

			for(var i=0;i<frame.hands.length;i++){
				$("#coordinates").html(frame.hands[0].palmPosition[0]+"<br>"); //Left to right or X
				$("#coordinates").append(frame.hands[0].palmPosition[1]+"<br>"); //Up and down Z
				$("#coordinates").append(frame.hands[0].palmPosition[2]+"<br>"); //Y Back and forth
				var palmX = normalised(frame.hands[i].palmPosition[0])
				var palmY = normalised(frame.hands[i].palmPosition[2])

				for(var x=0;x<frame.hands[i].pointables.length;x++){
					
					var tipX = normalised(frame.hands[i].pointables[x].tipPosition[0])
					var tipY = normalised(frame.hands[i].pointables[x].tipPosition[2])

					context.beginPath();
					context.moveTo(palmX, palmY);
					context.lineTo(tipX, tipY);
					context.stroke();
				}
			}
		}
	}
	
	
}

function normalised(value){
	var normalisedValue = value+250;
	return normalisedValue;
}