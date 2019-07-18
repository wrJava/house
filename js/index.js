
		var i=0;
		var LIWIDTH=2000;
		var DURATION=500;
		var LICOUNT=2;
		var ulImgs=document.getElementById("ul-imgs");
		
		
		function moveTo(to){
		  if(to==undefined){
			to=i+1;
		  }
		  if(i==0){
			if(to>i){
			  ulImgs.className="transition";
			}else{
			  ulImgs.className="";
			  ulImgs.style.marginLeft=-LIWIDTH*LICOUNT+"px";
			  setTimeout(function(){
				moveTo(LICOUNT-1);
			  },100);
			  return;
			}
		  }
		  i=to;
		  ulImgs.style.marginLeft=-i*LIWIDTH+"px";
		 
		 // console.log(i);
		  if(i==LICOUNT){
			i=0;
			setTimeout(function(){
			  ulImgs.className="";
			  ulImgs.style.marginLeft=0;
			},DURATION)
		  }
		 
		}
		
		
		var btnLeft=document.getElementById("btn-left");
		var btnRight=document.getElementById("btn-right");
		var canClick=true;
		btnRight.onclick=function(){
		  move(1)
		}
		function move(n){
		  if(canClick){
			console.log(i+n);
			moveTo(i+n);
			canClick=false;
			setTimeout(function(){
			  canClick=true;
			},DURATION+100);
		  }
		}
		btnLeft.onclick=function(){
		  move(-1);
		}
		
		
		var interval=3000;
		var timer=setInterval(function(){
		  moveTo()
		},3000);
		var banner=document.getElementById("banner");
		banner.onmouseover=function(){
		  clearInterval(timer);
		}
		banner.onmouseout=function(){
		  timer=setInterval(function(){
			moveTo()
		  },3000);
		}
