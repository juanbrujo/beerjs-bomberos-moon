// Require dependencies for Moon
global.Moon = require('moonjs');
const MoonSSR = require('moon-ssr');

// Some dependencies for I/O
const fs = require('fs');
const path = require('path');

// Our HTML layout file
const layout = fs.readFileSync('./index.html', 'utf8');

// Here we are using express, but you can use whatever
// you'd like
const express = require('express');
const server = express();

// Start a static server serving our javascript assets
server.use('/js', express.static(path.join(__dirname, 'js')));
server.use("/css", express.static(__dirname + '/css'));
server.use("/json", express.static(__dirname + '/json'));

// Get the '/' route and send over the server rendered content
server.get('/', (req, res) => {
  // Create a new instance of our Moon App
  const app = require('./js/scripts.js', './css/styles.css', './json/bomberos.json')();


  // Render our App to HTML
  const html = MoonSSR.renderToString(app);

  // Send it over to the client
  res.send(layout.replace('<div id="app"></div>', html));
});

// Start the Server on http://localhost:3000
server.listen(3000);
console.log('http://localhost:3000')