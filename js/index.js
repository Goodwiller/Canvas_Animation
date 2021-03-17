const canvas2 = document.getElementById('canvas2');
canvas2.width=  Math.floor(window.innerWidth)*0.9;
canvas2.height=  Math.floor(window.innerHeight)*0.8;

const ctx2 = canvas2.getContext('2d');


window.addEventListener('resize',
	function(event){
		canvas2.width=  Math.floor(window.innerWidth);
		canvas2.height=  Math.floor(window.innerHeight);
		init2();
});

var dist = canvas2.height/4;
var distn = (canvas2.height/4)-(2*(canvas2.height/4));

function Particle(x,y,dx,dy,radius){
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.radius=radius;
	this.draw=function(){
		ctx2.beginPath();
		ctx2.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx2.fillStyle="#00FF01";
		ctx2.fill();
		particleArray1.forEach(particle=>{
			if(particle.x-this.x<dist && particle.x-this.x>distn && particle.y-this.y<dist && particle.y-this.y>distn){
				ctx2.beginPath();
				ctx2.moveTo(particle.x,particle.y);
				ctx2.lineTo(this.x, this.y);
				ctx2.closePath();
				ctx2.strokeStyle = "#00FF01";
    			ctx2.stroke();
    			// console.log("yes");
			}
		});
	}
	this.update=function(){
		if(this.x+this.radius>canvas2.width ||this.x-this.radius<0){
			this.dx=-this.dx;
		}
		if(this.y+this.radius>canvas2.height ||this.y-this.radius<0){
			this.dy=-this.dy;
		}
		this.x+=this.dx;
		this.y+=this.dy;

		this.draw();
	}
}

var particleArray1=[];

function init2(){
	particleArray1=[];
	for (let i=0; i<30; i++) {
		var radius = 0.5;
		var x=Math.random()*(canvas2.width-radius*2)+radius;
		var y=Math.random()*(canvas2.height-radius*2)+radius;
		var dx=(Math.random()-0.5)*5;
		var dy=(Math.random()-0.5)*5;
		particleArray1.push(new Particle(x,y,dx,dy,radius));
	}
}

function animate2(){
	requestAnimationFrame(animate2);
	ctx2.clearRect(0,0,innerWidth,innerHeight);

	for (let i=0; i<particleArray1.length;i++) {
		particleArray1[i].update();
	}
}
init2();
animate2();


