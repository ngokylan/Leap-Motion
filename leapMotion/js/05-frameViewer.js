var frames;

function frameController(frame){

}

$("#openRecording").click(function() {

	$.get('files/frameDump-1.txt', function(data) {
		frames=data.split("\n\r");

		for(var i=0;i<frames.length;i++){
			frames[i] = JSON.parse(frames[i]);
			if(frames[i+1]==""){
				break;
			}
		}

		console.log(frames[500].pointables);

		$("#controlState").html("Data Loaded");
	});
});

$("#closeRecording").click(function() {
	$("#controlState").html("No Data Loaded");
	frames=null;
});