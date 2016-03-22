function findLargestPalindrome () {
	for (var i=99; i > 10; i--) {
		for (var j=99; j>10; j--) {
			var product = i * j;
			var reverseProduct = parseInt(product.split("").reverse().join(""))
			// productArray.push(product);
			if (product === reverseProduct) {
				return product;
			}
		}
	}
}	