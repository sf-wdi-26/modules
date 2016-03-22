var LONGEST_METHOD_NAME = 'delete'

// from underscore.string#strRepeat
var strRepeat = function(str, qty) {
  if (qty < 1) return ''
  var result = ''
  while (qty > 0) {
    if (qty & 1) result += str
    qty >>= 1, str += str
  }
  return result
}

// from underscore.string#pad
var rpad = function (str, length, padStr) {
  str = str == null ? '' : String(str)
  length = ~~length

  if (!padStr)
    padStr = ' '
  else if (padStr.length > 1)
    padStr = padStr.charAt(0)

  var padlen = length - str.length
  return str + strRepeat(padStr, padlen)
}

var formatMethod = function (method) {
  return rpad(method.toUpperCase(), LONGEST_METHOD_NAME.length + 1, ' ')
}

exports.method = formatMethod