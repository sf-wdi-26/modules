//where our iterators live
var o_o = {
  each: function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i]);
    }
  },
  map: function(list, callback){
    var output = [];
    for (var i = 0; i < list.length; i++) {
      output.push(callback(list[i]));
    }
    return output;
  },
  filter: function(list, callback) {
    var output = [];
    for (var i = 0; i < list.length; i++) {
      if (callback(list[i])) {
        output.push(list[i]);
      }
    }
    return output;
  }
};

//expose our iterators to other files
//such as our assertions
module.exports = o_o;
