window.onload = function(){

      var button = document.getElementById("button-yellow");

      button.addEventListener("click", function(event){
        prompt('What is your email?');
        button.innerHTML = "Thanks for your email!"
      });
    }
