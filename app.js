let canvas;
let ctx;

let time;

let balls = [];
let pokeball;

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
    let ptx = pokeball.getContext("2d");
    // draw the outline
    ptx.fillStyle = "black";
    ptx.beginPath();
    ptx.arc(32,32,32,0,2*Math.PI);
    ptx.fill();
    // red top half
    ptx.fillStyle = "red";
    ptx.beginPath();
    ptx.arc(32,30, 28, Math.PI,0);
    ptx.fill();
    // white bottom half
    ptx.fillStyle = "white";
    ptx.beginPath();
    ptx.arc(32,34, 28, 0, Math.PI);
    ptx.fill();
    // black outline of button
    ptx.fillStyle = "black";
    ptx.beginPath();
    ptx.arc(32,32, 8, 0, Math.PI*2);
    ptx.fill();
    // white button
    ptx.fillStyle = "white";
    ptx.beginPath();
    ptx.arc(32,32, 6, 0, Math.PI*2);
    ptx.fill();
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
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,1920,1080);
    // draw balls
    ctx.fillStyle = "black";
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