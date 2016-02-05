function mergeSort(arr) {
  // if array is length is less than or equal to one, return it
  // exit condition
  if (arr.length <= 1) {
    return arr;
  }
  // figure out the middle point and round down if a fraction
  var middle = parseInt(arr.length / 2);

  // create an array of the left half
  var left = arr.slice(0, middle);

  // create an array of right half
  var right = arr.slice(middle, arr.length);

  // sort the left & right arrays and merge them back together
  // recursive condition
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  var result = [];

  // while both arrays have elements in them, zip them together
  while (left.length && right.length) {
    // if the left array first element is less than the right array first element, push to result
    if (left[0] <= right[0]) {
      result.push(left.shift());
    // else push the right array first element to result
    } else {
      result.push(right.shift());
    }
  }

  // if left is the only array with elements, push them all in
  while (left.length) {
    result.push(left.shift());
  // if right is the only array with elements, push them all in
  }
  while (right.length) {
    result.push(right.shift());
  }
  // return final result
  return result;
}
