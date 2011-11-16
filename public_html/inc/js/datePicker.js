/*
 * Date prototype extensions. Copyright (c) 2006 Jörn Zaefferer and Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 * Dual licensed under the MIT and GPL licenses
 */

Date.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
Date.abbrDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
Date.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
Date.abbrMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
Date.firstDayOfWeek = 1;
Date.format = 'dd/mm/yyyy';
//Date.format = 'mm/dd/yyyy';
//Date.format = 'yyyy-mm-dd';
//Date.format = 'dd mmm yy';

Date.fullYearStart = '20';

(function() {
		  
	function add(name, method) {
		if( !Date.prototype[name] ) {
			Date.prototype[name] = method;
		}
	};
	
	add("isLeapYear", function() {
		var y = this.getFullYear();
		return (y%4==0 && y%100!=0) || y%400==0;
	});
	
	add("isWeekend", function() {
		return this.getDay()==0 || this.getDay()==6;
	});
	
	add("isWeekDay", function() {
		return !this.isWeekend();
	});
	
	add("getDaysInMonth", function() {
		return [31,(this.isLeapYear() ? 29:28),31,30,31,30,31,31,30,31,30,31][this.getMonth()];
	});
	
	add("getDayName", function(abbreviated) {
		return abbreviated ? Date.abbrDayNames[this.getDay()] : Date.dayNames[this.getDay()];
	});

	add("getMonthName", function(abbreviated) {
		return abbreviated ? Date.abbrMonthNames[this.getMonth()] : Date.monthNames[this.getMonth()];
	});

	add("getDayOfYear", function() {
		var tmpdtm = new Date("1/1/" + this.getFullYear());
		return Math.floor((this.getTime() - tmpdtm.getTime()) / 86400000);
	});
	
	add("getWeekOfYear", function() {
		return Math.ceil(this.getDayOfYear() / 7);
	});

	add("setDayOfYear", function(day) {
		this.setMonth(0);
		this.setDate(day);
		return this;
	});
	
	add("addYears", function(num) {
		this.setFullYear(this.getFullYear() + num);
		return this;
	});
	
	add("addMonths", function(num) {
		var tmpdtm = this.getDate();
		
		this.setMonth(this.getMonth() + num);
		
		if (tmpdtm > this.getDate())
			this.addDays(-this.getDate());
		
		return this;
	});
	
	add("addDays", function(num) {
		//this.setDate(this.getDate() + num);
		this.setTime(this.getTime() + (num*86400000) );
		return this;
	});
	
	add("addHours", function(num) {
		this.setHours(this.getHours() + num);
		return this;
	});

	add("addMinutes", function(num) {
		this.setMinutes(this.getMinutes() + num);
		return this;
	});
	
	add("addSeconds", function(num) {
		this.setSeconds(this.getSeconds() + num);
		return this;
	});
	
	add("zeroTime", function() {
		this.setMilliseconds(0);
		this.setSeconds(0);
		this.setMinutes(0);
		this.setHours(0);
		return this;
	});
	add("asString", function(format) {
		var r = format || Date.format;
		if (r.split('mm').length>1) { // ugly workaround to make sure we don't replace the m's in e.g. noveMber
			r = r.split('mmmm').join(this.getMonthName(false))
				.split('mmm').join(this.getMonthName(true))
				.split('mm').join(_zeroPad(this.getMonth()+1))
		} else {
			r = r.split('m').join(this.getMonth()+1);
		}
		r = r.split('yyyy').join(this.getFullYear())
			.split('yy').join((this.getFullYear() + '').substring(2))
			.split('dd').join(_zeroPad(this.getDate()))
			.split('d').join(this.getDate());
		return r;
	});
	
	Date.fromString = function(s)
	{
		var f = Date.format;
		var d = new Date('01/01/1970');
		
		if (s == '') return d;
		
		s = s.toLowerCase();
		var matcher = '';
		var order = [];
		var r = /(dd?d?|mm?m?|yy?yy?)+([^(m|d|y)])?/g;
		var results;
		while ((results = r.exec(f)) != null)
		{
			switch (results[1]) {
				case 'd':
				case 'dd':
				case 'm':
				case 'mm':
				case 'yy':
				case 'yyyy':
					matcher += '(\\d+\\d?\\d?\\d?)+';
					order.push(results[1].substr(0, 1));
					break;
				case 'mmm':
					matcher += '([a-z]{3})';
					order.push('M');
					break;
			}
			if (results[2]) {
				matcher += results[2];
			}
			
		}
		var dm = new RegExp(matcher);
		var result = s.match(dm);
		
		for (var i=0; i<order.length; i++) {
			
			var res = result[i+1];
			switch(order[i]) {
				case 'd':
					d.setDate(res);
					break;
				case 'm':
					d.setMonth(Number(res)-1);
					break;
				case 'M':
					for (var j=0; j<Date.abbrMonthNames.length; j++) {
						if (Date.abbrMonthNames[j].toLowerCase() == res) break;
					}
					d.setMonth(j);
					break;
				case 'y':
					d.setYear(res);
					break;
			}
		}

		return d;
	};
	
	// utility method
	var _zeroPad = function(num) {
		var s = '0'+num;
		return s.substring(s.length-2)
		//return ('0'+num).substring(-2); // doesn't work on IE :(
	};
	
})(); /*
 * Date prototype extensions - END */
 
 /**
 * Copyright (c) 2008 Kelvin Luck (http://www.kelvinluck.com/)
 * Dual licensed under the MIT and GPL
 **/

