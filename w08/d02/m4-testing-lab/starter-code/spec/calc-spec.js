var calculator = require( "../calc" );

//example test
describe( "addition", function() {
  it( "should add 2 and 2", function() {
    var sum = calculator.add( 2, 2 );
    expect( sum ).toBe( 4 );
  });
});

describe( "subtraction", function() {
  it( "should subtract 4 and 2", function() {
    var sum = calculator.subtract( 4, 2 );
    expect( sum ).toBe( 2 );
  });
});

describe( "multiplication", function() {
  it( "should multiply 2 and 2", function() {
    var product = calculator.multiply( 2, 2 );
    expect( product ).toBe( 4 );
  });
});

describe( "division", function() {
  it("should divide two numbers", function(){
    var quotient = calculator.divide(6, 3);
    expect(quotient).toBe(2);
  });
});

describe( "squaring", function() {
  it("should square two numbers", function(){
    var power = calculator.square(2);
    expect(power).toBe(4);
  });
});


describe( "exponential", function() {
  it("should raise one number to the power of another number", function(){
    var expone = calculator.exponential(2,2);
    expect(expone).toBe(4);
  });
});

describe( "isGreaterThan", function() {
  it("should check if one number is greater than another number", function(){
    var greater = calculator.isGreaterThan(6,2);
    expect(greater).toBe(6);
  });
});

describe( "isNegative", function() {
  it("should check if a number is negative", function(){
    var negative = calculator.isNegative(-6);
    expect(negative).toBe(true);
  });
});


