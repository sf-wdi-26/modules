module.exports = function Car () {
  this.color = "red";
  this.convertible = true;
  this.speed = 0;
  this.accelerate = function (x) {
    return this.speed += x;
  };
  this.decelerate = function (y) {
    return this.speed -= y;
  };
}

// var corvette = new Car();
// var honda = new Car();s
// corvette.accelerate(5);
// console.log(corvette);