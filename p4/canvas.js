//canvas 1
var dataX = [];
var data = [];

var dataY = {};
var dataR = {};
var dataT = {};
var dataV = {};
var counter;
var pressed;
var interval;
var replayInterval;
var map = function( sketch ) {

  sketch.preload = function () {
      data = sketch.loadJSON('save.json');

}
  sketch.setup = function() {
    sketch.createCanvas(1000, 600);
    sketch.noStroke();
    sketch.rectMode(sketch.CENTER);
    bgImg = sketch.loadImage("bg.jpg");  // Load the image
    carImg = sketch.loadImage("racecar.png");  // Load the image
    ghostImg = sketch.loadImage("ghost.png");  // Load the image
    sketch.frameRate(10);
    sketch.imageMode(sketch.CENTER);
    interval=setInterval(record, 100);
    replayInterval=setInterval(replay,100);


  };

  sketch.draw = function() {
    sketch.background(220);

    sketch.image(bgImg, sketch.width / 2, sketch.height / 2);
    //starting pos
            ghosts.circle(sketch);

    sketch.fill('red');
    sketch.ellipse(500, 90,20,20);

    ghosts.draw(sketch, ghostImg);
    car.draw(sketch, carImg);
     


  };

  sketch.keyPressed = function() {
    var keyIndex = -1;
    switch (sketch.key) {
      case 'ArrowUp':
        speedSlider.value(speedSlider.value() + 5);
        break;
      case 'ArrowDown':
        speedSlider.value(speedSlider.value() - 5);
        break;
      case 'ArrowLeft':
        rotationSlider.value(rotationSlider.value() - 0.5);
        break;
      case 'ArrowRight':
        rotationSlider.value(rotationSlider.value() + 0.5);
        break;
      case ' ':
        togglePlay();
        clearInterval(interval);
        break;
      case's':
        saveAll();
        sketch.save(saving, 'save.json');
        break;
      case"l":
        loadDataValues();
        console.log("l");
        break;

      default:
        break;
    }
    updateCar();
  }
};



//Canvas 2


// canvas 2
var sidebar = function( world ) {
  world.setup = function() {
    world.createCanvas(250, 600);
    world.noStroke();
    world.rectMode(world.CENTER);
    
    // sidebars for adding a new car
    world.createElement('h4', 'Sidebars').position(1125,30);

    speedSlider = world.createSlider(-5, 200, 0,1);//(min, max,default valuw, step for slider)
    speedSlider.position(1050,100);
    speed = world.createElement('h4', 'Speed').position(1150, 80);
    speedV = world.createElement('h4', speedSlider.value().toString()).position(1200, 80);
    speedSlider.changed(updateCar);

    //rotation for debug
    rotationSlider = world.createSlider(-30, 30, 0, .5);//(min, max,default value, step for slider)
    rotationSlider.position(1050,120);
    rotationS = world.createElement('h4', 'Rotation').position(1150, 100);
    rotationV = world.createElement('h4', rotationSlider.value().toString()).position(1215, 100);
    rotationSlider.changed(updateCar);

    // Pause/play button
    playButton = world.createButton('Play/Pause');
    playButton.position(rotationSlider.x, rotationSlider.y + rotationSlider.height + 20);
    playButton.mousePressed(togglePlay);

    // Clear button
    ghost = world.createButton('Replay');
    ghost.position(playButton.x + playButton.width  + 5, playButton.y);
    ghost.mousePressed(toggleReplay);

    //scale 
    // carS1 = world.createInput();
    // carS1.position(1050, 300);
    // carS1Label = world.createElement('h4', 'Scale').position(carS1.x + carS1.width, carS1.y - carS1.height-5);

    // carscale = world.createButton('Main');
    // carscale.position(carS1.x  , carS1.y+40);
    // carscale.mousePressed(carMain);

    // Wheel velocities
    VflDisplay = world.createElement('h5', 'Front Left: 0');
    VflDisplay.position(playButton.x, playButton.y + playButton.height + 5);

    VfrDisplay = world.createElement('h5', 'Front Right: 0');
    VfrDisplay.position(ghost.x, VflDisplay.y);

    VblDisplay = world.createElement('h5', 'Back Left: 0');
    VblDisplay.position(playButton.x, VflDisplay.y + VflDisplay.height + 5);

    VbrDisplay = world.createElement('h5', 'Back Right: 0');
    VbrDisplay.position(ghost.x, VblDisplay.y);
    // VbrDisplay = world.createElement('h5', 'Keys: Save("s)", Load("l") ');
    // VbrDisplay.position(ghost.x, VblDisplay.y);
  };

  world.draw = function() {
     world.background(220);
     speedV.html(speedSlider.value());
     rotationV.html(rotationSlider.value());

     //loading
  };
};


function loadDataValues() {
   var x_ = data[1];
   var y_ = data[3];
   var r_ = data[5];
   var v_ = data[9];
   var t_ = data[7];
  count = data[11];
  
  for (var i = 0; i < count; i++) {
    console.log("data loading");
     ghostX[i]= x_[i];
     ghostY[i]= y_[i];
     ghostR[i]= r_[i];
     ghostT[i]= t_[i];
     ghostV[i]= v_[i];
  }
  
}