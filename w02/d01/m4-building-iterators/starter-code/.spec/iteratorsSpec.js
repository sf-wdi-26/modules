describe("iterators", function() {
  var iterators = require("../iterators");
  describe("each", function(){
    it("should run each item in the list through the callback", function() {
      var fillMe = [];
      var pushIt = function(item) { fillMe.push(item); }
      //expect the array to be initially empty
      expect(fillMe).toEqual([]);
      //expect each to return undefined
      expect(iterators.each(["words", "are", "here"], pushIt)).not.toBeDefined();
      //expect the array to now be full
      expect(fillMe).toEqual(["words", "are", "here"]);
    });
  });
  describe("map", function(){
    it("should run each item in the list through the callback and return a new array with the results", function() {
      var plusOne = function(n){ return n + 1; }
      expect(iterators.map([1,2,3], plusOne)).toEqual([2,3,4]);
    });
  });
  describe("filter", function(){
    it("should run each item in the list through the callback and return a new array with the results that the callback returned `true` for", function() {
      var noOdds = function(n) { return n % 2 === 0; }
      expect(iterators.filter([2,3,4,5,6,8,7], noOdds)).toEqual([2,4,6,8]);
    });
  });
});


