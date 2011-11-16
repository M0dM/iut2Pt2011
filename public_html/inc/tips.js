<!-- 
/*
 Pleas leave this notice.
 DHTML tip message version 1.2 copyright Essam Gamal 2003 (http://migoicons.tripod.com, migoicons@hotmail.com)
 All modifications are done in the style.js you should not modify this file.  Created on : 06/03/2003
 Script featured on and can be found at Dynamic Drive (http://www.dynamicdrive.com)
*/ 



var ua = navigator.userAgent
var ps = navigator.productSub 
var dom = (document.getElementById)? 1:0
var ie4 = (document.all&&!dom)? 1:0
var ie5 = (document.all&&dom)? 1:0
var nn4 =(navigator.appName.toLowerCase() == "netscape" && parseInt(navigator.appVersion) == 4)
var nn6 = (dom&&!ie5)? 1:0
var sNav = (nn4||nn6||ie4||ie5)? 1:0
var cssFilters = ((ua.indexOf("MSIE 5.5")>=0||ua.indexOf("MSIE 6")>=0)&&ua.indexOf("Opera")<0)? 1:0
var Style=[],Text=[],Count=0,sbw=0,move=0,hs="",mx,my,scl,sct,ww,wh,obj,sl,st,ih,iw,vl,hl,sv,evlh,evlw,tbody
var HideTip = "eval(obj+sv+hl+';'+obj+sl+'=0;'+obj+st+'=-800')"
var doc_root = ((ie5&&ua.indexOf("Opera")<0||ie4)&&document.compatMode=="CSS1Compat")? "document.documentElement":"document.body"
var PX = (nn6)? "px" :"" 

if(sNav) {
	window.onresize = ReloadTip
	document.onmousemove = MoveTip
	if(nn4) document.captureEvents(Event.MOUSEMOVE) 
}	
if(nn4||nn6) {
	mx = "e.pageX"
	my = "e.pageY"
	scl = "window.pageXOffset"
	sct = "window.pageYOffset"	
	if(nn4) {
		obj = "document.TipLayer."
		sl = "left"
		st = "top"
		ih = "clip.height"
		iw = "clip.width"
		vl = "'show'"
		hl = "'hide'"
		sv = "visibility="
	}
	else obj = "document.getElementById('TipLayer')."
} 
if(ie4||ie5) {
	obj = "TipLayer."
	mx = "event.x"
	my = "event.y"
	scl = "eval(doc_root).scrollLeft"
	sct = "eval(doc_root).scrollTop"
	if(ie5) {
		mx = mx+"+"+scl 
		my = my+"+"+sct
	}
}
if(ie4||dom){
	sl = "style.left"
	st = "style.top"
	ih = "offsetHeight"
	iw = "offsetWidth"
	vl = "'visible'"
	hl = "'hidden'"
	sv = "style.visibility="
}
if(ie4||ie5||ps>=20020823) {
	ww = "eval(doc_root).clientWidth"
	wh = "eval(doc_root).clientHeight"
}	 
else { 
	ww = "window.innerWidth"
	wh = "window.innerHeight"
	evlh = eval(wh)
	evlw = eval(ww)
	sbw=15
}	

