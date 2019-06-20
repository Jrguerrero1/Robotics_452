

//3 recs
var boxes = [
  { x:200, y:300 , l:200, w:200 , active: false ,r:100,n:"1",color:'maroon'},
  { x:200, y:100,l:150, w:150 , active: false, r:50,n:"2",color:'maroon'},
  { x:400, y:200,l:100, w:100 ,  active: false, r:25,n:"3",color:'maroon'}
]
var to_draw=false;
var isAct = false;
var count=0;

points = []

var cells = [];
var path = null;

function setup() {
  var myCanvas = createCanvas(500, 500);
    myCanvas.parent("one");  
  rectMode(CENTER);
  drawing = createButton('Draw');
    drawing.position(355, 200);
    drawing.mousePressed(draw_switch);
  drawing_text1=createElement('h4',"").position(drawing.x,drawing.y+10);
  drawing_text2=createElement('h4',"").position(drawing.x,drawing.y+25);



  // Calculate = createButton('Path');
  //   Calculate.position(635, 600);
  //   Calculate.mousePressed(pressed);
  // path_text=createElement('h4',"").position(Calculate.x,Calculate.y+10);

}

function draw() {
  background("grey");
  if (boxes.length > 0) {
    for (var i = 0; i < boxes.length; i++) {
      fill(boxes[i].color);
      rect(boxes[i].x, boxes[i].y,parseFloat(boxes[i].l),parseFloat(boxes[i].w));
      rect(boxes[i].x, boxes[i].y,parseFloat(boxes[i].l),parseFloat(boxes[i].w));
      fill('white');
    stroke('black');
      text(boxes[i].n, parseFloat(boxes[i].x) , parseFloat(boxes[i].y));         
    }
  }
  
  if(!to_draw){
    drawing_text1.html("");
    drawing_text2.html("");
    } 
  if(to_draw){
    drawing_text1.html("Drew");
  if(points.length==2)drawing_text2.html("Start");
  if(points.length==3)drawing_text2.html("Stop");
  if(points.length==1)drawing_text2.html("");

}
  for(i=1; i < points.length;i++){
    if(i==1)fill('green');
    if(i==2)fill('red');
    ellipse(points[i][0], points[i][1], 10 ,10);
    fill('white');
    if(i==1){
    stroke('black');
    text("Start", points[i][0]+10, points[i][1]);         
    }
    if(i==2){
    stroke('black');
    text('End', points[i][0]+10, points[i][1]);         
    }
  }

  drawPath();
}

function draw_switch(){
  to_draw= !to_draw;
  
  // points.length=0;
  // points = [];
}
function mousePressed() {
  if (boxes.length > 0) {
    for (var i = 0; i < boxes.length; i++) {
          distance = dist(mouseX, mouseY, parseFloat(boxes[i].x), parseFloat(boxes[i].y));
      if (distance < boxes[i].r) {
        boxes[i].active = true;
        boxes[i].color = "grey";
      } else {
        boxes[i].active = false;
        boxes[i].color = 'maroon';
      }
    }
  }

  
  for (var i = 0; i < boxes.length; i++)
  {
    if(boxes[i].active)
    {
      isAct = true;
      break;
    }
    else isAct=false;
  }

  if(to_draw){
  if(!isAct)
  {
    if(points.length == 3)
    {

      points.pop();
      points.pop();
      points.pop();
    }
    var x1 = mouseX;
    var y1 = mouseY;
    var test = [x1, y1];
    points.push(test);
  }
}
  return false;
}

function mouseDragged() {
  if (boxes.length > 0) {
    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].active) {
        boxes[i].x = mouseX;
        boxes[i].y = mouseY;
        break;
      }
    }
  }
  return false;
}
var path=false;
function pathfound(){
  path =! path;
}
function pressed(){
  pathfound();
  var text="";
  if(path){
    text="Found";
    path_text.position(Calculate.x+4,Calculate.y+15);
    path_text.style('color', 'green');


  }
  else {
    text="Not Found";
    path_text.position(Calculate.x-11,Calculate.y+15);
    path_text.style('color', 'red');

  }
  path_text.html(text);
  console.log("pressed");
}

