var BinTree = require("../binary_tree.js")

describe("BinTree", function(){

  describe("hasOwnProperty", function(){
    var binTree = new BinTree();
    it("value", function(){
      expect(binTree.hasOwnProperty("value")).toBe(true);
    });

    it("left", function(){
      expect(binTree.hasOwnProperty("left")).toBe(true);
    });

    it("right", function(){
      expect(binTree.hasOwnProperty("right")).toBe(true);
    })
  });

  describe("has constructor defaults", function(){
    var binTree = new BinTree();

    it("set left to null", function(){
      expect(binTree.left).toBe(null);
    });

    it("set right to null", function(){
      expect(binTree.right).toBe(null);
    })
  });

  describe("prototype has method", function(){
    var proto = BinTree.prototype;

    it("#insert", function(){
      expect(proto.hasOwnProperty("insert")).toBe(true);
    });

    it("#search", function(){
      expect(proto.hasOwnProperty("search")).toBe(true);
    });

    it("#max", function(){
      expect(proto.hasOwnProperty("max")).toBe(true);
    });

  });

  describe("#insert", function(){
    var binTree

    beforeEach(function(){
      binTree = new BinTree(5);
    });

    it("should add BinTree to this.left for newValue less than this.value",function(){
      binTree.insert(4);
      expect(binTree.left).not.toBe(null);
      expect(binTree.left.value).toEqual(4);
    });

    it("should add BinTree to this.right for newValue greater than this.value",function(){
      binTree.insert(6);
      expect(binTree.right).not.toBe(null);
      expect(binTree.right.value).toEqual(6);
    });

    it("should return this", function(){
      expect(binTree.insert(2)).toBe(binTree);
    });

  });

  describe("#search", function(){
    var binTree = new BinTree(5);
    binTree.insert(3)
        .insert(1).insert(2).insert(6)
        .insert(7).insert(8).insert(9);
    it("should find a value in binTree with many values", function(){
      expect(binTree.search(5)).toBe(true);
      expect(binTree.search(1)).toBe(true);
      expect(binTree.search(2)).toBe(true);
      expect(binTree.search(8)).toBe(true);
      expect(binTree.search(9)).toBe(true);
    });
    it("should return true or false", function(){
      expect(typeof(binTree.search(8))).toBe("boolean");
      expect(typeof(binTree.search(20))).toBe("boolean");
    });
  });

  describe("#max", function(){
    var binTree;

    beforeEach(function(){
      binTree = new BinTree(5);
    });

    it("should find max in a tree with many values", function(){
      binTree.insert(3)
        .insert(1).insert(2).insert(6)
        .insert(7).insert(8).insert(9);
      expect(binTree.max()).toBe(9);
    });

    it("should return this.value when this.right is null", function(){
      expect(binTree.max()).toBe(binTree.value);
    });

  });

})