function applyCssFilter(){
	if(cssFilters&&FiltersEnabled) { 
		var dx = " progid:DXImageTransform.Microsoft."
		TipLayer.style.filter = "revealTrans()"+dx+"Fade(Overlap=1.00 enabled=0)"+dx+"Inset(enabled=0)"+dx+"Iris(irisstyle=PLUS,motion=in enabled=0)"+dx+"Iris(irisstyle=PLUS,motion=out enabled=0)"+dx+"Iris(irisstyle=DIAMOND,motion=in enabled=0)"+dx+"Iris(irisstyle=DIAMOND,motion=out enabled=0)"+dx+"Iris(irisstyle=CROSS,motion=in enabled=0)"+dx+"Iris(irisstyle=CROSS,motion=out enabled=0)"+dx+"Iris(irisstyle=STAR,motion=in enabled=0)"+dx+"Iris(irisstyle=STAR,motion=out enabled=0)"+dx+"RadialWipe(wipestyle=CLOCK enabled=0)"+dx+"RadialWipe(wipestyle=WEDGE enabled=0)"+dx+"RadialWipe(wipestyle=RADIAL enabled=0)"+dx+"Pixelate(MaxSquare=35,enabled=0)"+dx+"Slide(slidestyle=HIDE,Bands=25 enabled=0)"+dx+"Slide(slidestyle=PUSH,Bands=25 enabled=0)"+dx+"Slide(slidestyle=SWAP,Bands=25 enabled=0)"+dx+"Spiral(GridSizeX=16,GridSizeY=16 enabled=0)"+dx+"Stretch(stretchstyle=HIDE enabled=0)"+dx+"Stretch(stretchstyle=PUSH enabled=0)"+dx+"Stretch(stretchstyle=SPIN enabled=0)"+dx+"Wheel(spokes=16 enabled=0)"+dx+"GradientWipe(GradientSize=1.00,wipestyle=0,motion=forward enabled=0)"+dx+"GradientWipe(GradientSize=1.00,wipestyle=0,motion=reverse enabled=0)"+dx+"GradientWipe(GradientSize=1.00,wipestyle=1,motion=forward enabled=0)"+dx+"GradientWipe(GradientSize=1.00,wipestyle=1,motion=reverse enabled=0)"+dx+"Zigzag(GridSizeX=8,GridSizeY=8 enabled=0)"+dx+"Alpha(enabled=0)"+dx+"Dropshadow(OffX=3,OffY=3,Positive=true,enabled=0)"+dx+"Shadow(strength=3,direction=135,enabled=0)"
	}
}

function stm(t,s) {
  if(sNav) {
  	if(t.length<2||s.length<25) {
		var ErrorNotice = "DHTML TIP MESSAGE VERSION 1.2 ERROR NOTICE.\n"
		if(t.length<2&&s.length<25) alert(ErrorNotice+"It looks like you removed an entry or more from the Style Array and Text Array of this tip.\nTheir should be 25 entries in every Style Array even though empty and 2 in every Text Array. You defined only "+s.length+" entries in the Style Array and "+t.length+" entry in the Text Array. This tip won't be viewed to avoid errors")
		else if(t.length<2) alert(ErrorNotice+"It looks like you removed an entry or more from the Text Array of this tip.\nTheir should be 2 entries in every Text Array. You defined only "+t.length+" entry. This tip won't be viewed to avoid errors.")
		else if(s.length<25) alert(ErrorNotice+"It looks like you removed an entry or more from the Style Array of this tip.\nTheir should be 25 entries in every Style Array even though empty. You defined only "+s.length+" entries. This tip won't be viewed to avoid errors.")
 	}
  	else {
		var ab = "" ;var ap = ""
		var titCol = (s[0])? "COLOR='"+s[0]+"'" : ""
		var txtCol = (s[1])? "COLOR='"+s[1]+"'" : ""
		var titBgCol = (s[2])? "BGCOLOR='"+s[2]+"'" : ""
		var txtBgCol = (s[3])? "BGCOLOR='"+s[3]+"'" : ""
		var titBgImg = (s[4])? "BACKGROUND='"+s[4]+"'" : ""	
		var txtBgImg = (s[5])? "BACKGROUND='"+s[5]+"'" : ""
		var titTxtAli = (s[6] && s[6].toLowerCase()!="left")? "ALIGN='"+s[6]+"'" : ""
		var txtTxtAli = (s[7] && s[7].toLowerCase()!="left")? "ALIGN='"+s[7]+"'" : ""   
		var add_height = (s[15])? "HEIGHT='"+s[15]+"'" : ""
		if(!s[8])  s[8] = "Verdana,Arial,Helvetica"
		if(!s[9])  s[9] = "Verdana,Arial,Helvetica"					
		if(!s[12]) s[12] = 1
		if(!s[13]) s[13] = 1
		if(!s[14]) s[14] = 200
		if(!s[16]) s[16] = 0
		if(!s[17]) s[17] = 0
		if(!s[18]) s[18] = 10
		if(!s[19]) s[19] = 10
		hs = s[11].toLowerCase() 
		if(ps==20001108){
		if(s[2]) ab="STYLE='border:"+s[16]+"px solid"+" "+s[2]+"'"
		ap="STYLE='padding:"+s[17]+"px "+s[17]+"px "+s[17]+"px "+s[17]+"px'"}
		var closeLink=(hs=="sticky")? "<TD ALIGN='right'><FONT SIZE='"+s[12]+"' FACE='"+s[8]+"'><A HREF='javascript:void(0)' ONCLICK='stickyhide()' STYLE='text-decoration:none;color:"+s[0]+"'><B>Close</B></A></FONT></TD>":""
		var title=(t[0]||hs=="sticky")? "<TABLE WIDTH='100%' BORDER='0' CELLPADDING='0' CELLSPACING='0'><TR><TD "+titTxtAli+"><FONT SIZE='"+s[12]+"' FACE='"+s[8]+"' "+titCol+"><B>"+t[0]+"</B></FONT></TD>"+closeLink+"</TR></TABLE>" : ""
		var txt="<TABLE "+titBgImg+" "+ab+" WIDTH='"+s[14]+"' BORDER='0' CELLPADDING='"+s[16]+"' CELLSPACING='0' "+titBgCol+" ><TR><TD>"+title+"<TABLE WIDTH='100%' "+add_height+" BORDER='0' CELLPADDING='"+s[17]+"' CELLSPACING='0' "+txtBgCol+" "+txtBgImg+"><TR><TD "+txtTxtAli+" "+ap+" VALIGN='top'><FONT SIZE='"+s[13]+"' FACE='"+s[9]+"' "+txtCol +">"+t[1]+"</FONT></TD></TR></TABLE></TD></TR></TABLE>"
		if(nn4) {
			with(eval(obj+"document")) {
				open()
				write(txt)
				close()
			}
		}
		else eval(obj+"innerHTML=txt")
		tbody = {
			Pos:s[10].toLowerCase(), 
			Xpos:s[18],
			Ypos:s[19], 
			Transition:s[20],
			Duration:s[21], 
			Alpha:s[22],
			ShadowType:s[23].toLowerCase(),
			ShadowColor:s[24],
			Width:parseInt(eval(obj+iw)+3+sbw)
		}
		if(ie4) { 
			TipLayer.style.width = s[14]
	 		tbody.Width = s[14]
		}
		Count=0	
		move=1
 	 }
  }
}