(function(D){D.fn.extend({renderCalendar:function(P){var X=function(Y){return document.createElement(Y)};P=D.extend({},D.fn.datePicker.defaults,P);if(P.showHeader!=D.dpConst.SHOW_HEADER_NONE){var M=D(X("tr"));for(var S=Date.firstDayOfWeek;S<Date.firstDayOfWeek+7;S++){var H=S%7;var R=Date.dayNames[H];M.append(jQuery(X("th")).attr({scope:"col",abbr:R,title:R,"class":(H==0||H==6?"weekend":"weekday")}).html(P.showHeader==D.dpConst.SHOW_HEADER_SHORT?R.substr(0,1):R))}}var E=D(X("table")).attr({cellspacing:2,className:"jCalendar"}).append((P.showHeader!=D.dpConst.SHOW_HEADER_NONE?D(X("thead")).append(M):X("thead")));var F=D(X("tbody"));var U=(new Date()).zeroTime();var W=P.month==undefined?U.getMonth():P.month;var N=P.year||U.getFullYear();var K=new Date(N,W,1);var J=Date.firstDayOfWeek-K.getDay()+1;if(J>1){J-=7}var O=Math.ceil(((-1*J+1)+K.getDaysInMonth())/7);K.addDays(J-1);var V=function(){if(P.hoverClass){D(this).addClass(P.hoverClass)}};var G=function(){if(P.hoverClass){D(this).removeClass(P.hoverClass)}};var L=0;while(L++<O){var Q=jQuery(X("tr"));for(var S=0;S<7;S++){var I=K.getMonth()==W;var T=D(X("td")).text(K.getDate()+"").attr("className",(I?"current-month ":"other-month ")+(K.isWeekend()?"weekend ":"weekday ")+(I&&K.getTime()==U.getTime()?"today ":"")).hover(V,G);if(P.renderCallback){P.renderCallback(T,K,W,N)}Q.append(T);K.addDays(1)}F.append(Q)}E.append(F);return this.each(function(){D(this).empty().append(E)})},datePicker:function(E){if(!D.event._dpCache){D.event._dpCache=[]}E=D.extend({},D.fn.datePicker.defaults,E);return this.each(function(){var G=D(this);var I=true;if(!this._dpId){this._dpId=D.event.guid++;D.event._dpCache[this._dpId]=new A(this);I=false}if(E.inline){E.createButton=false;E.displayClose=false;E.closeOnSelect=false;G.empty()}var F=D.event._dpCache[this._dpId];F.init(E);if(!I&&E.createButton){F.button=D('<a href="#" class="dp-choose-date" title="'+D.dpText.TEXT_CHOOSE_DATE+'">'+D.dpText.TEXT_CHOOSE_DATE+"</a>").bind("click",function(){G.dpDisplay(this);this.blur();return false});G.after(F.button)}if(!I&&G.is(":text")){G.bind("dateSelected",function(K,J,L){this.value=J.asString()}).bind("change",function(){if(this.value!=""){var J=Date.fromString(this.value);if(J){F.setSelected(J,true,true)}}});if(E.clickInput){G.bind("click",function(){G.dpDisplay()})}var H=Date.fromString(this.value);if(this.value!=""&&H){F.setSelected(H,true,true)}}G.addClass("dp-applied")})},dpSetDisabled:function(E){return B.call(this,"setDisabled",E)},dpSetStartDate:function(E){return B.call(this,"setStartDate",E)},dpSetEndDate:function(E){return B.call(this,"setEndDate",E)},dpGetSelected:function(){var E=C(this[0]);if(E){return E.getSelected()}return null},dpSetSelected:function(G,F,E){if(F==undefined){F=true}if(E==undefined){E=true}return B.call(this,"setSelected",Date.fromString(G),F,E,true)},dpSetDisplayedMonth:function(E,F){return B.call(this,"setDisplayedMonth",Number(E),Number(F),true)},dpDisplay:function(E){return B.call(this,"display",E)},dpSetRenderCallback:function(E){return B.call(this,"setRenderCallback",E)},dpSetPosition:function(E,F){return B.call(this,"setPosition",E,F)},dpSetOffset:function(E,F){return B.call(this,"setOffset",E,F)},dpClose:function(){return B.call(this,"_closeCalendar",false,this[0])},_dpDestroy:function(){}});var B=function(G,F,E,I,H){return this.each(function(){var J=C(this);if(J){J[G](F,E,I,H)}})};function A(E){this.ele=E;this.displayedMonth=null;this.displayedYear=null;this.startDate=null;this.endDate=null;this.showYearNavigation=null;this.closeOnSelect=null;this.displayClose=null;this.selectMultiple=null;this.verticalPosition=null;this.horizontalPosition=null;this.verticalOffset=null;this.horizontalOffset=null;this.button=null;this.renderCallback=[];this.selectedDates={};this.inline=null;this.context="#dp-popup"}D.extend(A.prototype,{init:function(E){this.setStartDate(E.startDate);this.setEndDate(E.endDate);this.setDisplayedMonth(Number(E.month),Number(E.year));this.setRenderCallback(E.renderCallback);this.showYearNavigation=E.showYearNavigation;this.closeOnSelect=E.closeOnSelect;this.displayClose=E.displayClose;this.selectMultiple=E.selectMultiple;this.verticalPosition=E.verticalPosition;this.horizontalPosition=E.horizontalPosition;this.hoverClass=E.hoverClass;this.setOffset(E.verticalOffset,E.horizontalOffset);this.inline=E.inline;if(this.inline){this.context=this.ele;this.display()}},setStartDate:function(E){if(E){this.startDate=Date.fromString(E)}if(!this.startDate){this.startDate=(new Date()).zeroTime()}this.setDisplayedMonth(this.displayedMonth,this.displayedYear)},setEndDate:function(E){if(E){this.endDate=Date.fromString(E)}if(!this.endDate){this.endDate=(new Date("12/31/2999"))}if(this.endDate.getTime()<this.startDate.getTime()){this.endDate=this.startDate}this.setDisplayedMonth(this.displayedMonth,this.displayedYear)},setPosition:function(E,F){this.verticalPosition=E;this.horizontalPosition=F},setOffset:function(E,F){this.verticalOffset=parseInt(E)||0;this.horizontalOffset=parseInt(F)||0},setDisabled:function(E){$e=D(this.ele);$e[E?"addClass":"removeClass"]("dp-disabled");if(this.button){$but=D(this.button);$but[E?"addClass":"removeClass"]("dp-disabled");$but.attr("title",E?"":D.dpText.TEXT_CHOOSE_DATE)}if($e.is(":text")){$e.attr("disabled",E?"disabled":"")}},setDisplayedMonth:function(E,L,I){if(this.startDate==undefined||this.endDate==undefined){return}var H=new Date(this.startDate.getTime());H.setDate(1);var K=new Date(this.endDate.getTime());K.setDate(1);var G;if((!E&&!L)||(isNaN(E)&&isNaN(L))){G=new Date().zeroTime();G.setDate(1)}else{if(isNaN(E)){G=new Date(L,this.displayedMonth,1)}else{if(isNaN(L)){G=new Date(this.displayedYear,E,1)}else{G=new Date(L,E,1)}}}if(G.getTime()<H.getTime()){G=H}else{if(G.getTime()>K.getTime()){G=K}}var F=this.displayedMonth;var J=this.displayedYear;this.displayedMonth=G.getMonth();this.displayedYear=G.getFullYear();if(I&&(this.displayedMonth!=F||this.displayedYear!=J)){this._rerenderCalendar();D(this.ele).trigger("dpMonthChanged",[this.displayedMonth,this.displayedYear])}},setSelected:function(K,E,F,H){if(E==this.isSelected(K)){return}if(this.selectMultiple==false){this.selectedDates={};D("td.selected",this.context).removeClass("selected")}if(F&&this.displayedMonth!=K.getMonth()){this.setDisplayedMonth(K.getMonth(),K.getFullYear(),true)}this.selectedDates[K.toString()]=E;var I="td.";I+=K.getMonth()==this.displayedMonth?"current-month":"other-month";I+=':contains("'+K.getDate()+'")';var J;D(I,this.ele).each(function(){if(D(this).text()==K.getDate()){J=D(this);J[E?"addClass":"removeClass"]("selected")}});if(H){var G=this.isSelected(K);$e=D(this.ele);$e.trigger("dateSelected",[K,J,G]);$e.trigger("change")}},isSelected:function(E){return this.selectedDates[E.toString()]},getSelected:function(){var E=[];for(s in this.selectedDates){if(this.selectedDates[s]==true){E.push(Date.parse(s))}}return E},display:function(E){if(D(this.ele).is(".dp-disabled")){return}E=E||this.ele;var L=this;var H=D(E);var K=H.offset();var M;var N;var G;var I;if(L.inline){M=D(this.ele);N={id:"calendar-"+this.ele._dpId,className:"dp-popup dp-popup-inline"};I={}}else{M=D("body");N={id:"dp-popup",className:"dp-popup"};I={top:K.top+L.verticalOffset,left:K.left+L.horizontalOffset};var J=function(Q){var O=Q.target;var P=D("#dp-popup")[0];while(true){if(O==P){return true}else{if(O==document){L._closeCalendar();return false}else{O=D(O).parent()[0]}}}};this._checkMouse=J;this._closeCalendar(true)}M.append(D("<div></div>").attr(N).css(I).append(D("<h2></h2>"),D('<div class="dp-nav-prev"></div>').append(D('<a class="dp-nav-prev-year" href="#" title="'+D.dpText.TEXT_PREV_YEAR+'">&lt;&lt;</a>').bind("click",function(){return L._displayNewMonth.call(L,this,0,-1)}),D('<a class="dp-nav-prev-month" href="#" title="'+D.dpText.TEXT_PREV_MONTH+'">&lt;</a>').bind("click",function(){return L._displayNewMonth.call(L,this,-1,0)})),D('<div class="dp-nav-next"></div>').append(D('<a class="dp-nav-next-year" href="#" title="'+D.dpText.TEXT_NEXT_YEAR+'">&gt;&gt;</a>').bind("click",function(){return L._displayNewMonth.call(L,this,0,1)}),D('<a class="dp-nav-next-month" href="#" title="'+D.dpText.TEXT_NEXT_MONTH+'">&gt;</a>').bind("click",function(){return L._displayNewMonth.call(L,this,1,0)})),D("<div></div>").attr("className","dp-calendar")).bgIframe());var F=this.inline?D(".dp-popup",this.context):D("#dp-popup");if(this.showYearNavigation==false){D(".dp-nav-prev-year, .dp-nav-next-year",L.context).css("display","none")}if(this.displayClose){F.append(D('<a href="#" id="dp-close">'+D.dpText.TEXT_CLOSE+"</a>").bind("click",function(){L._closeCalendar();return false}))}L._renderCalendar();D(this.ele).trigger("dpDisplayed",F);if(!L.inline){if(this.verticalPosition==D.dpConst.POS_BOTTOM){F.css("top",K.top+H.height()-F.height()+L.verticalOffset)}if(this.horizontalPosition==D.dpConst.POS_RIGHT){F.css("left",K.left+H.width()-F.width()+L.horizontalOffset)}D(document).bind("mousedown",this._checkMouse)}},setRenderCallback:function(E){if(E==null){return}if(E&&typeof(E)=="function"){E=[E]}this.renderCallback=this.renderCallback.concat(E)},cellRender:function(J,E,H,G){var K=this.dpController;var I=new Date(E.getTime());J.bind("click",function(){var L=D(this);if(!L.is(".disabled")){K.setSelected(I,!L.is(".selected")||!K.selectMultiple,false,true);if(K.closeOnSelect){K._closeCalendar()}}});if(K.isSelected(I)){J.addClass("selected")}for(var F=0;F<K.renderCallback.length;F++){K.renderCallback[F].apply(this,arguments)}},_displayNewMonth:function(F,E,G){if(!D(F).is(".disabled")){this.setDisplayedMonth(this.displayedMonth+E,this.displayedYear+G,true)}F.blur();return false},_rerenderCalendar:function(){this._clearCalendar();this._renderCalendar()},_renderCalendar:function(){D("h2",this.context).html(Date.monthNames[this.displayedMonth]+" "+this.displayedYear);D(".dp-calendar",this.context).renderCalendar({month:this.displayedMonth,year:this.displayedYear,renderCallback:this.cellRender,dpController:this,hoverClass:this.hoverClass});if(this.displayedYear==this.startDate.getFullYear()&&this.displayedMonth==this.startDate.getMonth()){D(".dp-nav-prev-year",this.context).addClass("disabled");D(".dp-nav-prev-month",this.context).addClass("disabled");D(".dp-calendar td.other-month",this.context).each(function(){var H=D(this);if(Number(H.text())>20){H.addClass("disabled")}});var G=this.startDate.getDate();D(".dp-calendar td.current-month",this.context).each(function(){var H=D(this);if(Number(H.text())<G){H.addClass("disabled")}})}else{D(".dp-nav-prev-year",this.context).removeClass("disabled");D(".dp-nav-prev-month",this.context).removeClass("disabled");var G=this.startDate.getDate();if(G>20){var F=new Date(this.startDate.getTime());F.addMonths(1);if(this.displayedYear==F.getFullYear()&&this.displayedMonth==F.getMonth()){D("dp-calendar td.other-month",this.context).each(function(){var H=D(this);if(Number(H.text())<G){H.addClass("disabled")}})}}}if(this.displayedYear==this.endDate.getFullYear()&&this.displayedMonth==this.endDate.getMonth()){D(".dp-nav-next-year",this.context).addClass("disabled");D(".dp-nav-next-month",this.context).addClass("disabled");D(".dp-calendar td.other-month",this.context).each(function(){var H=D(this);if(Number(H.text())<14){H.addClass("disabled")}});var G=this.endDate.getDate();D(".dp-calendar td.current-month",this.context).each(function(){var H=D(this);if(Number(H.text())>G){H.addClass("disabled")}})}else{D(".dp-nav-next-year",this.context).removeClass("disabled");D(".dp-nav-next-month",this.context).removeClass("disabled");var G=this.endDate.getDate();if(G<13){var E=new Date(this.endDate.getTime());E.addMonths(-1);if(this.displayedYear==E.getFullYear()&&this.displayedMonth==E.getMonth()){D(".dp-calendar td.other-month",this.context).each(function(){var H=D(this);if(Number(H.text())>G){H.addClass("disabled")}})}}}},_closeCalendar:function(E,F){if(!F||F==this.ele){D(document).unbind("mousedown",this._checkMouse);this._clearCalendar();D("#dp-popup a").unbind();D("#dp-popup").empty().remove();if(!E){D(this.ele).trigger("dpClosed",[this.getSelected()])}}},_clearCalendar:function(){D(".dp-calendar td",this.context).unbind();D(".dp-calendar",this.context).empty()}});D.dpConst={SHOW_HEADER_NONE:0,SHOW_HEADER_SHORT:1,SHOW_HEADER_LONG:2,POS_TOP:0,POS_BOTTOM:1,POS_LEFT:0,POS_RIGHT:1};D.dpText={TEXT_PREV_YEAR:"Previous year",TEXT_PREV_MONTH:"Previous month",TEXT_NEXT_YEAR:"Next year",TEXT_NEXT_MONTH:"Next month",TEXT_CLOSE:"Close",TEXT_CHOOSE_DATE:"Choose date"};D.dpVersion="$Id: jquery.datePicker.js 15 2008-12-17 04:40:18Z kelvin.luck $";D.fn.datePicker.defaults={month:undefined,year:undefined,showHeader:D.dpConst.SHOW_HEADER_SHORT,startDate:undefined,endDate:undefined,inline:false,renderCallback:null,createButton:true,showYearNavigation:true,closeOnSelect:true,displayClose:false,selectMultiple:false,clickInput:false,verticalPosition:D.dpConst.POS_TOP,horizontalPosition:D.dpConst.POS_LEFT,verticalOffset:0,horizontalOffset:0,hoverClass:"dp-hover"};function C(E){if(E._dpId){return D.event._dpCache[E._dpId]}return false}if(D.fn.bgIframe==undefined){D.fn.bgIframe=function(){return this}}D(window).bind("unload",function(){var F=D.event._dpCache||[];for(var E in F){D(F[E].ele)._dpDestroy()}})})(jQuery);

