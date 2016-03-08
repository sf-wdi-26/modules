module.exports = {
  add: function( addend1, addend2 ){
    return ( addend1 + addend2 );
  },

  subtract: function( minuend, subtrahend ){
    return ( minuend - subtrahend );
  },

  multiply: function( multiplicand, multiplier ){
    return ( multiplicand * multiplier );
  },

  divide: function( dividend, divisor ){
    return ( dividend / divisor );
  },

  square: function( value ){
    return ( value * value );
  },

  exponential: function( base, power ){
    return Math.pow( base, power );
  },

  isGreaterThan: function( val1, val2 ){
    if( val1 > val2 ){
      return val1;
    } else
      return val2;
    }
  },

  isNegative: function( val ){
    if( val < 0 ){
      return true;
    } else if ( val > 0 ){
      return false;
    } else {
      return 0;
    }
  }
}
