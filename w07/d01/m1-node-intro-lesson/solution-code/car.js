var car = {
  color: 'red',
  convertible: true,
  speed: 0,
  accelerate: accelerate,
  decelerate: decelerate
}

function accelerate(mph){
  oldSpeed = this.speed;
  this.speed += mph;
  return "Speeding up! " + oldSpeed + " to " + this.speed + "mph!";
}

function decelerate(mph){
  oldSpeed = this.speed;
  this.speed -= mph;
  return "Slowing down! " + oldSpeed + " to " + this.speed + "mph!";
}

car.accelerate(60);
car.decelerate(30);

module.exports.car = car;
