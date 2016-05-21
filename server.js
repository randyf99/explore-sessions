'use strict';
var app = require('express')();

app.get('/', (req, res) => {
  res.send('Hey');
});

let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Hey, I am running at http://%s:%s', host, port);
});

// 1) npm init
// 2) install express & nodemon (--save-dev) with start script.
 
// Basic vanilla server. It just answers Hey for requests. Note the console log running inside the callback. 
// This way, the message is delivered once server is running as it should. 
// If outside, message will show before server actually launches. Hardly 
// noticeable, but first into ro Async stuff. :)
// 
// I recommend using curl -v http://localhost:3000, or httpie. I got all my guys to install it. 