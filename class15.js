// Intro click
const intro=document.getElementById('intro');
const card=document.getElementById('card');
const music=document.getElementById('music');
const countdown=document.getElementById('countdown');
const message=document.getElementById('valentineMessage');

intro.onclick=()=>{
  intro.style.display='none';
  card.style.display='block';
  music.play();
};

// Countdown
const target=new Date("February 14, 2026 00:00:00").getTime();

setInterval(()=>{
  const now=new Date().getTime();
  const diff=target-now;

  if(diff<=0){
    countdown.style.display='none';
    message.style.display='block';
    return;
  }

  document.getElementById('days').textContent=Math.floor(diff/(1000*60*60*24));
  document.getElementById('hours').textContent=Math.floor((diff/(1000*60*60))%24);
  document.getElementById('minutes').textContent=Math.floor((diff/(1000*60))%60);
  document.getElementById('seconds').textContent=Math.floor((diff/1000)%60);
},1000);

// Canvas particle system
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

class Particle{
  constructor(x,y,vx,vy,size,color,type){
    this.x=x;
    this.y=y;
    this.vx=vx;
    this.vy=vy;
    this.size=size;
    this.color=color;
    this.type=type;
  }

  update(){
    this.x+=this.vx;
    this.y+=this.vy;

    if(this.y>canvas.height){
      this.y=-10;
      this.x=Math.random()*canvas.width;
    }

    if(this.x<0||this.x>canvas.width){
      this.vx*=-1;
    }
  }

  draw(){
    ctx.beginPath();
    if(this.type==='heart'){
      ctx.font=this.size+'px serif';
      ctx.fillStyle=this.color;
      ctx.fillText('❤️',this.x,this.y);
    }else if(this.type==='confetti'){
      ctx.fillStyle=this.color;
      ctx.fillRect(this.x,this.y,this.size,this.size);
    }else if(this.type==='firework'){
      ctx.font=this.size+'px serif';
      ctx.fillStyle=this.color;
      ctx.fillText('🎆',this.x,this.y);
    }
  }
}

// Generate particles
for(let i=0;i<40;i++)
  particles.push(new Particle(Math.random()*canvas.width,Math.random()*canvas.height,0,(Math.random()*1+0.5),30,'pink','heart'));

for(let i=0;i<60;i++)
  particles.push(new Particle(Math.random()*canvas.width,Math.random()*canvas.height,(Math.random()-0.5)*2,(Math.random()*2+1),5,'#f1c40f','confetti'));

for(let i=0;i<15;i++)
  particles.push(new Particle(Math.random()*canvas.width,Math.random()*canvas.height,(Math.random()-0.5)*2,(Math.random()*1.5+0.5),40,'#ff2f6d','firework'));

// Animate
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize',()=>{
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
});
