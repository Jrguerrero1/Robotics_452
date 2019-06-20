var play = false;
var re = false;
var car = new Car(500, 90, 180, .01); 
var ghosts = new Car(500, 90, 180, .01);
var ghostV = [];
var ghostT = [];
var ghostR = [];
var ghostX = [];
var ghostY = [];
var saving = [];

var count=0;
var i=0;
var one = new p5(map,'one');
var two = new p5(sidebar,'two');

const g = 2.4511; // wheelbase in meters
const d = 0.762; // distance between wheel and center in meters
const dt = 0.1; // 1/10 seconds

// TODO: Fix this
function updateCar(){
    var alphaR = parseFloat(rotationSlider.value()) * (Math.PI / 180.0); // Steering angle of the right wheel
    var VFR = parseFloat(speedSlider.value()) * 0.44704; // Speed of the front right wheel converted mph to m/s
    if (alphaR == 0.0) {
        var V = VFR;
        var omega = 0.0;

        VflDisplay.html('Front Left: ' + (V / 0.44704).toFixed(2));
        VfrDisplay.html('Front Right: ' + (V / 0.44704).toFixed(2));
        VblDisplay.html('Back Left: ' + (V / 0.44704).toFixed(2));
        VbrDisplay.html('Back Right: ' + (V / 0.44704).toFixed(2));
    }
    else {
        var turnRadius = (g / Math.tan(alphaR)) + d;
        var omega = (VFR * Math.sin(alphaR)) / g;
        var alphaL = Math.atan(g / (turnRadius + d));
        var VFL = (omega * g) / Math.sin(alphaL)
        var VBR = omega * (turnRadius - d);
        var VBL = omega * (turnRadius + d);
        var V = omega * turnRadius;

        VflDisplay.html('Front Left: ' + (VFL / 0.44704).toFixed(2));
        VfrDisplay.html('Front Right: ' + (VFR / 0.44704).toFixed(2));
        VblDisplay.html('Back Left: ' + (VBL / 0.44704).toFixed(2));
        VbrDisplay.html('Back Right: ' + (VBR / 0.44704).toFixed(2));
    }
    car.turnSpeed = omega;
    car.velocity = V;
}

//shouldnt these be all the values i need to make my replau work?
function record(){
    if(play){
    ghostX.push(car.x);
    ghostY.push(car.y);
    ghostV.push(car.velocity);
    ghostT.push(car.turnSpeed);
    ghostR.push(car.r);
    count++;
}
}
// car so far is not moving
function replay(){
    if(re){
        if(count>0){
                console.log("count is : "+count);
                ghosts.x = ghostX[i];
                ghosts.y = ghostY[i];
                ghosts.r = ghostR[i];

            if (ghosts.velocity) {

                ghosts.x += ghostV[i].velocity * Math.cos(ghostR[i].r) * dt;
                 console.log("x is : "+ (ghosts.x +ghostV[i].velocity * Math.cos(ghostR[i].r) * dt));
                ghosts.y += ghostV[i].velocity * Math.sin(ghostR[i].r) * dt;  
                 console.log("y is : "+(ghosts.y+ghostV[i].velocity * Math.sin(ghostR[i].r)* dt)); 
                ghosts.r += ghostR[i];
            }
            count--;
            i++;
        };
}

}


function togglePlay() {
    play = !play;
    if(!play){
        //console.log(ghosts.length)
        clearInterval(interval);
    }
    //else interval=setInterval(record,100);
}
function toggleReplay() {

    re = !re;

    if(!re){
        //console.log(ghosts.length)
        clearInterval(replayInterval);
        
    }
    //else replayInterval=setInterval(replay,100);
}


function carMain(){
    car.s1= parseFloat(carS1.value());
}
function viewChange(){
    if(map_1.state == 0){
        car.s1 = 0.3;
        car.x = 500;
        car.y = 300;
        map_1.s1 = 2;
        map_1.changeStates();
    }
    else{
        car.s1 = 0.01;
        car.x = 500;
        car.y = 90
        map_1.changeStates();
    }


}

function saveAll(){

        saving.push("Xvalues");
        saving.push(ghostX);
        saving.push("Yvalues");
        saving.push(ghostY); 
        saving.push("Rvalues");
        saving.push(ghostR);
        saving.push("Tvalues");
        saving.push(ghostT);
         saving.push("Vvalues");
        saving.push(ghostV);
        saving.push("Counter");
        saving.push(count);

}