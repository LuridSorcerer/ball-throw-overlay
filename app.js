let canvas;
let ctx;

let time;

let balls = [];
let balltypes = [];
let pokeball; 
let greatball;
let ultraball;
let premball;

const ballsize = 64;
const bouncestrength = -0.5;
const balllifetime = 5.0;

const socket = new WebSocket("ws://localhost:8080");
socket.addEventListener( "message", (e) => { add_ball(); });

function init() {
    // get canvas and set the dimensions
    canvas = document.getElementById("canvas");
    canvas.width=1920;
    canvas.height=1080;
    // get drawing context
    ctx = canvas.getContext("2d");
    // get initial time
    time = Date.now();
    // add event listener for mouse click
    document.addEventListener("click", (e) => {add_ball();});
    document.addEventListener("touchstart", (e) => {add_ball();});

    // create poke ball image
    pokeball = document.createElement("canvas");
    pokeball.width = 64;
    pokeball.height = 64;
    let pctx = pokeball.getContext("2d");
    // draw the outline
    pctx.fillStyle = "black";
    pctx.beginPath();
    pctx.arc(32,32,32,0,2*Math.PI);
    pctx.fill();
    // red top half
    pctx.fillStyle = "red";
    pctx.beginPath();
    pctx.arc(32,30, 28, Math.PI,0);
    pctx.fill();
    // white bottom half
    pctx.fillStyle = "white";
    pctx.beginPath();
    pctx.arc(32,34, 28, 0, Math.PI);
    pctx.fill();
    // black outline of button
    pctx.fillStyle = "black";
    pctx.beginPath();
    pctx.arc(32,32, 8, 0, Math.PI*2);
    pctx.fill();
    // white button
    pctx.fillStyle = "white";
    pctx.beginPath();
    pctx.arc(32,32, 6, 0, Math.PI*2);
    pctx.fill();
    
    // create great ball image
    greatball = document.createElement("canvas");
    greatball.width = 64;
    greatball.height = 64;
    pctx = greatball.getContext("2d");
    // draw the outline
    pctx.fillStyle = "black";
    pctx.beginPath();
    pctx.arc(32,32,32,0,2*Math.PI);
    pctx.fill();
    // blue top half
    pctx.fillStyle = "blue";
    pctx.beginPath();
    pctx.arc(32,30, 28, Math.PI,0);
    pctx.fill();
    // red stripes
    pctx.fillStyle = "red";
	pctx.fillRect(16,8,8,16);
	pctx.fillRect(40,8,8,16);
    // white bottom half
    pctx.fillStyle = "white";
    pctx.beginPath();
    pctx.arc(32,34, 28, 0, Math.PI);
    pctx.fill();
    // black outline of button
    pctx.fillStyle = "black";
    pctx.beginPath();
    pctx.arc(32,32, 8, 0, Math.PI*2);
    pctx.fill();
    // white button
    pctx.fillStyle = "white";
    pctx.beginPath();
    pctx.arc(32,32, 6, 0, Math.PI*2);
    pctx.fill();

    // create ultra ball image
    ultraball = document.createElement("canvas");
    ultraball.width = 64;
    ultraball.height = 64;
    pctx = ultraball.getContext("2d");
    // draw the outline
    pctx.fillStyle = "black";
    pctx.beginPath();
    pctx.arc(32,32,32,0,2*Math.PI);
    pctx.fill();
    // black top half
    pctx.fillStyle = "black";
    pctx.beginPath();
    pctx.arc(32,30, 28, Math.PI,0);
    pctx.fill();
    // yellow stripes
    pctx.fillStyle = "yellow";
	pctx.fillRect(16,8,8,16);
	pctx.fillRect(40,8,8,16);
    // white bottom half
    pctx.fillStyle = "white";
    pctx.beginPath();
    pctx.arc(32,34, 28, 0, Math.PI);
    pctx.fill();
    // black outline of button
    pctx.fillStyle = "black";
    pctx.beginPath();
    pctx.arc(32,32, 8, 0, Math.PI*2);
    pctx.fill();
    // white button
    pctx.fillStyle = "white";
    pctx.beginPath();
    pctx.arc(32,32, 6, 0, Math.PI*2);
    pctx.fill();

    // create premier ball image
    premball = document.createElement("canvas");
    premball.width = 64;
    premball.height = 64;
    pctx = premball.getContext("2d");
    // draw the outline
    pctx.fillStyle = "black";
    pctx.beginPath();
    pctx.arc(32,32,32,0,2*Math.PI);
    pctx.fill();
    // white top half
    pctx.fillStyle = "white";
    pctx.beginPath();
    pctx.arc(32,30, 28, Math.PI,0);
    pctx.fill();
    // white bottom half
    pctx.fillStyle = "white";
    pctx.beginPath();
    pctx.arc(32,34, 28, 0, Math.PI);
    pctx.fill();
    // red seam in middle
    pctx.fillStyle = "red";
    pctx.fillRect(4,30,56,4);
    // red outline of button
    pctx.fillStyle = "red";
    pctx.beginPath();
    pctx.arc(32,32, 8, 0, Math.PI*2);
    pctx.fill();
    // white button
    pctx.fillStyle = "white";
    pctx.beginPath();
    pctx.arc(32,32, 6, 0, Math.PI*2);
    pctx.fill();
    
    balltypes = [pokeball,greatball,ultraball,premball];
}

