// define an ES6 class called Person
class Person {
  // define the method to run for each instantiation
  constructor(name, age, type="person") {
    this.name = name
    this.age = age
    this.type = type
  }
  // define a greet method
  greet() {
    return `Hi I'm ${this.name}!`
  }
}

// export the Person class
module.exports = Person