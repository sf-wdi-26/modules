
# DOM Manipulation Lab

## Introduction

> ***Note:*** _This can be a pair programming activity or done independently._

In this lab, you are going to create a calculator with text inputs and buttons. You'll need to handle events and manipulate the DOM to show the result.

## Exercise

#### Requirements

You need to write JavaScript code for four different types of calculators:

- A basic calculator
- A trip cost calculator
- A BMI calculator
- A mortgage calculator


#### Formulae

The formula for the calculations are as follows:

* The basic calculator should just uses standard arithmetic to calculate the result.
* The trip cost calculator should let you calculate the cost of a trip, taking into account that:
  - when the speed is less than 60, the formula is `distance / mpg * cost`  
  - when the speed is more than 60, the formula is ``distance / (mpg - (speed - 60) * 2) * cost`
* The BMI calculator should compute a body mass index, with the formula `( Weight in Pounds / ( Height in inches x Height in inches ) ) x 703`
* The mortgage calculator formula should compute the monthly cost of a loan, with the formula `loan * apr * ((1+apr)^term) / (((1+apr)^term) - 1)`

When a user presses a "calculate button", the result should appear in the green div for the appropriate calculator section. The elements where the result should be displayed have an ID in the form `#XXX-answer`.

**Bonus:**

- Hide all the green boxes by default and show only one result at a time, i.e. if the user uses the basic calculator and a result is shown, then when another calculation is made with the trip calculator and the result is shown, the first answer should be automatically hidden.

- For the BMI calculator, add a choice to use metric or imperial. You'll notice that there is a section commented-out in the HTML that adds a select tag. You can uncomment this to allow the user to choose which measurement system should be used. Then, you'll need to use the right formula, depending on the user's choice. The formula for BMI using the metric system is: `( Weight in Kilograms / ( Height in Meters x Height in Meters ) )`

#### Starter code

The HTML is ready to go, and you shouldn't have to change anything in it. Just add a reference to your HTML to load `scripts/app.js`.

#### Deliverable

![Screenshot](http://s6.postimg.org/fgnh12ny9/Screen_Shot_2015_08_25_at_13_30_51.png)
