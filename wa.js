// Jim Henris 12/22/18
//import regression from 'regression';

class Dot{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

class Column{
  constructor(){
    this.dots = new Array();
    this.coefficients = new Array();
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
/*
function createRow(Columns[]){
  for(var i = 0; i < Columns.length(); i++){
    var points = [];
    for(var j = 0; j < Columns[i].dots.length(); j++){
      points.push([Columns[i].dots[j].getY(), Columns[i].dots[j].getX()]);
    }
    Columns[i].coefficients = regression.polynomial(points, {order: 3});

    int y = Columns[i].dots[dots.length()-1].getY() + 30;
    int x = Columns[i].coefficients[0]*Math.pow(y, 3)
    + Columns[i].coefficients[1]*Math.pow(y, 2)
    + Columns[i].coefficients[2]*y + Columns[i].coefficients[3];

    Columns[i].dots.push(Dot(x,y));
  }
}
function fixRow(Columns[]){

}
*/
var Columns = new Array();
for(var i = 0; i < 10; i++){
  var add = new Column;
  Columns.push(add);
}
firstThreeRows(Columns);

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
