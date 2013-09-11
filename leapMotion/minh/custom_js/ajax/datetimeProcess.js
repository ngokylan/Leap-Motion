var montharray=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")

function countdown(tag, d,m,yr,h,min,s, control, duration)
{
	/*
	Count down until any date script-
	By JavaScript Kit (www.javascriptkit.com)
	Over 200+ free scripts here!
	*/

	//change the text below to reflect your own,
	var before="New"
	var current="On going"
	var after="Expired"
	
	theyear=yr;
	themonth=m;
	theday=d;
	thehour=h;
	theminute=min;
	thesecond=s;
	tagname = tag;
	ctr = control;
	dur = duration;
	
	var today=new Date()
	var todayy=today.getYear()
	if (todayy < 1000)
		todayy+=1900
	var todaym=today.getMonth()
	var todayd=today.getDate()
	var todayh=today.getHours()
	var todaymin=today.getMinutes()
	var todaysec=today.getSeconds()
	var todaystring=montharray[todaym]+" "+todayd+", "+todayy+" "+todayh+":"+todaymin+":"+todaysec
	futurestring=montharray[m-1]+" "+d+", "+yr + " "+h+":"+min+":"+s;
	dd=Date.parse(futurestring)-Date.parse(todaystring)
	dday=Math.floor(dd/(60*60*1000*24)*1)
	dhour=Math.floor((dd%(60*60*1000*24))/(60*60*1000)*1)
	dmin=Math.floor(((dd%(60*60*1000*24))%(60*60*1000))/(60*1000)*1)
	dsec=Math.floor((((dd%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1)
	
	
	divid = document.getElementById(tagname)
	
	if(divid == null)
	{
		divid = tagname;		
	}	
		
	if(dday==0&&dhour==0&&dmin==0&&dsec==1)
	{
		currentid = $(divid).attr("id");
		currentid = currentid.replace("countdown_conference","");
				
		if(ctr==1)
		{			
			//call function from custom_js/jquery.transition/transition.js
			setActivityStatus(currentid, "Commencing");
			
			futurestring = new Date(yr, m, d, h, min, s, 0);
			futurestring.setMinutes(futurestring.getMinutes() + dur);
			
			//alert(futurestring);
			
			//alert(futurestring.getMinutes() + dur);
			
			theyear=futurestring.getFullYear();
			themonth=futurestring.getMonth();
			theday=futurestring.getDate();
			thehour=futurestring.getHours();
			theminute=futurestring.getMinutes();
			thesecond=futurestring.getSeconds();
			//alert(theday+","+themonth+","+theyear+","+thehour+","+theminute+","+thesecond+","+ control+","+dur);
					
			ctr = 0;
			
			setTimeout("countdown('"+tagname+"',"+theday+","+themonth+","+theyear+","+thehour+","+theminute+","+thesecond+","+ ctr+","+dur+")",1000)
		}
		else
		{
			divid.innerHTML = "";
			//call function from custom_js/jquery.transition/transition.js
			setActivityStatus(currentid, "expired");
		}	
	}
	else
	{
		if(ctr == 1)
		{
			if(dday != 0 && dhour != 0 && dmin != 0 && dsec != 0)
				divid.innerHTML= "<strong>Time left: </strong>" + dday+ " days, "+dhour+" hours, "+dmin+" minutes, and "+dsec+" seconds left until conference start"
			else if(dday == 0 && dhour == 0 && dmin == 0)
				divid.innerHTML="<strong>Time left: </strong>" + dsec+" seconds left until conference start"
			else if(dday == 0 && dhour == 0)
				divid.innerHTML="<strong>Time left: </strong>" + dmin+" minutes, and "+dsec+" seconds left until conference start"
			else if(dday == 0)
				divid.innerHTML="<strong>Time left: </strong>" + dhour+" hours, "+dmin+" minutes, and "+dsec+" seconds left until conference start"
			else if(dday < 0 && dhour <  0 && dmin <  0 && dsec <  0)
				divid.innerHTML="";
		}
		else if(ctr == 0)
		{
			if(dday != 0 && dhour != 0 && dmin != 0 && dsec != 0)
				divid.innerHTML= "<strong>Time left: </strong>" + dday+ " days, "+dhour+" hours, "+dmin+" minutes, and "+dsec+" seconds left until conference finish"
			else if(dday == 0 && dhour == 0 && dmin == 0)
				divid.innerHTML="<strong>Time left: </strong>" + dsec+" seconds left until conference finish"
			else if(dday == 0 && dhour == 0)
				divid.innerHTML="<strong>Time left: </strong>" + dmin+" minutes, and "+dsec+" seconds left until conference finish"
			else if(dday == 0)
				divid.innerHTML="<strong>Time left: </strong>" + dhour+" hours, "+dmin+" minutes, and "+dsec+" seconds left until conference finish"
			else if(dday < 0 && dhour <  0 && dmin <  0 && dsec <  0)
				divid.innerHTML="";
		}
		
		setTimeout("countdown('"+tagname+"',"+theday+","+themonth+","+theyear+","+thehour+","+theminute+","+thesecond+","+ ctr+","+dur+")",1000)
	}
}
	
function DisplayTime()
{
	if (!document.all && !document.getElementById)
		return
	timeElement=document.getElementById? document.getElementById("curTime"): document.all.tick2
	var CurrentDate=new Date()
	var hours=CurrentDate.getHours()
	var minutes=CurrentDate.getMinutes()
	var seconds=CurrentDate.getSeconds()
	if (minutes<=9) minutes="0"+minutes;
	if (seconds<=9) seconds="0"+seconds;
		var currentTime=hours+":"+minutes+":"+seconds;
	timeElement.innerHTML="<font style='font-size:12px;font-weight:bold;'>"+currentTime+"</b>"
	setTimeout("DisplayTime()",1000)
}	

function getCurrentDateTime()
{
	var today=new Date()
	var todayy=today.getYear()
	if (todayy < 1000)
		todayy+=1900
	var todaym=today.getMonth()
	var todayd=today.getDate()
	var todayh=today.getHours()
	var todaymin=today.getMinutes()
	var todaysec=today.getSeconds()
	var todaystring=montharray[todaym]+" "+todayd+", "+todayy+" "+todayh+":"+todaymin+":"+todaysec
			
	return todaystring;
}