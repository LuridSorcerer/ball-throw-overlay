const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("open", (e) => { 
    socket.send("Connected, throwing ball");
    add_ball(); 
});

socket.addEventListener("message", (e) => { add_ball(); });