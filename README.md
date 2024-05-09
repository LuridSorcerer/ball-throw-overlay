# Ball Throw Overlay

Twitch overlay that simulates the throwing of a Poké Ball in response
to specific keywords in the chat.

## Setup

The chat bot and server are written in Node.js. Navigate to server/ and
create a file called creds.js. Copy the template from twitchbot.js
and fill in the bot username, oauth token, and channels. 

With the credentials in place, run:

`
npm i

node twitchbot.js
`

If no errors occur, load up the overlay in OBS. Set the dimensions to 
1920x1080. Animations are independent of frame rate, so match your 
output settings. 

## Usage

Whenever the bot sees the word "ball" appear in the chat, it will send
a request to the overlay to spawn a thrown ball. It will do this for 
each instance of the word in a given message, and is not case sensitive.
