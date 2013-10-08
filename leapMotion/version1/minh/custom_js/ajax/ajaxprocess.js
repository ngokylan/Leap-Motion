/*
Student Name: Minh Duc Nguyen
Student ID: 171001x
Page: ajaxprocess.js
Main function:
- create DOM table
- create row and append to table
- send request between client and server
*/

//detecting browser
browserName = "";
verOffset = "";
nAgt = navigator.userAgent;
var loginUserInfo = "";
var loginUserID = "";

// In MSIE, the true version is after "MSIE" in userAgent
if (( verOffset = nAgt.indexOf("MSIE")) != -1) {
	browserName = "Microsoft Internet Explorer";
}
// In Chrome, the true version is after "Chrome"
else if (( verOffset = nAgt.indexOf("Chrome")) != -1) {
	browserName = "Chrome";
}
// In Safari, the true version is after "Safari" or after "Version"
else if (( verOffset = nAgt.indexOf("Safari")) != -1) {
	browserName = "Safari";
}
// In Firefox, the true version is after "Firefox"
else if (( verOffset = nAgt.indexOf("Firefox")) != -1) {
	browserName = "Firefox";
}

// file ajaxprocess.js
// using POST method

function setCurrentLoginUserID(userid) {
	loginUserID = userid;
}

//request insert new activity
function insertActivity(userid, topic, type, start, duration, act_option, sender_channel_id, status, attachFiles) {
	var xhr = createRequest();
	if (xhr) {
		var requestbody = "user_id=" + encodeURIComponent(userid) + "&topic=" + encodeURIComponent(topic) + "&type=" + encodeURIComponent(type) + "&start=" + encodeURIComponent(start) + "&duration=" + encodeURIComponent(duration) + "&act_option=" + encodeURIComponent(act_option) + "&sender_channel_id=" + encodeURIComponent(sender_channel_id) + "&status=" + encodeURIComponent(status) + "&attachFiles=" + encodeURIComponent(attachFiles);
		xhr.open("POST", "db_process/insertActivity.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function() {
			//alert(xhr.readyState); // to let us see the state of the computation
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (xhr.responseText == "success") {

				}

			} // end if
		}// end anonymous call-back function
		xhr.send(requestbody);
	} // end if

}

//load user list for report
function loadUserList() {
	var xhr = createRequest();
	if (xhr) {
		var requestbody = "action=" + encodeURIComponent("get");

		xhr.open("POST", "db_process/loadUserList.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function() {
			//alert(xhr.readyState); // to let us see the state of the computation
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (xhr.responseText != "fail") {
					var tempt = xhr.responseText;
					tempt = JSON.parse(tempt);
					var aDataSet = new Array();
					if (tempt != null) {
						for (var i = 0; i < tempt.length; i++) {
							var arr = String(tempt[i]).split(",");
							aDataSet.push(arr);
						}
					}

					// oldActivityArea.innerHTML = tempt;
					//
					// //call function from custom_js/ajax/ajaxParseScript.js to execute javascript function from server response
					// parseScript(tempt);
					$(document).ready(function() {

						$('#tablelistuser').dataTable({
							"aaData" : aDataSet,
							"bPaginate" : true,
							"aoColumns" : [{
								"bSortable" : true
							}, {
								"bSortable" : true
							}, {
								"bSortable" : true
							}, {
								"bSortable" : true
							}]
						})

					});
					// fnCreateDateRangeInput();
					//
					// fnCreateRangeInput();
				}

			} // end if
		}// end anonymous call-back function
		xhr.send(requestbody);
	} // end if
}

//request insert new activity
function createUser() {
	var name = $("#name").val();
	if(name != ""){
		var xhr = createRequest();
		if (xhr) {
			var requestbody = "name=" + encodeURIComponent(name);
			xhr.open("POST", "db_process/insertUser.php", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function() {
			//alert(xhr.readyState); // to let us see the state of the computation
			if (xhr.readyState == 4 && xhr.status == 200) {
				var tempt = xhr.responseText;
				tempt = tempt.replace(/\s/g, "");
				if (tempt == "success") {
					alert("Created!");
				}else{
					alert("Error!");
				}

			} // end if
		}// end anonymous call-back function
		xhr.send(requestbody);
		} // end if
	}else{
		alert("Please fill in name!");
	}

}

//load user list for recording - apply for 03-frameSaver.php page
function loadUserList_to_combobox() {
	var xhr = createRequest();
	if (xhr) {
		var requestbody = "action=" + encodeURIComponent("get");

		xhr.open("POST", "minh/db_process/loadUserList_to_combobox.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function() {
			//alert(xhr.readyState); // to let us see the state of the computation
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (xhr.responseText != "fail") {
					var tempt = xhr.responseText;
					tempt = JSON.parse(tempt);
					var aDataSet = new Array();
					if (tempt != null) {
						for (var i = 0; i < tempt.length; i++) {
							var arr = String(tempt[i]).split(",");
							$("#userlist").append(arr);
						}
					}

				}

			} // end if
		}// end anonymous call-back function
		xhr.send(requestbody);
	} // end if
}
