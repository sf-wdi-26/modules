#Object Oriented Programming

| Objectives |
| :--- |
| Build practical and useful objects using Javascript constructors |
| Demonstrate a working knowledge of  object properties and methods  |
| Convert previous projects to utilize Object Oriented Programming techniques |

## What is an Object?

As of today, we have been writing our Javascript code mainly using only functions, Strings, ints, and Arrays.   This has allowed us to parse through data objects given to us, reach out and pull data from the internet, and even make a pretty neat racing game!  These are all great accomplishments, but like everything else in the world of programming, there is always a more efficient way of implementing what we have done.

Here's a truncated version of the data we have been using for our gitHub user website drill.  Take some time to study the structure and the data types within the data object.

```javascript
var data = {
    school: "General Assembly",
    city: "San Francisco",
    course: "Web Development Immersive",
    course_id: "WDI21",
    classrootm: "6",
    students: [{
        id: 0,
        last_name: "Farquhar",
        first_name: "Bradley",
        github_username: "farquhar86"
    }, {
        id: 1,
        last_name: "Preys",
        first_name: "Daniel",
        github_username: "danielpreys"
    }, {
        id: 2,
        last_name: "Monaghan",
        first_name: "Darragh",
        github_username: "darraghmonaghan"
    }]
}


```

-  Based on our experience in class so far and your familiarity with the above object, consider the following as you read further:
    - How many of the properties in `data` are Strings? 
    - How many of the properties are Arrays?
    - If there is an array, what is the array data type?

The `data` object is a grouping of key & value pairs (known as properties) that describe our class, WDI21.  
  
```javascript 
school: "General Assembly"
```
In the line above, `school` is the **key** and `"General Assembly"` is the **value**.
 
To access this property, we can use dot-notation or bracket-notation on the key to have the corresponding value returned.
 
 ```javascript
 var GA = data.school //General Assembly
 ```
 
`GA` has the value `General Assembly`.  
 
To access an array within an object,  the method is similar to accessing any other property.  The property `students` is an array of Objects.  To access that array and assign it to a variable, we simply perform the following:
 
 ```javascript
 var studentArray = data.students //students
 ```
The `data.students` array is now accessible  by using `studentArray` instead.
Declaring variables and defining them as portions of a larger object helps us create readable and followable code.  

*We can assume that an Object is a collection of properties (key & value pairs) that all have some sort of relationship and are connected logically to one another.*  

###Quick Challenge
- Make a copy of `data.js` and rename it to `enhancedData.js`
- Add some properties that logically fit into an object describing our class (address, floor number, and a list of instructors.
- Try to access your new data properties from the console to make sure they work.

If everything worked out, you should have a fully functioning data object, only now with even MORE properties with us to play with!  


##Creating an object
For relatively straightforward and small objects, it is perfectly fine to declare them as a variable and define them, as we did with `data.js` and `enhancedData.js`.  This is known as a *Literal* object definition.  
Here. I'll make you a flower using the *Literal* method:

```javascript
// Literal Object Definition
var flower = {
    color : "red",
    petals : 32,
    smellsPretty : true
}
``` 

 Now let me make you a flower using the preferred *Constructor* method:
 
 ```javascript
 // Constructor Object Definition
 function Flower(){
    this.color = "red";
    this.petals = 32;
    this.smellsPretty= true;
 }
 ```

The Literal definition of an object creates one single objected called flower.  There are no other flowers, just that one single object we created.  The constructor method is actually a function that creates a unique object every time it is called.  Below we will create a new variable `rose` that will use the constructor method to create a new object.

```javascript
var rose = new Flower();
```

Let us break down a couple concepts introduced with this new line of code:
- The capitalization of `Flower` lets everyone know that `Flower` is an object constructor.  Calling `Flower()` will return a `Flower` object.
- The `new`before our function call lets javascript know that we are creating a new object that will be independent of any other object.
- We call the flower function, which creates an object with the three pre-defined properties already made.  Our object is ready to go!

<img src = http://www.mzephotos.com/wallpapers/roses/red-rose-1024x768.jpg width = 75%>

Accessing the properties of our new `rose` object is the same as accessing our properties from data: we use dot or bracket notation.

```javascript
var color = rose.color // red
var petalCount = rose.petals // 32
var smellsNice = rose.smellsPretty //true
```

If we wanted to create yet ANOTHER flower, all we have to do is call our function just like we did above.  This time, lets make an object called `lily`.

```javascript
var lily = new Flower();
```

We can access the properties of `lily` in the same manner as we did with `rose`.

```javascript
var color = lily.color // red
var petalCount = lily.petals // 32
var smellsNice = lily.smellsPretty //true
```

##Changing an Object's properties
I don't know about you, but I generally like my Lillies yellow. I have also never heard of a lily with 32 petals, holy smokes!  Can we change our `lily` object to better reflect my perfect lily? You bet!

```javascript
// Changing object property values
lily.color = 'yellow';
lily.petals = 6;
```

That's more like it!  To change the value of the lily object properties. we simply access them with dot or bracket notation.  We then follow with an equals and a new appropriate value.  Couldn't be easier!

<img src = https://seniorhikerphotos.files.wordpress.com/2012/06/lilysarina12052301.jpg width = 75%>

We'll get more practice on this subject and defining prototype methods tomorrow!

Further Suggested Reading:
- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)
- [Tutsplus](http://code.tutsplus.com/tutorials/the-basics-of-object-oriented-javascript--net-7670)
