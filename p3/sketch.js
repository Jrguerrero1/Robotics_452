var robots = [];
var robotNumber;
var lights = [];

var play = false;

function setup() {
    createCanvas(1200, 600);
    noStroke();

    rectMode(CENTER);

    // Controls for adding a new light source
    lightXCoord = createInput();
    lightXCoord.position(1000, 20);
    lightXLabel = createElement('h4', 'X Coord').position(lightXCoord.x + lightXCoord.width, lightXCoord.y - lightXCoord.height-5);

    lightYCoord = createInput();
    lightYCoord.position(lightXCoord.x, lightXCoord.y + lightXCoord.height);
    lightYLabel = createElement('h4', 'Y Coord').position(lightYCoord.x + lightYCoord.width, lightYCoord.y - lightYCoord.height-5);

    lightButton = createButton('Add new light');
    lightButton.position(lightXCoord.x, lightYCoord.y + lightYCoord.height + 5);
    lightButton.mousePressed(addLight);

    // Controls for adding a new robot
    robotXCoord = createInput();
    robotXCoord.position(1000, 100);
    robotXLabel = createElement('h4', 'X Coord').position(robotXCoord.x + robotXCoord.width, robotXCoord.y - robotXCoord.height-5);

    robotYCoord = createInput();
    robotYCoord.position(robotXCoord.x, robotXCoord.y + robotXCoord.height);
    robotYLabel = createElement('h4', 'Y Coord').position(robotYCoord.x + robotYCoord.width, robotYCoord.y - robotYCoord.height-5);

    robotRotation = createInput();
    robotRotation.position(robotXCoord.x, robotYCoord.y + robotYCoord.height + 5);
    robotYLabel = createElement('h4', 'Rotation').position(robotRotation.x + robotRotation.width, robotRotation.y - robotRotation.height);

    robotK11 = createInput();
    robotK11.addClass('matrix-input');
    robotK11.position(robotRotation.x, robotRotation.y + robotRotation.height + 5);

    robotK12 = createInput();
    robotK12.addClass('matrix-input');
    robotK12.position(robotK11.x + 50, robotK11.y);

    robotK21 = createInput();
    robotK21.addClass('matrix-input');
    robotK21.position(robotK11.x, robotK11.y + robotK11.height);

    robotK22 = createInput();
    robotK22.addClass('matrix-input');
    robotK22.position(robotK12.x, robotK21.y);

    KMatrixLabel = createElement('h4', 'K matrix').position(robotYLabel.x, robotK22.y - 1.5*robotK22.height);
    
    //create
    
    robotButton = createButton('Add new robot');
    robotButton.position(robotXCoord.x, robotK22.y + robotK22.height + 5);
    robotButton.mousePressed(addRobot);

    // Pause/play button
    playButton = createButton('Play/Pause');
    playButton.position(robotButton.x, robotButton.y + robotButton.height + 5);
    playButton.mousePressed(togglePlay);

    // Clear button
    clearButton = createButton('Clear');
    clearButton.position(playButton.x + playButton.width  + 5, playButton.y);
    clearButton.mousePressed(clearObjects);

    //scale 

    robotS1 = createInput();
    robotS1.position(1000, 300);
    robotS1Label = createElement('h4', 'Scale').position(robotS1.x + robotS1.width, robotS1.y - robotS1.height-5);

    robotS2 = createInput();
    robotS2.position(robotS1.x, robotS1.y + robotS1.height);
    robotS2Label = createElement('h4', 'Color').position(robotS2.x + robotS2.width, robotS2.y - robotS2.height-5);

    robotN = createInput();
    robotN.position(robotS2.x, robotS2.y + robotS2.height);
    robotNLabel = createElement('h4', 'Robot #').position(robotN.x + robotN.width, robotN.y - robotN.height-5);



    Robotscale = createButton('Update');
    Robotscale.position(robotN.x  , robotN.y+40);
    Robotscale.mousePressed(robotChange);

    RobotDelete = createButton('Delete');
    RobotDelete.position(Robotscale.x + playButton.width-20 , Robotscale.y);
    RobotDelete.mousePressed(deleteRobot);



}


  
function draw() {
    background(220);

    if (play) updateRobots();

    for(i = 0; i < lights.length;i++)
    {
        lights[i].draw();
    }
    for(i = 0; i < robots.length;i++)
    {
        robots[i].draw();
    }
}

function addLight() {
    lights.push(new Light(lightXCoord.value(), lightYCoord.value()));
    console.log("Light added: " + lightXCoord.value() + " " +lightYCoord.value() );
    //lightXCoord.value('');    //uncomment to clear inputs
    //lightYCoord.value('');
}

function addRobot() {
    var K = [];
    K.push(parseFloat(robotK11.value()));
    K.push(parseFloat(robotK12.value()));
    K.push(parseFloat(robotK21.value()));
    K.push(parseFloat(robotK22.value()));
     if(robots.length==0){
        robotNumber=1;
    }
    else{
        robotNumber++;
    }
    robots.push(new Robot(robotXCoord.value(), robotYCoord.value(), robotRotation.value(), K,1,'maroon',robotNumber));
    console.log("Robot added: " + robotXCoord.value() + " " + robotYCoord.value() + " " + robotRotation.value());
    console.log('Robot number:'+robotNumber);
}

function updateRobots() {

    robots.forEach(robot => {
        var k11 = robot.K[0];
        var k12 = robot.K[1];
        var k21 = robot.K[2];
        var k22 = robot.K[3];

        var x = robot.x;
        var y = robot.y;
        var r = robot.r;

        var s1x = 43*Math.cos(r) + 15*Math.sin(r) + x;
        var s1y = 43*Math.sin(r) - 15*Math.cos(r) + y;

        var s2x = 43*Math.cos(r) - 15*Math.sin(r) + x;
        var s2y = 43*Math.sin(r) + 15*Math.cos(r) + y;

        var w1 = 0;
        var w2 = 0;

        lights.forEach(light => {

            s1 = light.getIntensity(s1x, s1y);
            s2 = light.getIntensity(s2x, s2y);

            w1 += k11 * s1 + k12 * s2;
            w2 += k21 * s1 + k22 * s2;

        });

        var omega = (w1 - w2) / 50.0; // 50 is distance between wheels
        var R = 25.0 * (w1 + w2) / (w1 - w2);
        var V = (w1 + w2) / 2;

        var dt = 1.0;

        robot.r += omega*dt;
        robot.x += V*Math.cos(robot.r)*dt;
        robot.y += V*Math.sin(robot.r)*dt;

    });

}

function togglePlay() {
    play = !play;
}

function clearObjects() {
    console.log("Clearing objects");
    robots.length = 0;
    lights.length = 0;
}
function robotChange(){
    robots[parseFloat(robotN.value())-1].s1= parseFloat(robotS1.value());
    robots[parseFloat(robotN.value())-1].c= robotS2.value();


}
function deleteRobot(){
    robots.splice(parseFloat(robotN.value())-1, 1);// deletes robot number , 
    for(i=0;i<robots.length;i++){// used for having correct number on robot
        robots[i].n=i+1;
    }
    if(robots.length==0){// if the length is zero then  for nect car it will be 1
        robotNumber=1;
    }
    else{// corrects number of next robot
        robotNumber=robots.length;
    }

}