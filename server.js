var VERSION = '0.0.1';
var PORT = 9000;

var phys = require('./physics.min.js');
var uuid = require('uuid');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var world;
var gravity;
var body;
var floor;

var players = {};

function init() {
  console.log('Projections v' + VERSION);

  world = phys({
    timestep: 16
  });

  gravity = phys.behavior('constant-acceleration');
  world.add(gravity);

  body = phys.body('circle', {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    radius: 20
  });
  world.add(body);

  floor = phys.body('rectangle', {
    x: 0,
    y: 100,
    width: 100,
    height: 10,
    treatment: 'static'
  });
  world.add(floor);

  world.add(phys.behavior('body-collision-detection'));
  world.add(phys.behavior('sweep-prune'));
  world.add(phys.behavior('body-impulse-response'));

  setInterval(update, 16);

  startServer();
}

function startServer() {
  http.listen(PORT, function() {
    console.log("Listening on port " + PORT);
  });
}

function update() {
  world.step(Date.now());
}

init();
