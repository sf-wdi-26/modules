document.addEventListener('DOMContentLoaded', function() {
  var hamburger = document.querySelector('header nav > ul > li:nth-child(4) > ul > li:nth-child(1)');
  hamburger.addEventListener('click', function(e) {
    var navList = this.parentNode.getElementsByTagName('li');
    for (var i = 2; i < navList.length+1; i++){
       var tempSelectorString = 'header nav > ul > li:nth-child(4) > ul li:nth-child(' + i + ')';
       document.querySelector("" + tempSelectorString).classList.toggle('hidden');
       document.querySelector("" + tempSelectorString).classList.toggle('shown');
    }
  });  
});