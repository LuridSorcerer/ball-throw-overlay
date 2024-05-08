let canvas;
let ctx;

let time;

let balls = [];
let pokeball;
let pctx;

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

    // create poke ball image
    pokeball = document.createElement("canvas");
    pokeball.width = 64;
    pokeball.height = 64;
    pctx = pokeball.getContext("2d");
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
    });
}

function render () {
    // clear canvas
    ctx.clearRect(0,0,1920,1080);
    // draw balls
    balls.forEach((ball) => {
        ctx.drawImage(pokeball,ball.location.x,ball.location.y);
    });
}

function run() {
    render();
    update();
    requestAnimationFrame(run);
}

function add_ball() {
    balls.push({
        location: {x:0, y:1080},
        speed: {x:1000*(0.5+Math.random()), y:-1000*(0.5+Math.random())},
        rotation: 0
    });
}

init();
run();