function MoveTip(e) {
	if(move) {
		var X,Y,MouseX = eval(mx),MouseY = eval(my); tbody.Height = parseInt(eval(obj+ih)+3)
		tbody.wiw = parseInt(eval(ww+"+"+scl)); tbody.wih = parseInt(eval(wh+"+"+sct))
		switch(tbody.Pos) {
			case "left" : X=MouseX-tbody.Width-tbody.Xpos; Y=MouseY+tbody.Ypos; break
			case "center": X=MouseX-(tbody.Width/2); Y=MouseY+tbody.Ypos; break
			case "float": X=tbody.Xpos+eval(scl); Y=tbody.Ypos+eval(sct); break	
			case "fixed": X=tbody.Xpos; Y=tbody.Ypos; break		
			default: X=MouseX+tbody.Xpos; Y=MouseY+tbody.Ypos
		}

		if(tbody.wiw<tbody.Width+X) X = tbody.wiw-tbody.Width
		if(tbody.wih<tbody.Height+Y+sbw) {
			if(tbody.Pos=="float"||tbody.Pos=="fixed") Y = tbody.wih-tbody.Height-sbw
			else Y = MouseY-tbody.Height
		}
		if(X<0) X=0 
		eval(obj+sl+"=X+PX;"+obj+st+"=Y+PX")
		ViewTip()
	}
}

function ViewTip() {
  	Count++
	if(Count == 1) {
		if(cssFilters&&FiltersEnabled) {	
			for(Index=28; Index<31; Index++) { TipLayer.filters[Index].enabled = 0 }
			for(s=0; s<28; s++) { if(TipLayer.filters[s].status == 2) TipLayer.filters[s].stop() }
			if(tbody.Transition == 51) tbody.Transition = parseInt(Math.random()*50)
			var applyTrans = (tbody.Transition>-1&&tbody.Transition<24&&tbody.Duration>0)? 1:0
			var advFilters = (tbody.Transition>23&&tbody.Transition<51&&tbody.Duration>0)? 1:0
			var which = (applyTrans)?0:(advFilters)? tbody.Transition-23:0 
			if(tbody.Alpha>0&&tbody.Alpha<100) {
	  			TipLayer.filters[28].enabled = 1
	  			TipLayer.filters[28].opacity = tbody.Alpha
			}
			if(tbody.ShadowColor&&tbody.ShadowType == "simple") {
	  			TipLayer.filters[29].enabled = 1
	  			TipLayer.filters[29].color = tbody.ShadowColor
			}
			else if(tbody.ShadowColor&&tbody.ShadowType == "complex") {
	  			TipLayer.filters[30].enabled = 1
	  			TipLayer.filters[30].color = tbody.ShadowColor
			}
			if(applyTrans||advFilters) {
				eval(obj+sv+hl)
	  			if(applyTrans) TipLayer.filters[0].transition = tbody.Transition
	  			TipLayer.filters[which].duration = tbody.Duration 
	  			TipLayer.filters[which].apply()
			}
		}
 		eval(obj+sv+vl)
		if(cssFilters&&FiltersEnabled&&(applyTrans||advFilters)) TipLayer.filters[which].play()
		if(hs == "sticky") move=0
  	}
}

