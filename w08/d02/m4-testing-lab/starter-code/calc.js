module.exports = {
  add: function(x,y) {
      return (x + y);
  },
  subtract: function(x,y){
    return x - y;
  },
  multiply: function(x,y){
    return x * y;
  },
  divide: function(x,y){
    return x/y;
  },
  square: function(x) {
    return (x*x);
  },
  exponential: function(x,y) {
    return Math.pow(x, y);
  },
  isGreaterThan: function(x, y) {
    return (x > y) ? x : y;
  },
  isNegative: function (x) {
    return (x > 0) ? false : true;
  }
}
