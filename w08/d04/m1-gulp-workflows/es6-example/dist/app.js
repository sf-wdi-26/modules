"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// define an ES6 class called Person

var Person = function () {
  // define the method to run for each instantiation

  function Person(name, age) {
    var type = arguments.length <= 2 || arguments[2] === undefined ? "person" : arguments[2];

    _classCallCheck(this, Person);

    this.name = name;
    this.age = age;
    this.type = type;
  }
  // define a greet method


  _createClass(Person, [{
    key: "greet",
    value: function greet() {
      return "Hi I'm " + this.name + "!";
    }
  }]);

  return Person;
}();

// export the Person class


module.exports = Person;