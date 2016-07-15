!(function(id,data){
	var canvas = document.getElementById(id);
	var width = canvas.width;
	var height = canvas.height;
	var ctx = canvas.getContext("2d");
	ctx.strokeStyle = "#fff";
	for(var i=0;i<data.length;i++){
		data[i].ag = 0;
	}
	
	ctx.save();
	ctx.fillStyle = "#000";
	ctx.fillRect(0,0,width,height);
	ctx.fillStyle = "yellow";
	ctx.beginPath();
	ctx.arc(width/2, height/2, 10, 0, Math.PI*2, true);
	ctx.fill();
	ctx.restore();
	
	var imgdata = ctx.getImageData(0, 0, width, height);
	function draw(){
		
		ctx.putImageData(imgdata, 0, 0);
		ctx.save();
		ctx.globalAlpha = 0.2;
		ctx.beginPath();
		for(var i=0;i<data.length;i++){
			ctx.lineTo(width/2-data[i].r*Math.cos(data[i].ag*Math.PI*2/360), height/2-data[i].r*Math.sin(data[i].ag*Math.PI*2/360));
		}
		ctx.stroke();
		ctx.restore();
		imgdata = ctx.getImageData(0, 0, width, height);
		
		for(var i=0;i<data.length;i++){
			ctx.save();
			ctx.translate(width/2, height/2);
			ctx.rotate(data[i].ag * Math.PI / 180);
			ctx.fillStyle = "green";
			ctx.beginPath();
			ctx.arc(-data[i].r, 0, 10, 0, Math.PI*2, true);
			ctx.fill();
			ctx.restore();
		}
	}
	
	var runtimer = setInterval(function(){
		draw();
		for(var i=0;i<data.length;i++){
			data[i].ag += data[i].s;
		}
	},1000/60);
})('canvas',[{r:100,s:7},{r:140,s:5},{r:220,s:4},{r:280,s:5}]);
