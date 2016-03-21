angular.module('ThePresidentsApp', [])
  .controller('PresidentsController', PresidentsController);

function PresidentsController(){
  this.all = [
    {name: 'George Washington', start: 1789, end: 1797 },
    {name: 'John Adams', start: 1797, end: 1801 },
    {name: 'Thomas Jefferson', start: 1801, end: 1809 },
    {name: 'James Madison', start: 1809, end: 1817 }
  ]
  this.addPresident = addPresident;
  this.newPresident = {};

  function addPresident(){
    this.all.push(this.newPresident);
    this.newPresident = {};
  }
}
