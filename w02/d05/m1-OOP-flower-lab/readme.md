#OOP Lab: Flower Power!

| Objectives |
| :--- |
| Impliment OOP patterns |
| Create constructor objects |
| Define prototype methods for shared behavior |

We have a fully functioning Flower object that we can use to create flowers. Take a moment to digest this code.

```javascript
//define the flower constructor
function Flower(color, petals, smellsPretty) {
    // define attributes we will set when a flower is initialized
    this.color = color;
    this.petals = petals;
    this.smellsPretty= smellsPretty;
}

//define shared methods among all flower instances
Flower.prototype = {
  sniff: function sniff() {
        console.log("Sniff Sniff Sniff!");
  },
  smellsGood: function smellsGood(answer) {
      if (answer) {
        return 'This flower smells amazing!';
      } else {
        return 'What a noxious weed!';
      }
  },
  describe: function describe(answer) {
    alert("This flower is " + this.color + ".")
  },
  compare: function compare(otherFlower) {
      return("My " + this.color + " flower is much prettier than your " +
        otherFlower.color + " flower :P");
  },
  render: function render() {
    var flower = document.createElement('p');
    flower.textContent =
      "My pretty flower is "
      + this.color
      + " and has "
      + this.petals
      + " pristine petals";
    document.querySelector("body").appendChild(flower);
  }
}
```

Let's start instantiating some flowers!


```javascript
//initialize some flower instances
var chrysanthemum = new Flower("pink", 65, false);
var rose = new Flower("red", 32, true);
var lily = new Flower("yellow", 6, true);
```

These objects still have all of the methods and abilities of the previous objects we
made.  The main difference is that they can be customized with specific properties
at the time of object instantiation.

###Group Exercise
Create a new Flower instance.  Decide with your table-mates the type of flower, the flower's main color, number of petals, and whether or not it smells pretty. Feel free to think up some other possible properties.  Properties are great!


Now we should have at least six individual and unique flowers we can use. Lets find the best new properties and integrate them into our class-wide flower.

###Cross-Pollination Challenge

Now that we are awesome flower experts, lets try our hand at cross-pollinating two flowers to create an entirely new flower!  

- Create a method called `crossPollinate` that all flowers share. The method should:
    - Take another flower object as a parameter.
    - Return a new flower that has:
        - a mix of both 'parent' colors. (i.e. red, yellow = "red-yellow") We don't care about the color wheel. 
        - a new petal count, which is an average between the two parents' petal counts.
        - a `smellPretty` attribute that is `true` only IF both flowers smell pretty (smellPretty "gene" is recessive unfortunately).  

*Thought experiment: Could we create an intermediary object, maybe called Bee, that could facilitate cross-pollination and return a new flower? Flowers don't just bash their heads together and make new flowers in the real world!  They need bees!  What are some methods we could assign to a Bee object?*

###More Challenges
- Create a `sheLovesMe()` on a flower that decrements each flower by one petal. :(
- Create a `water()` on a flower that increments each flower by one petal. :)  
- Create a `Vase` constructor will contain an array of flowers
    - create a prototype method: `placeFlower()` that accepts a flower object as a parameter and inserts the flower into an array that it contains.
    - create another prototype method: `displayFlowers()` that returns the flowers a vase contains.
