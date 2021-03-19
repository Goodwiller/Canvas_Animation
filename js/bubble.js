const canvas = document.getElementById('canvas');
const canvasdiv = document.getElementById('canvasdiv');
canvas.width=  Math.floor(canvasdiv.clientWidth)*0.8;
canvas.height=  Math.floor(canvasdiv.clientHeight)*0.8;

const ctx = canvas.getContext('2d');

var mouse={
	x:undefined,
	y:undefined
}


window.addEventListener('mousemove',
	function(event){
		let rect = canvas.getBoundingClientRect(); 
		mouse.x = event.x - rect.left; 
		mouse.y = event.y - rect.top; 
});

var onit;
$('#canvas').hover(function(){
	onit=1;
	},function(){
		onit=2;
});


window.addEventListener('resize',
	function(event){
		canvas.width=  Math.floor(canvasdiv.clientWidth)*0.8;
		canvas.height=  Math.floor(canvasdiv.clientHeight)*0.8;
		init();
});

var maxRadius=40;
var minRadius=10;
var colorArray=['#034C8C','#03588C','#0378A6','#96C6D9','#0388A6'];

function Circle(x,y,dx,dy,radius){
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.radius=radius;
	this.minRadius=radius;
	this.color=colorArray[Math.floor(Math.random()*colorArray.length)];
	this.draw=function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle=this.color;
		ctx.fill();
	}
	this.update=function(){
		if(this.x+this.radius>canvas.width ||this.x-this.radius<0){
			this.dx=-this.dx;
		}
		if(this.y+this.radius>canvas.height ||this.y-this.radius<0){
			this.dy=-this.dy;
		}
		this.x+=this.dx;
		this.y+=this.dy;

		//Interactivity
		if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50 && onit==1 ){
			if(this.radius<maxRadius)
				this.radius+=1;
		}else if(this.radius>this.minRadius){
			this.radius-=1;
		}
		this.draw();
	}
}

var circleArray=[];

function init(){
	circleArray=[];
	for (let i=0; i<800; i++) {
		var radius = Math.random()*0+1;
		var x=Math.random()*(canvas.width-radius*2)+radius;
		var y=Math.random()*(canvas.height-radius*2)+radius;
		var dx=(Math.random()-0.5)*5;
		var dy=(Math.random()-0.5)*5;
		circleArray.push(new Circle(x,y,dx,dy,radius));
	}
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);

	for (let i=0; i<circleArray.length;i++) {
		circleArray[i].update();
	}
}
animate();
init();