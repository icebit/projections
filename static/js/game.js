var socket = io();

var renderer;
var stage;
var graphics;

var WIDTH, HEIGHT;

function play() {
  resize();

  renderer = new PIXI.autoDetectRenderer(WIDTH, HEIGHT, {
    antialias: true
  });

  stage = new PIXI.Container();
  graphics = new PIXI.Graphics();
  stage.addChild(graphics);

  renderer.backgroundColor = 0xffffff;
  document.body.appendChild(renderer.view);
}

window.onresize = resize;

function resize() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
}