// now, function which will add date picker to SELECT form.
function optionDatePicker(idname){
		
					//jQuery(".datePickerDay").val("7");//attr('selected', 'selected');
					//return;
					
		jQuery(idname)
					.datePicker({startDate:'01/01/1996'})
					.bind('click',function(){updateSelects(jQuery(this).dpGetSelected()[0]);jQuery(this).dpDisplay();return false;})
					.bind('dateSelected',function(e, selectedDate, $td, state){updateSelects(selectedDate);})
					.bind('dpClosed',function(e, selected){updateSelects(selected[0]);});
					
				var updateSelects = function (selectedDate)
				{
					
					var selectedDate = new Date(selectedDate);
						
					jQuery(idname+' .datePickerDay').val(selectedDate.getDate());// option[value=' + selectedDate.getDate() + ']').attr('selected', 'selected');
					jQuery(idname+' .datePickerMonth').val(selectedDate.getMonth()+1);
					jQuery(idname+' .datePickerYear').val(selectedDate.getFullYear());
					//jQuery(idname+' .datePickerMonth option[value=' + (selectedDate.getMonth()+1) + ']').attr('selected', 'selected');
					//jQuery(idname+' .datePickerYear option[value=' + (selectedDate.getFullYear()) + ']').attr('selected', 'selected');
				}
				
				jQuery(idname+' .datePickerDay, '+idname+' .datePickerMonth, '+idname+' .datePickerYear')
					.bind(
						'change',
						function()
						{
							var d = new Date(
										jQuery(idname+' .datePickerYear').val(),
										jQuery(idname+' .datePickerMonth').val()-1,
										jQuery(idname+' .datePickerDay').val()
									);
							jQuery(idname).dpSetSelected(d.asString());
						}
					);
				
				var today = new Date();
				updateSelects(today.getTime());
				
				jQuery(idname+' .datePickerDay').trigger('change');
				
}