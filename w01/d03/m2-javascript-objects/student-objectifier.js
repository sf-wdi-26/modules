var studentArray = ["Anna", "Jasmine", "Derek", "Jehnean", "Luca", "Brian", "Josh", "Jessica", "Nick", "Al", "Michael", "Caleb", "Daniel", "Leslie", "Tashi", "Dan", "Lena", "Will", "Ivan", "Annabelle", "Christina", "Vien", "Katie", "Franchini", "Louis", "Cindy", "Matt", "Rider", "Nidhi", "Monq"];

var studentHobbyArray = ["reading", "social media", "wrenching", "snow boarding", "soccer", "photography", "YouTube", "Netflix", "when teachers compose music for class", "Basketball", "Aikido", "Tennis", "Ice cream", "Cooking", "volleyball", "bagpipe", "beach volleyball", "pizza", "listening to music", "podcasts", "yoga", "driving", "gaming", "dancing", "hiking", "swimming", "camping", "Destiny", "board games", "learning"];

var myStudentObjectArray = [];

// this is not a smart way to code, but here you go:
var studentObjectifier = function(studentArray, studentHobbyArray){
    for (var i = 0; i < studentArray.length; i++){
        var myStudentObject = {};
        myStudentObject.id = i+1;
        myStudentObject.name = studentArray[i];
        myStudentObject.hobby = studentHobbyArray[i];
        myStudentObjectArray.push(myStudentObject);
    }
    console.log(myStudentObjectArray);
};

// you can call the function like so:
// studentObjectifier(studentArray, studentHobbyArray);

// later that day...

var myStudentObjectArray = [ 
    { id: 1, name: 'Anna', hobbies: [ 'reading', 'running' ]},
    { id: 2, name: 'Jasmine', hobbies: [ 'social media', 'working', 'coding' ]},
    { id: 3, name: 'Derek', hobbies: [ 'wrenching', 'yoga' ]},
    { id: 4, name: 'Jehnean', hobbies: [ 'snow boarding', 'drawing' ]},
    { id: 5, name: 'Luca', hobbies: [ 'soccer','photography' ]},
    { id: 6, name: 'Brian', hobbies: [ 'photography', 'running my dog' ]},
    { id: 7, name: 'Josh', hobbies: [ 'YouTube', 'eating all the foods' ]},
    { id: 8, name: 'Jessica', hobbies: [ 'Netflix', 'bleu cheese' ]},
    { id: 9,
    name: 'Nick',
    hobbies: [ 'when teachers compose music for class', 'jiujitsu' ]},
    { id: 10, name: 'Al', hobbies: [ 'Basketball', 'Clash of Klans' ]},
    { id: 11, name: 'Michael', hobbies: [ 'Aikido', 'improv' ]},
    { id: 12, name: 'Caleb', hobbies: [ 'Tennis', 'sleeping' ]},
    { id: 13, name: 'Daniel', hobbies: [ 'Ice cream', 'snowboarding' ]},
    { id: 14, name: 'Leslie', hobbies: [ 'Cooking', 'kayaking' ]},
    { id: 15, name: 'Tashi', hobbies: [ 'volleyball', 'crossfit' ]},
    { id: 16, name: 'Dan', hobbies: [ 'bagpipe', 'board games' ]},
    { id: 17, name: 'Lena', hobbies: [ 'beach volleyball', 'chocolate' ]},
    { id: 18, name: 'Will', hobbies: [ 'pizza', 'surfing' ]},
    { id: 19, name: 'Ivan', hobbies: [ 'listening to music', 'scuba' ]},
    { id: 20, name: 'Annabelle', hobbies: [ 'podcasts', 'TV' ]},
    { id: 21, name: 'Christina', hobbies: [ 'yoga', 'chocolate' ]},
    { id: 22, name: 'Vien', hobbies: [ 'driving', 'reading' ]},
    { id: 23, name: 'Katie', hobbies: [ 'gaming', 'baking' ]},
    { id: 24, name: 'Franchini', hobbies: [ 'dancing', 'working out' ]},
    { id: 25, name: 'Louis', hobbies: [ 'hiking', 'snapchat' ]},
    { id: 26, name: 'Cindy', hobbies: [ 'swimming', 'boxing' ]},
    { id: 27, name: 'Matt', hobbies: [ 'camping', 'bourbon' ]},
    { id: 28, name: 'Rider', hobbies: [ 'Destiny', 'drawing', 'board sports' ]},
    { id: 29, name: 'Nidhi', hobbies: [ 'board games', 'ukulele' ]},
    { id: 30, name: 'Monq', hobbies: [ 'learning', 'DJing' ]} 
  ];
  


for (var i = 0; i < myStudentObjectArray.length; i++) { 
        console.log("Hi, my name is " + myStudentObjectArray[i].name + ".");
        var temp = myStudentObjectArray[i]["hobbies"];
        for (var j = 0; j < temp.length; j++) {
            if(j != temp.length-1){
                console.log(" I like " + temp[j] + ", ");
            } else {
                console.log(" and I love " + temp[j] + "!");
            }
        }
}






