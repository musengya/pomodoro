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

A view is a function of state i.e what you want to see in the UI must be implemented in the state.

QSN
Difference between a headed and headless browser

playwright
Tests are run in headless mode meaning no browser will open up when running the tests
Results of the tests and test logs will be shown in the terminal.
To show command palette, we use SHIFT + CMD + P

//tests app.test.jsx
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent, render, screen, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App';

beforeEach(() => {
vi.useFakeTimers();
});

afterEach(() => {
vi.useRealTimers();
cleanup();
});

describe('App', () => {
test('it displays correct heading', () => {
render(<App />);
expect(screen.getByRole('heading', { name: /pomodoro/i })).toBeInTheDocument();
});

test('it displays buttons', () => {
render(<App />);
expect(screen.getByRole('button', { name: /start/i })).toBeDefined();
expect(screen.getByRole('button', { name: /reset/i })).toBeDefined();
});

test('it displays timer', () => {
render(<App />);
expect(screen.getByLabelText(/00:05/i)).toBeDefined();
// expect(screen.findByText(/00/i)).toBeDefined();
// expect(screen.findByText(/:/i)).toBeDefined();
// expect(screen.findByText(/05/i)).toBeDefined();
});

test('disable the reset button when the timer is running', () => {
render(<App />);
expect(screen.getByRole('button', { name: /reset/i })).toBeDisabled();
fireEvent.click(screen.getByRole('button', { name: /start/i }));
expect(screen.getByRole('button', { name: /reset/i })).toBeDisabled();
vi.advanceTimersByTime(2_000);
fireEvent.click(screen.getByRole('button', { name: /pause/i }));
expect(screen.getByRole('button', { name: /reset/i })).toBeEnabled();
});

test('resets the timer to the original time when the reset button is clicked', () => {
render(<App />);
fireEvent.click(screen.getByRole('button', { name: /start/i }));
vi.advanceTimersByTime(3_000);
fireEvent.click(screen.getByRole('button', { name: /pause/i }));
expect(screen.getByLabelText(/00:02/i)).toBeDefined();
fireEvent.click(screen.getByRole('button', { name: /reset/i }));
expect(screen.getByLabelText(/00:05/i)).toBeDefined();
expect(screen.getByRole('button', { name: /start/i })).toBeEnabled();
expect(screen.getByRole('button', { name: /reset/i })).toBeDisabled();
});

test('timer resets to the original time when time elapses after clicking the start button', () => {
render(<App />);
fireEvent.click(screen.getByRole('button', { name: /start/i }));
/\*\*
_ We wrap the `advanceTimersByTime` function in an `act` call because it is updating React state outside
_ React's call stack and the assertions do not wait for these updates to happen.
_ The `act` function prepares the component for assertions by flushing all the state updated and running all
_ the effects so that the component behaves closer to how React works in the browser.
_ https://legacy.reactjs.org/docs/test-utils.html#act
_ https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
\*/
act(() => vi.advanceTimersByTime(5_000));
expect(screen.getByLabelText(/00:05/i)).toBeDefined();
expect(screen.getByRole('button', { name: /start/i })).toBeEnabled();
expect(screen.getByRole('button', { name: /reset/i })).toBeDisabled();
});
});

Timer throttling
When application’s tab is inactive, most browsers will throttle tab activities to preserve resources and battery life on the user’s device.

Browser throttling affects timers, audio, video, and other APIs. So if your timer function is set to run every second, it may only run once every few seconds or even minutes when the tab is inactive.

Web Workers allow you to run a script operation on a different thread from your application’s main execution thread.

The timer will continue counting down even when your application’s tab becomes inactive. All major browsers support web workers, so you don’t have to worry about compatibility.
