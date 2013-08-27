var canvas = document.getElementById('handViewer');
var context = canvas.getContext('2d');

function frameController(frame){	

	context.clearRect (0 ,0 , 500 , 500);

	if(frame.hands.length<1){
		//Do nothing
	}else{
		for(var i=0;i<frame.hands.length;i++){

			var palmX = normalised(frame.hands[i].palmPosition[0])
			var palmY = normalised(frame.hands[i].palmPosition[1])

			for(var x=0;x<frame.hands[i].pointables.length;x++){
				
				var tipX = normalised(frame.hands[i].pointables[x].tipPosition[0])
				var tipY = normalised(frame.hands[i].pointables[x].tipPosition[1])

				context.beginPath();
				context.moveTo(palmX, palmY);
				context.lineTo(tipX, tipY);
				context.stroke();
			}
		}
	}
	
	//$("#coordinates").html(frame.dump());
}

function normalised(value){
	var normalisedValue = value+250;
	return normalisedValue;
}