// Jim Henris 12/22/18

class Dot{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

class Column{
  constructor(){
    this.dots = new Array();
    this.coefficients = [1,1,1,1];
  }
}

function firstThreeRows(Columns){
  for (var i = 0; i < Columns.length; i++) {
    var x = 0;
    var y = 0;

    x = i*50 + (Math.random()*50 - 25);
    y = (Math.random()* 100 - 50);
    Columns[i].dots.push(new Dot(x,y));
  }
  for(var i = 0; i < 2; i++){
    for(var j = 0; j < Columns.length; j++){
      var x = 0;
      var y = 0;

      x = Columns[j].dots[i].x + (Math.random()*2 - 1);
      y = Columns[j].dots[i].y + 30;
      Columns[j].dots.push(new Dot(x,y));
    }
  }
}
function cubic(params, x){
  return params[0]*x*x*x + params[1]*x*x + params[2]*x + params[3];
}

function objective(params, pointsX, pointsY){
  var total = 0.0;
  for(var i = 0; i < pointsY.length; ++i){
    var resultThisDatum = cubic(params, pointsY[i]);
    var delta = resultThisDatum - pointsX[i];
    total += (delta*delta);
  }
  return total;
}

function curveFit(pointsX, pointsY, params){
  var minimiser = numeric.uncmin(objective(params, pointsX, pointsY), coefficients);
  return minimiser.solution();

}

function createRow(Columns){
  for(var i = 0; i < Columns.length; i++){
    var pointsX = new Array();
    var pointsY = new Array();
    for(var j = 0; j < Columns[i].dots.length; j++){
      pointsX.push(Columns[i].dots[j].x);
      pointsY.push(Columns[i].dots[j].y);
    }

    Columns[i].coefficients = curveFit(pointsX, pointsY, Columns[i].coefficients);

    var y = Columns[i].dots[dots.length()-1].y + 30;
    var x = cubic(Columns[i].coefficients, y);

    Columns[i].dots.push(Dot(x,y));
  }
}

var Columns = new Array();
for(var i = 0; i < 10; i++){
  var add = new Column;
  Columns.push(add);
}

firstThreeRows(Columns);
createRow(Columns)

var canvas = document.getElementById("mainCanvas");
var c = canvas.getContext('2d');

for(var i = 0; i < Columns[0].dots.length; i++){
  for(var j = 0; j < Columns.length-1; j++){
    c.beginPath();
    c.moveTo(Columns[j].dots[i].x, Columns[j].dots[i].y);
    c.lineTo(Columns[j+1].dots[i].x, Columns[j+1].dots[i].y);
    c.stroke();
  }
}
