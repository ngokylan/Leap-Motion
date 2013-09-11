//declare sourceid of current user on the first time login
//cause another user will broadcast sourceid once they login as well
var currentSourceID = "";


function getDataFromMsg(msg)
{
	
	//full message
	//var msg = '{"ns":"org.jwebsocket.plugins.system","type":"broadcast","sourceId":"01.3835.117","sender":"root","pool":"","data":"adfasd","utid":48}'; 
	var getDataPos = msg.search("data");
	var subStrFromData = msg.substring(getDataPos,msg.length);
	// we got this      |         data":"adfasd","utid":48}  		|
	
	var temptPos = subStrFromData.search("utid");		
	var fromDataToDataContent = temptPos - 3;			//			","utid":48}  
	
	var dataAndContent = subStrFromData.substring(0, fromDataToDataContent);		//	-> we got this 		|	data":"adfasd	|
	var contentPos = dataAndContent.search('":"') + 3;
	
	var content = dataAndContent.substring(contentPos, dataAndContent.length);
	
	//var userid = getUserIDfromMessage(content);
	//alert(content);
	return content;
	
}

function getUserIDfromMessage(msg)
{
	//uid=1;Hello
	var tempt = msg.split(";");
	var userid = "";
	if(tempt.length > 1)
	{
		var idpos = tempt[0].search("=") + 1;
		userid = tempt[0].substring(idpos, tempt[0].length);
	}
	else
	{
		return "broadcast";
	}
	
	return userid;
}

function getSourceIdFromMsg(msg)
{	
	if(currentSourceID == "")
	{
		//alert(msg);
		//full message
		//var msg = '{"type":"response","code":0,"msg":"ok","utid":2,"ns":"org.jwebsocket.plugins.system","reqType":"login","username":"root","sourceId":"01.21052.124"}'; 
		var getDataPos = msg.search("sourceId");
		var subStrFromSourceId = msg.substring(getDataPos,msg.length);
		// we got this      |   sourceId":"01.24567.180","timeout":0,"username":"anonymous","protocolVersion":13,"subProtocol":"org.jwebsocket.json","anonymous":true}'  		|
				
		var contentPos = subStrFromSourceId.search('":"') + 3;
		var sourceContentAndTail = subStrFromSourceId.substring(contentPos, subStrFromSourceId.length);
		// we got this      |   01.24567.180","timeout":0,"username":"anonymous","protocolVersion":13,"subProtocol":"org.jwebsocket.json","anonymous":true}'  		|
		
		var sourceEndPos = sourceContentAndTail.search('timeout') - 3;
		
		currentSourceID = sourceContentAndTail.substring(0, sourceEndPos);	
		alert(currentSourceID);
	}
	
}

function getMsgDataFromChannelMsg(msg)
{
	//full message
	/*
	 *  '{"ns":"org.jwebsocket.plugins.channels","type":"data","data":"adfadf","map":
	 * {"field1":"data","field2":["item1","item2"]},"publisher":"01.12116.440","channelId":"53"}'
	 */
	
	var getDataEndPos = msg.search("map") - 3;
	var content = "";
	if(msg.search("pool") >=0)
	{
		var content = getDataFromMsg(msg);		
			
		return content;
	}
	else if(getDataEndPos >= 0)
	{
		var subStrFromData = msg.substring(0, getDataEndPos);
		// we got this      |        '{"ns":"org.jwebsocket.plugins.channels","type":"data","data":"adfadf		|
		
		var dataPos = subStrFromData.search('"data":"') + 8;	
		
		content = subStrFromData.substring(dataPos, subStrFromData.length);
				
		return content;
	}
	else
		return "";
	
}




