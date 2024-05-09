const tmi = require('tmi.js');
const WebSocket = require("ws");

// open websocket to send out ball throw events
const wss = new WebSocket.Server({ port:8080 });

// opts moved to external file, creds.js. It is ignored from git
// because it contains login credentials.
/* module.exports = {
    identity: {
        username: '<BOT_USER_NAME',
        password: 'oauth:<LOGON_TOKEN>'
    }, 
    channels: [
        '<CHANNEL_NAME>'
    ]
}; */
const opts = require("./creds");

// connect to the twich chat, set up event handlers
const client = new tmi.client(opts);
client.on('message',onMessageHandler);
client.connect();

function onMessageHandler(target,context,msg,self) {
	// if it was the bot that posted it, don't do anything
	if(self) { return; }
	// count how many times the word "ball" appears
    var count = (msg.match(/ball/g) || []).length;
    // send that many balls
	for (var i = 0; i < count; i++) {
		wss.clients.forEach(client => client.send("ball"));
	}
}
