'use strict';
let app = require('express')();

// log it!
app.use(require('morgan')('dev'));

// Session set-up
let session = require('express-session');
let FileStore = require('session-file-store')(session);

app.use(session({
  name: 'server-session-cookie-id',
  secret: 'your very secret secret',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

app.get('/', (req, res, next) => {
  if (typeof req.session.views === 'undefined') {
    req.session.views = 1;
    return res.end('Hey there!! Refresh me please!!');
  }
  return next();  
});

app.get('/', (req, res, next) => {
  console.assert(req.session.views, 'any views missed count', req.session);
  req.session.views++;

  return next();  
});

// print the session out
app.use((req, res, next) => {
  console.log('req.session', req.session);
  return next();
});

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(`<p>The views are: ${req.session.views}</p>`);
  res.end();
});

let server = app.listen(8080, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Hey, I am in session at http://%s:%s', host, port);
});

// Basic info is cool and all, but we can add more stuff and it all gets serialized. For example, we can store the number of views in the session. We use and initialize a counter for this which gets updated with each view.
// Note that curl requests will generate a new cookie, since they are each separate requests. View in the browser and inspect the cookie(s) in session. You can see the printout on the console as well. There are many possibilities that can be serialized. Even shopping cart info. Use wisely... 