function stickyhide() {
	eval(HideTip)
}

function ReloadTip() {
	 if(nn4&&(evlw!=eval(ww)||evlh!=eval(wh))) location.reload()
	 else if(hs == "sticky") eval(HideTip)
}

function htm() {
	if(sNav) {
		if(hs!="keep") {
			move=0; 
			if(hs!="sticky") eval(HideTip)
		}	
	} 
}
var FiltersEnabled = 1 // if your not going to use transitions or filters in any of the tips set this to 0

Style[12]=["white","black","#000000","#FFFFCC","","","","","","","","","","",200,"",1,5,10,10,"","","","",""]
Style[13]=["white","black","#000000","#FFFFCC","","","","","","","","","","",200,"",1,5,10,-60,"","","","",""]
Style[14]=["white","black","#000000","#FFFFCC","","","","","","","","","","",200,"",1,5,10,60,"","","","",""]
Style[15]=["white","black","#000000","#FFFFCC","","","","","","","","","","",200,"",1,5,10,-100,"","","","",""]

applyCssFilter()

//Chrome Drop Down Menu- Author: Dynamic Drive (http://www.dynamicdrive.com)
//Last updated: June 14th, 06'
//Chrome Drop Down Menu v2.01- Author: Dynamic Drive (http://www.dynamicdrive.com)
//Last updated: November 14th 06- added iframe shim technique

var cssdropdown={
disappeardelay: 250, //set delay in miliseconds before menu disappears onmouseout
disablemenuclick: true, //when user clicks on a menu item with a drop down menu, disable menu item's link?
enableswipe: 1, //enable swipe effect? 1 for yes, 0 for no
enableiframeshim: 1, //enable "iframe shim" technique to get drop down menus to correctly appear on top of controls such as form objects in IE5.5/IE6? 1 for yes, 0 for no

//No need to edit beyond here////////////////////////
dropmenuobj: null, ie: document.all, firefox: document.getElementById&&!document.all, swipetimer: undefined, bottomclip:0,

getposOffset:function(what, offsettype){
var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
var parentEl=what.offsetParent;
while (parentEl!=null){
totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
parentEl=parentEl.offsetParent;
}
return totaloffset;
},

swipeeffect:function(){
if (this.bottomclip<parseInt(this.dropmenuobj.offsetHeight)){
this.bottomclip+=10+(this.bottomclip/10) //unclip drop down menu visibility gradually
this.dropmenuobj.style.clip="rect(0 auto "+this.bottomclip+"px 0)"
}
else
return
this.swipetimer=setTimeout("cssdropdown.swipeeffect()", 10)
},

showhide:function(obj, e){
if (this.ie || this.firefox)
this.dropmenuobj.style.left=this.dropmenuobj.style.top="-500px"
if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover"){
if (this.enableswipe==1){
if (typeof this.swipetimer!="undefined")
clearTimeout(this.swipetimer)
obj.clip="rect(0 auto 0 0)" //hide menu via clipping
this.bottomclip=0
this.swipeeffect()
}
obj.visibility="visible"
}
else if (e.type=="click")
obj.visibility="hidden"
},

iecompattest:function(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
},

