/*
* File:        jquery.dataTables.columnFilter.js
* Version:     0.9.0
* Author:      Jovan Popovic 
* 
* Copyright 2011 Jovan Popovic, all rights reserved.
*
* This source file is free software, under either the GPL v2 license or a
* BSD style license, as supplied with this software.
* 
* This source file is distributed in the hope that it will be useful, but 
* WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
* or FITNESS FOR A PARTICULAR PURPOSE. 
* 
* Parameters:
* @sPlaceHolder                 String      Place where inline filtering function should be place ("tfoot", "thead"). Default is "tfoot"
* @sRangeSeparator              String      Separatot that will be used when range values are sent to the server-side. Default value is "~".
* @iFilteringDelay              int         TODO: Delay that will be set between the filtering requests. Default is 250.
* @sRangeFormat                 string      Default format of the From ... to ... range inputs. Default is From {from} to {to}
* @aoColumns                    Array       Array of the filter settings that will be applied on the columns

http://www.datatables.net/plug-ins/filtering

*/







    var asInitVals, i, label, th;

    var sTableId = "table";
    var sRangeFormat = "From {from} to {to}";
    //Array of the functions that will override sSearch_ parameters
    var afnSearch_ = new Array();
    var aiCustomSearch_Indexes = new Array();

    var oFunctionTimeout = null;

function clearAdvancedSearch(){
	$("#date_from").attr("value","");
	$("#date_to").attr("value","");
	$("#time_from").attr("value","");
	$("#time_to").attr("value","");
	$("#duration_min").attr("value","");
	$("#duration_max").attr("value","");
}

function fnCreateRangeInput() {
	$("#collapseTable").slideUp(1).fadeIn(400);
	//date filter
	$.fn.dataTableExt.afnFiltering.push(function(oSettings, aData, iDataIndex) {
		var iFini = document.getElementById('date_from').value;
		var iFfin = document.getElementById('date_to').value;
		// var iFini  = new Date(datefrom[2]+"-"+datefrom[1]+"-"+datefrom[0]);
		// var iFfin  = new Date(dateto[2]+"-"+dateto[1]+"-"+dateto[0]);

		var iStartDateCol = 2;
		var iEndDateCol = 2;

		iFini = iFini.substring(6, 10) + iFini.substring(3, 5) + iFini.substring(0, 2)
		iFfin = iFfin.substring(6, 10) + iFfin.substring(3, 5) + iFfin.substring(0, 2)

		var datofini = aData[iStartDateCol].substring(6, 10) + aData[iStartDateCol].substring(3, 5) + aData[iStartDateCol].substring(0, 2);
		var datoffin = aData[iEndDateCol].substring(6, 10) + aData[iEndDateCol].substring(3, 5) + aData[iEndDateCol].substring(0, 2);

		if (iFini == "" && iFfin == "") {
			return true;
		} else if (iFini <= datofini && iFfin == "") {
			return true;
		} else if (iFfin >= datoffin && iFini == "") {
			return true;
		} else if (iFini <= datofini && iFfin >= datoffin) {
			return true;
		}
		return false;
	});

	//time range filter
	$.fn.dataTableExt.afnFiltering.push(function(oSettings, aData, iDataIndex) {
		var iColumn = 3;
		var iMin = document.getElementById('time_from').value * 1;
		var iMax = document.getElementById('time_to').value * 1;
		var selectAMPM_from = $('#selectAMPM_from').val();
		var selectAMPM_to = $('#selectAMPM_to').val();

		var iVersion = aData[iColumn] == "-" ? 0 : aData[iColumn].substring(0, 2) * 1; // get hour only
		var entryAMPM = aData[iColumn] == "AM" ? "PM" : aData[iColumn].substring(6, 8); // AMPM only
		
		//convert into 24 hours
		if(selectAMPM_from == "PM")
			iMin += 12;
		if(selectAMPM_to == "PM")
			iMax += 12;
		if(entryAMPM == "PM")
			iVersion += 12;
			
		if (iMin == "" && iMax == "") {
			return true;
		} else if (iMin == "" && iVersion <= iMax) {
			return true;
		} else if (iMin <= iVersion && "" == iMax) {
			return true;
		} else if (iMin <= iVersion && iVersion <= iMax) {
			return true;
		} 
		
		return false;
	});
	
	//duration filter
	$.fn.dataTableExt.afnFiltering.push(function(oSettings, aData, iDataIndex) {
		var iColumn = 4;
		var iMin = document.getElementById('duration_min').value * 1;	
		var iMax = document.getElementById('duration_max').value * 1;	

		var iVersion = aData[iColumn] == "-" ? 0 : aData[iColumn] * 1;
		if (iMin == "" && iMax == "") {
			return true;
		} else if (iMin == "" && iVersion <= iMax) {
			return true;
		} else if (iMin <= iVersion && "" == iMax) {
			return true;
		} else if (iMin <= iVersion && iVersion <= iMax) {
			return true;
		}
		return false;
	});
	
	//redraw table
	//$("#collapseTable").collapse("hide");
	var oTable = $('#tablelistuser').dataTable();
	oTable.fnDraw();
	
	//$("#collapseTable").collapse("show");
	// /* Example initialisation */
	// $(document).ready(function() {
		// /* Initialise datatables */
		// var oTable = $('#example').dataTable();
// 
		// /* Add event listeners to the two range filtering inputs */
		// $('#time_from').click(function() {
			// $('#time_from').change(function() {
				// oTable.fnDraw();
			// });
		// });
// 
		// $('#time_to').click(function() {
			// $('#time_to').change(function() {
				// oTable.fnDraw();
			// });
		// });
// 		
		// $('#duration_min').click(function() {
			// $('#duration_min').change(function() {
				// oTable.fnDraw();
			// });
		// });
		// $('#duration_max').click(function() {
			// $('#duration_max').change(function() {
				// oTable.fnDraw();
			// });
		// });
	// });

}

