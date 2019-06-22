// Q. WHAT ARE CLOSURES..?

/*
A closure is a function defined inside another function (Parent function) and has access to the variable which is declared and defined in parent function scope.
The closure has access to the variable in three scopes:
Variable declared in his own scope
Variable declared in parent function scope
Variable declared in the global namespace
*/

// E.g for Closure
var globalVar = 'This is global scope'; //Global Variable

(function parentFunction() {
    var parentVar = 'This is parent scope';
    (function closureFunction() {
        var closureVar = 'This is closure scope';

        console.log(globalVar); //Can acces Global variables
        console.log(parentVar); //Can access Parent's scope
        console.log(closureVar); //Can access Local scope
    })(); //Self invoking
})(); //Self invoking


//Example to understand use case of closure and how normal function works for same use case
//Counter Problem

var counter = 0; //Global Varibale

function displayCounter() {
    counter += 1;
    return counter;
}

var x = displayCounter();
var y = displayCounter();
var z = displayCounter();

console.log(z); //Display counter as 3, because displayCounter() has been invoked 3 times

console.log(counter + 5); //Counter is not limited to displayCounter() its accesible to others also. Like here we added 5 to counter

//The problem with solution above: Any code on the page can change the counter, without calling displayCounter().
//The counter should be local to the displayCounter() function, to prevent other code from changing it.

// Function to increment counter
function displayCounter() {
    var counter = 0; //Declared within local function scope
    counter += 1;
    return counter;
}

var x = displayCounter();
var y = displayCounter();
var z = displayCounter();

console.log(z); //Display counter as 1, because everytime displayCounter() has been invoked Counter is reset to 0.

//To overcome such scenario we have Closure. By using Closure the innerfunction as shown in 1st example has access to Global, parent & local scope.
//Solution using Closure

var displayCounter = (function () { //Parent Function
    var counter = 0;
    return function () { //Closure Function
        counter += 1;
        return counter;
    }
})();

console.log(displayCounter()); //Display 1
console.log(displayCounter()); //Display 2
console.log(displayCounter()); //Display 3

console.log(counter + 5); //Will give error as counter is not defined. Because it is declared in Parent function scope, So cannot be accessed outside