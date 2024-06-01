//=> Example of Stack Usage:

function exampleFunction() {
  let localVar = 10; // Local variable stored on the stack
  anotherFunction(); // Function call pushes a new frame onto the stack
}

function anotherFunction() {
  let anotherVar = 20; // Another local variable on a new stack frame
}

exampleFunction(); // Executes the function and uses stack memory

// Another Example of Stack Usage:

function exampleFunction() {
    let localVar = 10; // Allocated on the stack
    anotherFunction(); // Call pushes a new frame onto the stack
}

function anotherFunction() {
    let anotherVar = 20; // Another local variable on a new stack frame
    // Do something
}

exampleFunction(); // Executes the function and uses stack memory

//=> Example of Heap Usage:

function createObject() {
    let obj = { key: "value" }; // Object stored on the heap
    return obj;
}

let newObject = createObject(); // newObject now references the object on the heap

//=> Example of Stack Data Structure in JS:

class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.pop();
  }
  
  peek() {
    if (this.isEmpty()) {
      return "No elements in Stack";
    }
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}

let stack = new Stack();
stack.push(10);
stack.push(20);
console.log(stack.peek()); // Output: 20
console.log(stack.pop());  // Output: 20
console.log(stack.pop());  // Output: 10
console.log(stack.isEmpty()); // Output: true

//=> Example of the Call Stack in Action

function firstFunction() {
    console.log("Entering firstFunction");
    secondFunction();
    console.log("Exiting firstFunction");
}

function secondFunction() {
    console.log("Entering secondFunction");
    thirdFunction();
    console.log("Exiting secondFunction");
}

function thirdFunction() {
    console.log("Entering thirdFunction");
    console.log("Exiting thirdFunction");
}

firstFunction();

/* 
  Here's how the call stack would manage these function calls:

  1. **Initial Call**:
    - `firstFunction()` is called.
    - The frame for `firstFunction` is pushed onto the stack.

  2. **Inside `firstFunction`**:
    - `console.log("Entering firstFunction")` executes.
    - `secondFunction()` is called.
    - The frame for `secondFunction` is pushed onto the stack.

  3. **Inside `secondFunction`**:
    - `console.log("Entering secondFunction")` executes.
    - `thirdFunction()` is called.
    - The frame for `thirdFunction` is pushed onto the stack.

  4. **Inside `thirdFunction`**:
    - `console.log("Entering thirdFunction")` executes.
    - `console.log("Exiting thirdFunction")` executes.
    - `thirdFunction` completes and its frame is popped from the stack.

  5. **Back to `secondFunction`**:
    - `console.log("Exiting secondFunction")` executes.
    - `secondFunction` completes and its frame is popped from the stack.

  6. **Back to `firstFunction`**:
    - `console.log("Exiting firstFunction")` executes.
    - `firstFunction` completes and its frame is popped from the stack.
*/

//=> Stack overflow problem:

/*

  A stack overflow occurs when:
    Too many nested function calls, exhausting the stack space. For example: 
      a recursive function with no base case will keep calling itself indefinitely. 
        Eventually leading to a stack overflow.

*/
function recursiveFunction() {
  recursiveFunction();
}

//! recursiveFunction(); => This will cause a stack overflow



//=> Example for Clarity -Control Flow Information-

function a() {
  b();
  console.log("Finished a");
}

function b() {
  console.log("In b");
}

a();

/*
Call Stack with Control Flow Information

  1. **Initial Call**:
    - The global execution context is pushed onto the stack.

  2. **Call `a()`**:
    - The execution context for `a()` is created and pushed onto the stack.
    - Control flow information includes where to return in the global context after `a()` finishes.
   
   3. **Inside `a()`, Call `b()`**:
    - The execution context for `b()` is created and pushed onto the stack.
    - Control flow information includes where to return in `a()` after `b()` finishes. 
      the next line after `b()` call in `a()`.
   
   4. **`b()` Completes**:
    - The stack pops the `b()` context and returns to the `a()` context.
    - Execution continues from the point after `b()` was called in `a()`.
   
   5. **`a()` Completes**:
    - The stack pops the `a()` context and returns to the global context.
    - Execution continues from the point after `a()` was called in the global context.
*/

//=> Global Execution Context

var globalVar = "I am global";

function globalFunction() {
  console.log("This is a global function");
}