function fnCreateDateRangeInput() {

	$.fn.dataTableExt.afnFiltering.push(function(oSettings, aData, iDataIndex) {
		var iFini = document.getElementById('date_from').value;
		var iFfin = document.getElementById('date_to').value;
		// var iFini  = new Date(datefrom[2]+"-"+datefrom[1]+"-"+datefrom[0]);
		// var iFfin  = new Date(dateto[2]+"-"+dateto[1]+"-"+dateto[0]);

		var iStartDateCol = 2;
		var iEndDateCol = 2;

		iFini = iFini.substring(6, 10) + iFini.substring(3, 5) + iFini.substring(0, 2)
		iFfin = iFfin.substring(6, 10) + iFfin.substring(3, 5) + iFfin.substring(0, 2)

		var datofini = aData[iStartDateCol].substring(6, 10) + aData[iStartDateCol].substring(3, 5) + aData[iStartDateCol].substring(0, 2);
		var datoffin = aData[iEndDateCol].substring(6, 10) + aData[iEndDateCol].substring(3, 5) + aData[iEndDateCol].substring(0, 2);

		if (iFini == "" && iFfin == "") {
			return true;
		} else if (iFini <= datofini && iFfin == "") {
			return true;
		} else if (iFfin >= datoffin && iFini == "") {
			return true;
		} else if (iFini <= datofini && iFfin >= datoffin) {
			return true;
		}
		return false;
	});
	
	//redraw table
	// $("#collapseTable").collapse("hide");
	// var oTable = $('#example').dataTable();
	// oTable.fnDraw();
	// $("#collapseTable").collapse("show");
	// $(document).ready(function() {
		// /* Initialise datatables */
		// var oTable = $('#example').dataTable();
// 
		// /* Add event listeners to the two range filtering inputs */
		// //fnCreateDateRangeInput();
// 
		// $('#date_from').datepicker().on('changeDate', function(ev) {
			// oTable.fnDraw();
		// });
// 
		// $('#date_to').datepicker().on('changeDate', function(ev) {
			// oTable.fnDraw();
		// });
	// });

}
