# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Boris and Natasha

#### Warm-up:  Auth

[Consider this challenge](http://www.jwstelly.org/BrainTeaser/Problem.php?id=14)

Two students will be given a lockbox, some candy and a few special instructions.

The class will attempt to determine the combinations.

Student 1 will be given a string length and the combination to one lock. Student 1 sends request with "Put the candy in the box and lock it", along with public key on the outside.

The class can attempt the password.

Student 2 does not know student 1's combination, but she will know the string length and the combination to the second lock. She will unlock the box, place the candy in the box, and then return the box to Student 1, via another classmate.

All students now know both public keys and the class can make several more attempts at figuring out the combinations.

Did the class figure it out? Did they get close?

Student 1 represents the user
Student 2 represents the server

How would we change the math to make this more realistic?

What is the 3 mod 17 function?

Eat candy and discuss.

