var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 600;
var ctx = canvas.getContext("2d");
var c = ctx;
var nodes = new Array();
for(var i=0;i<11;i++){
  nodes[i] = new Array();
}

var drawApple = function(c,x,y){
  c.save();
  c.fillStyle = "#ff8c00";
  c.beginPath();
  c.translate(x,y);
  c.arc(0,0,20,0,Math.PI*2,true);
  c.fill();
  c.restore();
}
/ drawApple(ctx,100,100);

var draw = function(ctx,startX,startY,angle,length,depth,branchWidth){
	ctx.lineCap="round";
	
	var endX,endY,
	newAngle,newLength,newDepth,
	maxBranch = 5,
	maxAngle = Math.PI/4,
	subBranches,
	rgb;
	ctx.beginPath();
	
	ctx.moveTo(startX, startY);
	endX = startX + length*Math.cos(angle);
	endY = startY + length*Math.sin(angle);
	ctx.lineTo(endX, endY);
	ctx.lineWidth = branchWidth;
	if(depth<3){
		rgb = "rgb(0,"+((Math.random()*64+128)|0)+",0)";
	branchWidth = 0.7*branchWidth;
	if(depth==0){
		rgb = "yellow";
	}
	}else{
		rgb = "rgb(0,"+((Math.random()*28+100)|0)+",0)";
		branchWidth = branchWidth*(0.7+Math.random()*0.1);
	}
	ctx.strokeStyle = rgb;
	ctx.stroke();
	nodes[depth].push({startX:startX,startY:startY,endX:endX,endY:endY,rgb:rgb});
	
	newDepth = depth - 1;
	if(newDepth<0){
	return;
	}
	subBranches = Math.random()*(maxBranch-1)+1;
	for(var i=0;i<subBranches;i++){
		newAngle = angle + Math.random() * maxAngle*2 - maxAngle;
		newLength = length*(0.7+Math.random()*0.3);
		draw(ctx, endX, endY, newAngle, newLength, newDepth, branchWidth);
	}
}
draw(ctx,400,600,-Math.PI/2,80,10,20);

var x=0;
function redraw(){
  for(var i=0;i<nodes.length;i++){
	  var ni = nodes[i];
	  for(var j=0;j<ni.length;j++){
		  console.log(x++);
	  }
  }
}
