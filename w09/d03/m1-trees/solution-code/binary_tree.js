// Binary Tree Constructor
function BinTree(value){
  this.left = null;
  this.right = null;
  this.value = value;
};


BinTree.prototype.max = function() {
  if (this.right !== null) {
    // recursive condition
    return this.right.max();
  } else {
    // terminal condition
    return this.value;
  }
};

BinTree.prototype.insert = function(newVal) {
  if (newVal <= this.value) { // insert to the left if less
    if (this.left === null) {
      // terminal condition
      this.left = new BinTree(newVal); // note: trees can contain trees
    } else {
      // recursive condition
      this.left.insert(newVal);
    }
  } else { // insert to the right if greater
    //
    if (this.right === null) {
      this.right = new BinTree(newVal);
    } else {
      this.right.insert(newVal);
    }
  }
  return this;
};

BinTree.prototype.search = function(val) {
  if (this.value === val) {
    return true;
  } else if (this.value > val && this.left){
    return this.left.search(val);
  } else if (this.value < val && this.right) {
    return this.right.search(val);
  }
  return false;
};

module.exports = BinTree;
