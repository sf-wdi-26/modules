var calculator = require( "../calc" );

describe( "addition", function() {
  it( "should add 2 and 2", function() {
    var sum = calculator.add( 2, 2 );
    expect( sum ).toBe( 4 );
  });
});

describe( "subtraction", function() {
  it( "should subtract 3 from 5", function() {
    var difference = calculator.subtract( 5, 3 );
    expect( difference ).toBe( 2 );
  });
});

describe( "multiplication", function() {
  it( "should multiply 4 and 5", function() {
    var product = calculator.multiply( 4, 5 );
    expect( product ).toBe( 20 );
  });
});

describe( "division", function() {
  it( "should divide 30 by 6", function() {
    var quotient = calculator.divide( 30, 6 );
    expect( quotient ).toBe( 5 );
  });
});

describe( "square", function() {
  it( "should square 5", function() {
    var product = calculator.square( 5 );
    expect( product ).toBe( 25 );
  });
});

describe( "exponent", function() {
  it( "should raise 2 to the 3rd power", function() {
    var product = calculator.exponential( 2, 3 );
    expect( product ).toBe( 8 );
  });
});

describe( "is greater than", function() {
  it( "should return the larger of two arguments", function() {
    var value = calculator.isGreaterThan( 5, 17 );
    expect( value ).toBeGreaterThan( 5 );
  });
});

describe( "is negative", function() {
  it( "should return true if the argument is negative", function() {
    var value = calculator.isNegative( -2 );
    expect( value ).not.toBe( false );
  });
});