clearbrowseredge:function(obj, whichedge){
var edgeoffset=0
if (whichedge=="rightedge"){
var windowedge=this.ie && !window.opera? this.iecompattest().scrollLeft+this.iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetWidth
if (windowedge-this.dropmenuobj.x < this.dropmenuobj.contentmeasure)  //move menu to the left?
edgeoffset=this.dropmenuobj.contentmeasure-obj.offsetWidth
}
else{
var topedge=this.ie && !window.opera? this.iecompattest().scrollTop : window.pageYOffset
var windowedge=this.ie && !window.opera? this.iecompattest().scrollTop+this.iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetHeight
if (windowedge-this.dropmenuobj.y < this.dropmenuobj.contentmeasure){ //move up?
edgeoffset=this.dropmenuobj.contentmeasure+obj.offsetHeight
if ((this.dropmenuobj.y-topedge)<this.dropmenuobj.contentmeasure) //up no good either?
edgeoffset=this.dropmenuobj.y+obj.offsetHeight-topedge
}
}
return edgeoffset
},

dropit:function(obj, e, dropmenuID){
if (this.dropmenuobj!=null) //hide previous menu
this.dropmenuobj.style.visibility="hidden" //hide menu
this.clearhidemenu()
if (this.ie||this.firefox){
obj.onmouseout=function(){cssdropdown.delayhidemenu()}
obj.onclick=function(){return !cssdropdown.disablemenuclick} //disable main menu item link onclick?
this.dropmenuobj=document.getElementById(dropmenuID)
this.dropmenuobj.onmouseover=function(){cssdropdown.clearhidemenu()}
this.dropmenuobj.onmouseout=function(e){cssdropdown.dynamichide(e)}
this.dropmenuobj.onclick=function(){cssdropdown.delayhidemenu()}
this.showhide(this.dropmenuobj.style, e)
this.dropmenuobj.x=this.getposOffset(obj, "left")
this.dropmenuobj.y=this.getposOffset(obj, "top")
this.dropmenuobj.style.left=this.dropmenuobj.x-12-this.clearbrowseredge(obj, "rightedge")+"px"
if(navigator.appName.indexOf('Microsoft')!=-1)
this.dropmenuobj.style.top=this.dropmenuobj.y-this.clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+1+"px"
else
this.dropmenuobj.style.top=this.dropmenuobj.y+12-this.clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+1+"px"
this.positionshim() //call iframe shim function
}
},

positionshim:function(){ //display iframe shim function
if (this.enableiframeshim && typeof this.shimobject!="undefined"){
if (this.dropmenuobj.style.visibility=="visible"){
this.shimobject.style.width=this.dropmenuobj.offsetWidth+"px"
this.shimobject.style.height=this.dropmenuobj.offsetHeight+"px"
this.shimobject.style.left=this.dropmenuobj.style.left
this.shimobject.style.top=this.dropmenuobj.style.top
}
this.shimobject.style.display=(this.dropmenuobj.style.visibility=="visible")? "block" : "none"
}
},

hideshim:function(){
if (this.enableiframeshim && typeof this.shimobject!="undefined")
this.shimobject.style.display='none'
},

contains_firefox:function(a, b) {
while (b.parentNode)
if ((b = b.parentNode) == a)
return true;
return false;
},

dynamichide:function(e){
var evtobj=window.event? window.event : e
if (this.ie&&!this.dropmenuobj.contains(evtobj.toElement))
this.delayhidemenu()
else if (this.firefox&&e.currentTarget!= evtobj.relatedTarget&& !this.contains_firefox(evtobj.currentTarget, evtobj.relatedTarget))
this.delayhidemenu()
},

delayhidemenu:function(){
this.delayhide=setTimeout("cssdropdown.dropmenuobj.style.visibility='hidden'; cssdropdown.hideshim()",this.disappeardelay) //hide menu
},

clearhidemenu:function(){
if (this.delayhide!="undefined")
clearTimeout(this.delayhide)
},

startchrome:function(){
for (var ids=0; ids<arguments.length; ids++){
var menuitems=document.getElementById(arguments[ids]).getElementsByTagName("a")
for (var i=0; i<menuitems.length; i++){
if (menuitems[i].getAttribute("rel")){
var relvalue=menuitems[i].getAttribute("rel")
menuitems[i].onmouseover=function(e){
var event=typeof e!="undefined"? e : window.event
cssdropdown.dropit(this,event,this.getAttribute("rel"))
}
}
}
}
if (window.createPopup && !window.XmlHttpRequest){ //if IE5.5 to IE6, create iframe for iframe shim technique
document.write('<IFRAME id="iframeshim"  src="" style="display: none; left: 0; top: 0; z-index: 90; position: absolute; filter: progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)" frameBorder="0" scrolling="no"></IFRAME>')
this.shimobject=document.getElementById("iframeshim") //reference iframe object
}
}

}