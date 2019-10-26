/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1.    Window/Global Binding: In global context, 'this' keyword becomes 'window' object of Javascript. 
        Window object is everything that is Javascript that is built in our browser.

* 2.    Implicit Binding: When we call a function of an object, we call it as 'myObject.myFunction()'
        In this context, 'this' refers to whatever object is on the left side of the dot.

* 3.    New Binding: We create a constructor function that we use to create objects.
        Then we create calling the constructor function with the 'new' keyword.
        In this case, 'this' refers to the newly created object with the 'new' keyword.

* 4.    Explicit Binding: We call our function but we pass a new context (an Object) into either
        .call or .apply method. In this example, 'this' refers to whatever object we pass 
        into the .call or .apply method.

*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding

function whereAmI() {
  console.log(`I am at ${this.location.host}.`);
  console.log(`Today is ${this.Date()}.`);
}
whereAmI();
// Here 'this' keyword refers to the global object that is 'window'.

// Principle 2

// code example for Implicit Binding

const book = {
  title: "Alchemist",
  author: "Paulo Coelho",
  speak: function() {
    console.log(`${this.title} is one of the classics by ${this.author}`);
  }
};

book.speak();
// In this example, this keyword in speak function refers to the book object.

// Principle 3

// code example for New Binding

function Book(object) {
  this.title = object.title;
  this.author = object.author;
  this.speak = function() {
    console.log(`${this.title} is one of the classics by ${this.author}`);
  };
}

const theFortyRulesOfLove = new Book({
  title: "The Forty Rules of Love",
  author: "Elif Shafak"
});

theFortyRulesOfLove.speak();
// In this example, 'this' refers to the object we created with the new keyword.

// Principle 4

// code example for Explicit Binding

// I will use the last constructor function to create a new object.

const badass = new Book({ title: "You are a BADASS", author: "Jen Sincero" });

console.log(".apply example");
theFortyRulesOfLove.speak.apply(badass);
// Here, 'this' keyword refers to whatever is passed into the .apply method.
console.log(".call example");
badass.speak.call(theFortyRulesOfLove);
// Here, 'this' keyword refers to whatever is passed into the .call method.
