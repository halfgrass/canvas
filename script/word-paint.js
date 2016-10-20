(function($){
	$.wp = function(args){
		var config = {
			url : args.url,
			container : args.container,
			color : args.color,
			word : args.word || '#',
			level : Math.pow(2, args.level||3),
			force : args.force,
			origin : args.origin,
			size : args.size || 2,//1.容器尺寸。2.图像尺寸,3.自定义尺寸
			width : args.width,
			height : args.height,
		};
		var canvas = document.createElement("canvas");
		var cx = canvas.getContext('2d');
		var cw, ch;
		var img = new Image();
		img.src = config.url;
		img.onload = function(){
			cw = img.width;
			ch = img.height;
			canvas.width = cw;
			canvas.height = ch;
			cx.drawImage(img, 0, 0, canvas.width, canvas.height);
			
			var imgData = cx.getImageData(0, 0, canvas.width, canvas.height);
			var pix = imgData.data;
			var html = '';
			for ( var x = 0; x < imgData.height; x+=config.level) {
				html += '<p>'
    			for ( var y = 0; y < imgData.width; y+=config.level) {
    				var idx = (y + x * imgData.width) * 4;
      				var r = imgData.data[idx + 0];
		            var g = imgData.data[idx + 1];
            		var b = imgData.data[idx + 2];

            		if(config.color){
            			var word = config.word;
            			html += '<a style="color:rgb('+r+','+g+','+b+')">'+word+'</a>';
            		}else{
            			var gry = gray(r, g, b);
            			if(gry<50){
	            			html += '@';
	            		}else if(gry<100){
	            			html += '$';
	            		}else if(gry<150){
	            			html += '&';
	            		}else if(gray<200){
	            			html += '%';
	            		}else if(gry<250){
	            			html += '*';
	            		}else {
	            			html += '#';
	            		}
            		}
    			}
    			html += '</p>';
    		}

			var container = document.querySelector(config.container);
			var wrap = document.createElement("div");
			wrap.id = 'wrap';
			wrap.style.float = 'left';
			wrap.style.margin = 0;
			wrap.style.padding = 0;
			wrap.style.fontFamily = "宋体";
			wrap.style.fontSize = "1em";
			wrap.style.lineHeight = "0.5em";
			wrap.innerHTML = html;
			var ps = wrap.querySelectorAll('p');
			for(var i=0;i<ps.length;i++){
				ps[i].style.margin = 0;
			    ps[i].style.padding = 0;
			}
			container.innerHTML = '';
			container.appendChild(wrap);
			
			var ww, wh, ctw, cth;
			ww = wrap.offsetWidth;
			wh = wrap.offsetHeight;
			if(config.size == 1){//容器尺寸
				ctw = container.offsetWidth;
				cth = container.offsetHeight;
			}else if(config.size == 2){//图像尺寸
				ctw = cw;
				cth = ch;
			}else if(config.size == 3){//自定尺寸
				ctw = config.width;
				cth = config.height;
			}
			wrap.style.transform = 'scale('+ctw/ww+','+cth/wh+')';
			wrap.style.transformOrigin = 'left top';
		}
		function gray(r, g, b){
			return r*0.299 + g*0.587 + b*0.114;
		}
	}
})(window);