function drawPath() {
  
  if (points.length == 3) {

    startx = points[1][0];
    starty = points[1][1];
    stopx = points[2][0];
    stopy = points[2][1];

    if (startx > stopx) {
      startx = points[2][0];
      starty = points[2][1];
      stopx = points[1][0];
      stopy = points[1][1];
    }

    cells = cellDecomp();

    var start_cell = findCell(cells, startx, starty);
    var end_cell = findCell(cells, stopx, stopy);
  
    path = null;
    if (start_cell != null && end_cell != null)
      path = getPath(start_cell, end_cell, cells);
  
    if (path) {
      push();
      stroke(255);
      for (var i = 0; i < path.length; i++) {
        if (path[i] == start_cell) {
          line(startx, starty, cells[path[i+1]].left, 0.5*(cells[path[i+1]].top + cells[path[i+1]].bottom));
        }
        else if (path[i] == end_cell) {
          line(cells[path[i]].left, 0.5*(cells[path[i]].top + cells[path[i]].bottom), stopx, stopy);
        }
        else {
  
          line(cells[path[i]].left, 0.5*(cells[path[i]].top + cells[path[i]].bottom), 
            cells[path[i]].right, 0.5*(cells[path[i]].top + cells[path[i]].bottom));
  
          line(cells[path[i]].right, 0.5*(cells[path[i]].top + cells[path[i]].bottom), 
            cells[path[i+1]].left, 0.5*(cells[path[i+1]].top + cells[path[i+1]].bottom));
        }
      }
      pop();
      path = path;
    }
  }

  
  // else alert('Path Not Found');
}

function getPath(start, stop, cells) {
  graph = createGraph(cells);

  var visited = [];


  var stack = [];
  stack.push(start);

  while(!stack.empty) {
    var root = stack.pop();
    if (!visited.includes(root)) {
      visited.push(root);
      graph[root].edges.forEach(edge => stack.push(edge));
    }
    if (root == stop)
      return visited;
  }
  return null;

}

function findCell(cells, x, y) {
  for (var i = 0; i < cells.length; i++) {
    cell = cells[i];
    if (x <= cell.right && x >= cell.left && y <= cell.top && y >= cell.bottom)
      return i;
  }
  return null;
}

function createGraph(cells) {
  nodes = []
  for (var i = 0; i < cells.length; i++) {
    node = {}
    edges = []
    node.index = i;

    for (var j = 0; j < cells.length; j++) {
      if (i == j) continue;
      if (cells[i].right == cells[j].left) {
        if (cells[j].top <= cells[i].top && cells[j].top >= cells[i].bottom)
          edges.push(j);
        else if (cells[j].bottom >= cells[i].top && cells[j].bottom <= cells[i].top)
          edges.push(j);
        else if (cells[i].top <= cells[j].top && cells[i].top >= cells[j].bottom)
          edges.push(j);
        else if (cells[i].bottom >= cells[j].top && cells[i].bottom <= cells[j].top)
          edges.push(j);
      }
      else if (cells[i].left == cells[j].right) {
        if (cells[j].top <= cells[i].top && cells[j].top >= cells[i].bottom)
          edges.push(j);
        else if (cells[j].bottom >= cells[i].top && cells[j].bottom <= cells[i].top)
          edges.push(j);
        else if (cells[i].top <= cells[j].top && cells[i].top >= cells[j].bottom)
          edges.push(j);
        else if (cells[i].bottom >= cells[j].top && cells[i].bottom <= cells[j].top)
          edges.push(j);
      }  
    }
    node.edges = edges;
    nodes.push(node);
  }

  return nodes;
}

