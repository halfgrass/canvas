document.body.innerHTML="";
var canvas = document.createElement("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
canvas.id = "canvas";
document.body.appendChild(canvas);

!(function(id){
	var canvas = document.getElementById(id);
	var width = canvas.width;
	var height = canvas.height;
	var ctx = canvas.getContext("2d");
	ctx.globalAlpha = 0.05;
	ctx.strokeStyle = "#000";
	ctx.fillStyle = "#000";
	var data = [];
	var x0, y0;
	
	for(var i=0;i<60;i++){
		add();
	}
	
	function clear(){
		ctx.save();
		ctx.clearRect(0,0,width,height);
		ctx.restore();
	}

	function add(){
		var x = Math.random()*width;
		var y = Math.random()*height;
		var s = Math.random()*5;
		var d = Math.random()*360;
		data.push({x:x,y:y,s:s,d:d,l:0});
	}
	function line(x1,y1,x2,y2){
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.closePath();
		ctx.stroke();
	}

	function draw(){
		for(var i=0;i<data.length;i++){
			var oi = data[i];
			ctx.save();
			ctx.translate(0.5,0.5);
			ctx.beginPath();
			ctx.arc(oi.x, oi.y, 10 , 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			
			for(var j=0;j<i-1;j++){
				var oj = data[j];
				var r = Math.sqrt((oi.x-oj.x)*(oi.x-oj.x)+(oi.y-oj.y)*(oi.y-oj.y));
				if(r<80){
					line(oi.x,oi.y,oj.x,oj.y);
				}
			}
			ctx.restore();
		}
	}

	function change(){
		for(var i=0;i<data.length;i++){
			var lx = data[i].x+1*Math.cos(data[i].d);
			var ly = data[i].y+1*Math.sin(data[i].d);
			
			data[i].x = lx<0?width:(lx>width?0:lx);
			data[i].y = ly<0?height:(ly>height?0:ly);
		}
	}
	
	timer = setInterval(function(){
		clear();
		draw();
		change();
	},1000/30);
})('canvas');
