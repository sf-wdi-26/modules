# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> An Intro to Auth and Modular Arithmetic

#### Warm-up:  Auth
Today we're going to enact a metaphor for auth inspired by [The Russian Postal Problem](http://www.jwstelly.org/BrainTeaser/Problem.php?id=14)

In our version of the story, Alice (played by a student) has a bunch of candy. Bob (played by a different student) wants Alice to send him some candy without sharing with the rest of the class. Bob has a lock box and a combination lock with a given combination, say 240. Alice has another lock with a given combination, say 512. (Alice does not know Bob's combo, and vice-versa.)

Before the exercise begins, the students playing Bob and Alice must also agree upon a shared secret--a simple mathematical formula or algorithm to decrypt each others' combinations. Instuctors may bring a clock with a given circumference and a string of a given length, but it is not necessary. Our student volunteers could wrap the string around the clock a number of times to determine a multiplier. If the multiplier is 16, Bob will send a public key of 15 and Alice will know that Bob's combo is 15 * 16, or 240.

This is an incredibly simple algorithm, but that's what makes it fun as an in-class activity. _(If the algorithm is more complex, it will be exponentially more difficult for the class to unlock the box, which makes the exercise kind of pointless.)_

Bob sends his request inside the locked box, with public key written on a Post-It on the outside. Bob must pass the box around the class before it gets to Alice. The class can hypothesize and guess different combinations, as many times as the instructor allows. (You might limit it to 3 - 10 attempts, or let the students self-regulate.) Before they begin, you can identify a few points to get them on the right track. (For example, this is a 3-digit combo, so don't do math with very large numbers, negative numbers or decimals.)

Alice will be able to unlock the box, put in the candy and then return it to Bob with her secret key (in this example, 32). Now the class has both public keys and the class can make several more attempts at figuring out the combinations. If it makes it back to Bob, he will be able to unlock both locks.

Whatever happens in class, unlock the box and share the candy.

#### Eat Candy and Discuss:

* Did the class figure it out? Did they get close?
* How would we change the math to make this more realistic?
* What is modular math and how does it work?
* How does bcrypt use modular math?

[Here is a good explanation](https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/what-is-modular-arithmetic)

13/5 = 2 R 3

13 mod 5= 3

* Applied to our story:

If the passwords are 256 and 326:

256 / 7 = 36 R 4; *256 mod 7 = 4*

326 / 7 = 46 R 4; *326 mod 7 = 4*

We can use the formula *x mod 7 = 4* where x is determined by another simple algorithm. For example, x = combo * 5. Bob would send a public key of 1280 (which is 256 * 5) and Alice would return a public key of 1630 (which is 326 * 5).

If the passwords are 243 and 733:

3^5 = 243 / 7 = 34 R 5

3^6 = 729 / 7 = 104 R 1

3^6 = 729

729 + 4 =  733 

733 / 7 = 104 R 5

Now the algorithm is *3^n mod 7 = 5*. Alice could send the secret key of 5. Bob could return the secret key of 6. We know we must adjust 729 to 733 in order to get the proper remainder.