function update() {
    // get how many seconds have passed
    let timediff = (Date.now() - time) / 1000;
    // update time
    time = Date.now();
    // update balls' state 
    balls.forEach((ball) => {
        // apply gravity
        ball.speed.y += (timediff * 500.0);
        // move ball
        ball.location.x += (timediff * ball.speed.x);
        ball.location.y += (timediff * ball.speed.y);
        ball.location.r += (timediff * ball.speed.r);
        // add age
        ball.age += timediff;
        // bounce off of the right wall
        if (ball.location.x > canvas.width-(ballsize/2)) {
			ball.location.x = canvas.width-(ballsize/2);
			ball.speed.x *= bouncestrength;
		}
		// bounce off the top
		if (ball.location.y < 0+(ballsize/2)) {
			ball.location.y = 0+(ballsize/2);
			ball.speed.y *= bouncestrength;
		}
		// bounce off the left wall
		if (ball.location.x < 0+(ballsize/2)) {
			ball.location.x = 0+(ballsize/2);
			ball.speed.x *= bouncestrength;
		}
		// bounce off floor
		if (ball.location.y > canvas.height-(ballsize/2)) {
			ball.location.y = canvas.height-(ballsize/2);
			ball.speed.y *= bouncestrength;
		}
			
    });
    // remove aged balls 
    balls = balls.filter(ball => ball.age < balllifetime);
}

function render () {
    // clear canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // draw balls
    balls.forEach((ball) => {
		ctx.save();
		ctx.translate(ball.location.x,ball.location.y);
		ctx.rotate(ball.location.r*Math.PI/180);
		ctx.drawImage(balltypes[ball.type],-32,-32);
		ctx.restore();
    });
}

function run() {
    render();
    update();
    requestAnimationFrame(run);
}

function add_ball() {
	// select a ball type (index in balltypes[])
	var n = Math.random() * 100;
	var t;
	if (n < 5)       { t = 3; }// 5% chance of premier ball	
	else if (n < 15) { t = 2; } // 10% chance of ultra ball
	else if (n < 40) { t = 1; } // 25% chance of great ball
	else             { t = 0; } // otherwise, poke ball

    balls.push({
        location: {
			x:ballsize, 
			y:canvas.height-ballsize,
			r:0
		},
        speed: {
			x:1000*(0.5+Math.random()), 
			y:-1000*(0.5+Math.random()),
			r:720*Math.random()
		},
		age: 0,
		type: t
    });
}

init();
run();
