angular.module('InfamousCriminals')
.controller('CriminalsController', CriminalsController);

CriminalsController.$inject = ['$http'];

function CriminalsController($http){
  var self = this;
  self.all = [];
  self.addCriminal = addCriminal;
  self.newCriminal = {};
  self.getCriminals = getCriminals;
  self.deleteCriminal = deleteCriminal;

  getCriminals();
  function getCriminals(){
    $http
      .get('http://localhost:3000/criminals')
      .then(function(response){
        self.all = response.data.criminals;
    });
  }

  function addCriminal(){
    $http
      .post('http://localhost:3000/criminals', self.newCriminal)
      .then(function(response){
        getCriminals();
    });
    self.newCriminal = {};
  }

  function deleteCriminal(criminal){
    $http
      .delete("http://localhost:3000/criminals/" + criminal._id)
      .then(function(response){
        var index = self.all.indexOf(criminal);
        self.all.splice(index, 1);
      });
  }

}