globalFunction(); // This runs in the global execution context

console.log(globalVar); // Accesses a variable in the global execution context

/* 
  ### Detailed Breakdown
  
  1. **Program Start**:
      - The global execution context is created and pushed onto the call stack.
      - The `this` keyword is bound to the global object (e.g., `window` in a browser).
  
  2. **Variable and Function Declarations**:
      - `var globalVar` and `function globalFunction` are added to the global object.
      - They are available throughout the program.
  
  3. **Execution**:
      - When `globalFunction()` is called: 
        It creates a new execution context, but the call itself happens in the global context.
      - After `globalFunction` completes, the execution returns to the global context.
*/

//=> Local variable

function myFunction() {
  var localVar = 10; // localVar is a local variable
  console.log(localVar); // Accessing localVar within its scope
}

myFunction(); // Calling the function
//! console.log(localVar); => Error: localVar is not defined outside of its scope

/* 

In this example: 
  `localVar` is a local variable because it is declared within the function `myFunction()`.
  It is accessible only within the scope of `myFunction()`. 
    Cannot be accessed from outside that fn.

*/

//=> Call Stack && Web APIs && Callback Queue && Event Loop

  console.log("Start");
  
  setTimeout(() => {
      console.log("Timeout callback");
  }, 1000);
  
  console.log("End");

/* 
  Detailed Explanation
    Initial Execution:
      Global Execution Context**:
        The global execution context is created and pushed onto the call stack.
        `console.log("Start")` is called and added to the call stack.
      Executing `console.log("Start")`**:
        The message "Start" is printed to the console.
        `console.log("Start")` is popped off the call stack.
  Handling `setTimeout`**
    Setting Up `setTimeout`**:
      `setTimeout` is called with a callback function and a delay of 1000ms.
      `setTimeout` is recognized as a Web API function and not part of the JavaScript engine.
      The callback function and its delay are registered with the browser’s Web API.
        Which handles the timer.
  Continue Execution**:
    `console.log("End")` is called and added to the call stack.
  Executing `console.log("End")`**:
    The message "End" is printed to the console.
    `console.log("End")` is popped off the call stack.
  Web APIs and Asynchronous Handling
    Web API Timer:
      The Web API starts the 1000ms timer.
      The call stack is now empty, and JavaScript waits for further tasks.  
    Timer Completion:
      After 1000ms, the Web API moves the `setTimeout` callback to the callback queue.
  Event Loop
    Event Loop Checking:
      The event loop constantly checks if: 
        The call stack is empty.
        There are tasks in the callback queue.
    Callback Execution:
      Once the call stack is empty: 
        the event loop moves the `setTimeout` callback from the callback queue to the call stack.
    Executing Callback:
      The callback function (`() => { console.log("Timeout callback"); }`) is executed.
      `console.log("Timeout callback")` is added to the call stack.
    Printing Callback Message:
      The message "Timeout callback" is printed to the console.
      `console.log("Timeout callback")` is popped off the call stack.
*/


//=> Console log Web API execution: 

console.log("Start");
console.log("End");

/* 
  Execution Process
    Global Execution Context:
      The global execution context is created and pushed onto the call stack.
    First `console.log` Call:
      `console.log("Start")` is called and pushed onto the call stack.
      It executes immediately, logging "Start" to the console.
      `console.log("Start")` is then popped off the call stack.
    Second `console.log` Call**:
      `console.log("End")` is called and pushed onto the call stack.
      It executes immediately, logging "End" to the console.
      `console.log("End")` is then popped off the call stack.
*/

//=> JavaScript Environments:

  // Browser Environment
    console.log("Hello, world!"); 
      // Uses the `console` object from the Web APIs to log a message to the console
    document.getElementById("myElement").textContent = "Hello!"; 
      // Uses the `document` object to manipulate the DOM

  //: JavaScript Engine: Executes the code.
  //: Host Environment: The web browser.
    //: providing the `console` and `document` objects through Web APIs.
  
  // Example: Node.js Environment
  
    const fs = require('fs'); 
      // Uses the `fs` module from Node.js APIs to interact with the file system
    
    fs.readFile('example.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data); // Logs the content of the file to the console
    });  

  //: JavaScript Engine: Executes the code (V8 in the case of Node.js).
  //: Host Environment: Node.js, providing the `fs` module for file system operations.
