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

      x = Columns[j].dots[i].x + (Math.random()*4 - 2);
      y = Columns[j].dots[i].y + 30;
      Columns[j].dots.push(new Dot(x,y));
    }
  }
}
function predict(params, x){
  return params[0]*x*x*x + params[1]*x*x + params[2]*x + params[3];

}
function createRow(Columns){
  for(var i = 0; i < Columns.length; i++){
    var pointsX = new Array();
    var pointsY = new Array();
    for(var j = 0; j < Columns[i].dots.length; j++){
      pointsX.push(Columns[i].dots[j].x);
      pointsY.push(Columns[i].dots[j].y / 250);
    }

    var cubic = function(params,x) {
      return params[0] * x*x*x +
      params[1] * x*x +
      params[2] * x +
      params[3];
    };

    var objective = function(params) {
      var total = 0.0;
      for(var i=0; i < pointsY.length; ++i) {
        var resultThisDatum = cubic(params, pointsY[i]);
        var delta = resultThisDatum - pointsX[i];
        total += (delta*delta);
      }
      return total;
    };

    var initial = Columns[i].coefficients;

    var minimiser = numeric.uncmin(objective, initial);

    Columns[i].coefficients = minimiser.solution;

    var y = Columns[i].dots[Columns[i].dots.length-1].y + 30;
    var newY = y/250;
    var x = predict(Columns[i].coefficients, newY);

    Columns[i].dots.push(new Dot(x,y));
  }
}

var Columns = new Array();
for(var i = 0; i < 10; i++){
  var add = new Column;
  Columns.push(add);
}

firstThreeRows(Columns);
for(var i = 0; i < 4; i++){
  createRow(Columns);
}

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