function cellDecomp() {

  boxes.forEach(box => {
    box.left = round(box.x - 0.5*box.w);
    box.right = round(box.x + 0.5*box.w);
    box.top = round(box.y + 0.5*box.l);
    box.bottom = round(box.y - 0.5*box.l);
  });

  var edges = []
  for (var i = 0; i < boxes.length; i++) {
    box = boxes[i];

    // Left edge
    edge = {};
    edge.x = box.left;
    edge.top = box.top;
    edge.bottom = box.bottom;
    edge.index = i;
    edges.push(edge);

    // Right edge
    edge = {};
    edge.x = box.right;
    edge.top = box.top;
    edge.bottom = box.bottom;
    edge.index = i;
    edges.push(edge);
  }

  leftBound = {}
  leftBound.x = 0;
  leftBound.top = 500;
  leftBound.bottom = 0;
  edges.push(leftBound);

  rightBound = {}
  rightBound.x = 500;
  rightBound.top = 500;
  rightBound.bottom = 0;
  edges.push(rightBound);

  edges.sort(function(a,b) {return a.x - b.x});

  // print(edges);

  cells = []
  for (var i = 0; i < edges.length - 1; i++){
    left = edges[i].x;
    right = edges[i+1].x

    collisions1 = checkCollisions(right, edges[i+1].index);
    collisions2 = checkCollisions(left, edges[i].index);

    if (collisions1.length > collisions2.length)
      collisions = collisions1;
    else
      collisions = collisions2;

    //case 1: no blockage
    if (collisions.length == 0) {
      if (edges[i].index == edges[i+1].index) {
        cell = {};
        cell.left = left;
        cell.right = right;
        cell.bottom = edges[i].top;
        cell.top = 500;
        if (cell.top <= 500 && cell.bottom >= 0 && cell.top > cell.bottom)
          cells.push(cell);

        cell = {};
        cell.left = left;
        cell.right = right;
        cell.bottom = 0;
        cell.top = edges[i].bottom;
        if (cell.top <= 500 && cell.bottom >= 0 && cell.top > cell.bottom)
          cells.push(cell);
      }
      else {
        cell = {};
        cell.left = left;
        cell.right = right;
        cell.bottom = 0;
        cell.top = 500;
        if (cell.top <= 500 && cell.bottom >= 0 && cell.top > cell.bottom)
          cells.push(cell);
      }
    }

    if (collisions.length == 1) {
      // edge is below collision box
      if (edges[i].top < boxes[collisions[0]].bottom) {
        cell = {}
        cell.left = left;
        cell.right = right;
        cell.bottom = 0;
        cell.top = edges[i].bottom;
        if (cell.top <= 500 && cell.bottom >= 0 && cell.top > cell.bottom)
          cells.push(cell);

        cell = {}
        cell.left = left;
        cell.right = right;
        cell.bottom = edges[i].top;
        cell.top = boxes[collisions[0]].bottom;
        if (cell.top <= 500 && cell.bottom >= 0 && cell.top > cell.bottom)
          cells.push(cell);

        cell = {}
        cell.left = left;
        cell.right = right;
        cell.bottom = boxes[collisions[0]].top;
        cell.top = 500;
        if (cell.top <= 500 && cell.bottom >= 0 && cell.top > cell.bottom)
          cells.push(cell);
      }

      // edge is above collision box
      else {
        cell = {}
        cell.left = left;
        cell.right = right;
        cell.bottom = 0;
        cell.top = boxes[collisions[0]].bottom;
        if (cell.top <= 500 && cell.bottom >= 0 && cell.top > cell.bottom)
          cells.push(cell);

        cell = {}
        cell.left = left;
        cell.right = right;
        cell.bottom = boxes[collisions[0]].top;
        cell.top = edges[i].bottom;
        if (cell.top <= 500 && cell.bottom >= 0 && cell.top > cell.bottom)
          cells.push(cell);

        cell = {}
        cell.left = left;
        cell.right = right;
        cell.bottom = edges[i].top;
        cell.top = 500;
        if (cell.top <= 500 && cell.bottom >= 0 && cell.top > cell.bottom)
          cells.push(cell);
      } 
    }
  }

  cells = cells;
  return cells;
}

// returns index(es) of block(s) that intersect an edge
function checkCollisions(x, index) {

  blockIndexes = [];
  if (index) {
    for (var i = 0; i < boxes.length; i++) {
      if(i == index) continue;
  
      else{
        if (x < boxes[i].right && x > boxes[i].left)
          blockIndexes.push(i);
      }
    }
  }
  // print(blockIndexes);
  return blockIndexes;
}