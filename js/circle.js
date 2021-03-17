const canvas1 = document.getElementById('canvas1');
canvas1.width=  Math.floor(window.innerWidth)*0.9;
canvas1.height=  Math.floor(window.innerHeight)*0.8;

const ctx1 = canvas1.getContext('2d');


const colors=[
	'#3F3CA6',
	'#35328C',
	'#F29F05',
	'#F28705',
	'#F2762E'
];

var mouse={
	x:canvas1.width/2,
	y:canvas1.height/2
}


window.addEventListener('resize',
	function(event){
		canvas1.width=window.innerWidth;
		canvas1.height= window.innerHeight;
		init1();
});

window.addEventListener('mousemove',
	function(event){
		mouse.x=event.clientX;
		mouse.y=event.clientY;
});


function randomIntFromRange(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}

function randomColor(colors){
	return colors[Math.floor(Math.random()*colors.length)];
}

function Particle(x,y,radius,color){
	this.x=x;
	this.y=y;
	this.radius=radius;
	this.color=color;
	this.radians=Math.random()*Math.PI*2;
	this.velocity=0.05;
	this.distanceFromCenter=randomIntFromRange(50,120);
	this.lastMouse={x:x,y:y};
	this.draw=lastPoint =>{
		ctx1.beginPath();
		ctx1.strokeStyle=this.color;
		ctx1.lineWidth = this.radius;
		ctx1.moveTo(lastPoint.x,lastPoint.y);
		ctx1.lineTo(this.x,this.y);
		ctx1.stroke();
		ctx1.closePath();
	}
	this.update=function(){

		const lastPoint = {x:this.x, y:this.y};

		this.radians += this.velocity;

		this.lastMouse.x+=(mouse.x-this.lastMouse.x)*0.05;
		this.lastMouse.y+=(mouse.y-this.lastMouse.y)*0.05;

		this.x = this.lastMouse.x + Math.cos(this.radians)*this.distanceFromCenter; 
		this.y = this.lastMouse.y + Math.sin(this.radians)*this.distanceFromCenter; 
		this.draw(lastPoint);
	}
}

var particleArray=[];

function init1(){
	particleArray=[];
	for (let i=0; i<30; i++) {

		const radius=(Math.random()*10)+1;
		particleArray.push(new Particle(canvas1.width/2,canvas1.height/2,radius,randomColor(colors)));
	}
}

function animate1(){
	requestAnimationFrame(animate1);
	ctx1.fillStyle='rgba(255,255,255,0.1)';
	ctx1.fillRect(0,0,canvas1.width,canvas1.height);

	for (let i=0; i<particleArray.length;i++) {
		particleArray[i].update();
	}
}
init1();
animate1();
