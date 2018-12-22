// Jim Henris 12/22/18
import regression from 'regression';

class Dot{
  var x;
  var y;
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
}

class Column{
  var dots = [];
  var coefficients = [];
}

function firstThreeRows(Columns[]){
  for (var i = 0; i < Column.length; i++) {
    int x = 0;
    int y = 0;

    x = j*100 + (Math.random()*100 - 50);
    y = (Math.random()* 200 - 100);
    Columns[i].dots.push(Dot(x,y));
  }
  for(var i = 0; i < 2; i++){
    for(var j = 0; j < Columns.length(); j++){
      int x = 0;
      int y = 0;

      x = Columns[j].dots[i].getX() + (Math.random()*2 - 1);
      y = Columns[j].dots[i].getY() + 30;
      Columns[j].dots.push(Dot(x,y));
    }
  }
}

function createRow(Columns[]){
  for(var i = 0; i < Columns.length(); i++){

    const data = ;
    Columns[i].coefficients = regression.polynomial(data, {order: 3});

    int y = Columns[i].dots[dots.length()-1].getY();
    int x = Columns[i].coefficients[0]*Math.pow(y, 3)
    + Columns[i].coefficients[1]*Math.pow(y, 2)
    + Columns[i].coefficients[2]*y + Columns[i].coefficients[3];

    Columns[i].dots.push(Dot(x,y));
  }
}

function fixRow(Columns[]){

}

function main(){
  var Columns = [];
  for(var i = 0; i < 10; i++){
    var add = new Column;
    Columns.push(add);
  }
  firstThreeRows(Columns);
  createRow(Columns);
}
