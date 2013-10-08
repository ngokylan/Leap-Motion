function frameController(frame){
	
	var output="";

	if(frame.hands.length<1){
		output="There are no hands";
	}else{
		for(var i=0;i<frame.hands.length;i++){

			output+="<h3>Hand: "+frame.hands[i].id+"</h3>";

			for(var x=0;x<frame.hands[i].pointables.length;x++){
				output +="Finger: "+frame.hands[i].pointables[x].id+"<br>";
			}
		
		}
	}

	$("#trackingInformation").html(output);
}

