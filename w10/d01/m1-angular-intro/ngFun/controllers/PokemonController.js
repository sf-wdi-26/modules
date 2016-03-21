app.controller('PokemonController', 
  ['$scope', '$http', function($scope, $http) {
  $scope.catchphrase = "gotta catch em all!";
  $scope.pokemon = [
    {
      Ndex: 25,
      name: 'Pikachu',
      type: 'Electric'
    },
    {
      Ndex: 10,
      name: 'Caterpie',
      type: 'Bug'
    },
    {
      Ndex: 39,
      name: 'Jigglypuff',
      type: 'Fairy'
    },
    {
      Ndex: 94,
       name: 'Gengar',
      type: 'Ghost'
    },
    {
      Ndex: 143,
      name: 'Snorlax',
      type: 'Normal'
    }
  ];

  // $scope.trainer = {name: "Ash"};

}]);
