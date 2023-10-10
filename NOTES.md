function expression vs function declaration

A function declaration creates a binding of a new function to a given name.
Example: function resetTimer(){
// code goes here
}

A function expression
Same as a fuction declaration only that the function name can be omitted to create an anonymous function.
They are not hoisted like function declarations.

Example:
const resetTimer = () => {
//code goes here
}

//How do I pass the short break || long break into useTimer?
//How do I make sure when the Pomodoro stops it resets and then switches to the break tab.
