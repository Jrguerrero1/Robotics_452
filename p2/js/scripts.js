var theta1=-Math.PI/2;
var theta2=Math.PI/2;
var theta3=-Math.PI/2;

var increment = Math.PI/16;

var l1 = 150;
var l2 = 100;
var l3 = 75;

var x0 = 400;
var y0 = 400;

var x1, x2, x3;
var y1, y2, y3;

var drawInterval;

var penOn = false;

var canvas;
var ctx;
var path_buffer;

var height = 450;
var width = 800;
var color='#800000 ';
// var bg='white';


$(document).ready(function() {
  canvas = document.getElementById("Canvas");
  ctx = canvas.getContext("2d");
  
  path_buffer = new Array();
  draw();
});

function draw() {

  // Calculate joint positions based on angles.
  x1 = x0 + (Math.cos(theta1) * l1);
  y1 = y0 + (Math.sin(theta1) * l1);

  x2 = x1 + (Math.cos(theta1+theta2) * l2);
  y2 = y1 + (Math.sin(theta1+theta2) * l2);

  x3 = x2 + (Math.cos(theta1+theta2+theta3) * l3);
  y3 = y2 + (Math.sin(theta1+theta2+theta3) * l3);

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Update drawing if pen is on
  if (penOn) {
    path_buffer.push(x3);
    path_buffer.push(y3);
  }

  // Redraw our drawings
  ctx.lineWidth = 20;
  console.log(color);
  ctx.strokeStyle = color ;
  ctx.lineCap = 'round';
  ctx.shadowColor = 'transparent';
  ctx.setLineDash([]);
  ctx.beginPath();
  
  for (var i = 0; i < path_buffer.length; i += 2) {
    var x = path_buffer[i];
    var y = path_buffer[i+1];

    if ((x==0) && (y==0)) {
      ctx.beginPath();
      continue;
    }

    ctx.lineTo(x, y);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();

  }

  // Draw our arms
  ctx.lineCap = 'butt';
  ctx.strokeStyle="black";
  ctx.lineWidth = 4;
  ctx.setLineDash([4, 2]);
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 10;
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'grey';
  ctx.beginPath();
  ctx.moveTo(x0, y0);

  ctx.lineTo(x1, y1);
  ctx.stroke();
  ctx.moveTo(x1, y1);


  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.moveTo(x2, y2);


  ctx.lineTo(x3, y3);
  ctx.stroke();

}

function holdDown(sign, num) {
  var addingNum = 0;
  if (sign == 0) 
    addingNum -= increment;
  else if (sign == 1)
    addingNum += increment;
  
  if (num == 1) 
    theta1 += addingNum*0.5;
  else if (num == 2)
    theta2 += addingNum*0.6;
  else if (num == 3)
    theta3 += addingNum;
    
  draw();
}
function holdInvKin(x, y) {
  inverseKin(x, y);
}


function togglePen() {

  path_buffer.push(0);
  path_buffer.push(0);

  penOn = !penOn;

  draw();

}

function clearDrawings() {
  path_buffer.length = 0;
  draw();
}

function inverseKin(x_step, y_step) {

  x = x_step + x2;
  y = -y_step + y2;
  y = y - y0;
  x = x - x0;

  var arg = ((x*x+y*y) - (l1*l1+l2*l2))/(2*l1*l2);

  var newTheta2 = Math.acos(arg);

  var gammaArg = (x*x + y*y  + l1*l1 - l2*l2)/(2*l1*Math.sqrt(x*x+y*y));
  var gamma = Math.acos(gammaArg);

  var beta = Math.atan2(y,x);

  var newTheta1_option1 = beta - gamma;
  var newTheta1_option2 = beta + gamma;

  var diff1 = Math.abs(theta1 - newTheta1_option1);
  var diff2 = Math.abs(theta1 - newTheta1_option2);

  if (diff1 < diff2)
    newTheta1 = newTheta1_option1;
  else 
    newTheta1 = newTheta1_option2;

  var alpha = theta1 + theta2 + theta3;

  newTheta3 = alpha - (newTheta1+newTheta2);

  // Check if angles are in the domain
  if (newTheta1 && newTheta2 && newTheta3) {
    theta1 = newTheta1;
    theta2 = newTheta2;
    theta3 = newTheta3;
  }

  draw();
}
function colorChange(c){
  color= c.getAttribute('data-name');
  draw();
  console.log(color);
   
  }

// function BgChange(color)  {
//     if(1) 
//     bg='black';
//     if(2) 
//     bg='white';

//     draw();

// }

