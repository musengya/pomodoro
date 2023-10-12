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

Use F2 key to help rename a symbol in your file
Use F12 to find similar symbols in the file

propTypes are used to document the intended types of properties passed to components.
They are declared :
MyComponent.propTypes = {
// You can declare that a prop is a specific JS primitive. By default, these
// are all optional.
optionalArray: PropTypes.array,
optionalBigInt: PropTypes.bigint,
optionalBool: PropTypes.bool,
optionalFunc: PropTypes.func,
optionalNumber: PropTypes.number,
optionalObject: PropTypes.object,
optionalString: PropTypes.string,
optionalSymbol: PropTypes.symbol,

To make them to be required we use:
// A value of any data type
requiredAny: PropTypes.any.isRequired

// todo
when the pomodoro timer runs out, the focus should change to break and vice versa
// can we use useNavigate hook from react router to switch from one tab to the next once the timer runs out or when we just want to switch.
// How do we maintain the state that the previous tab was in before we switched e.g
If the pomodoro tab was at 3 seconds and we switch to the break tab, then it should remain at the 3 seconds and not reset back to the original time.

QSn:
difference between return with {} and return with () braces
