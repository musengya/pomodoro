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
module.exports =

//test.beforeEach(async ({ page }) => {
await page.goto('https://demo.playwright.dev/todomvc');
});

const TODO_ITEMS = ['buy some cheese', 'feed the cat', 'book a doctors appointment'];

test.describe('New Todo', () => {
test('should allow me to add todo items', async ({ page }) => {
// create a new todo locator
const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Make sure the list only has one todo item.
    await expect(page.getByTestId('todo-title')).toHaveText([TODO_ITEMS[0]]);

    // Create 2nd todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press('Enter');

    // Make sure the list now has two todo items.
    await expect(page.getByTestId('todo-title')).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);

    await checkNumberOfTodosInLocalStorage(page, 2);

});

test('should clear text input field when an item is added', async ({ page }) => {
// create a new todo locator
const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create one todo item.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Check that input is empty.
    await expect(newTodo).toBeEmpty();
    await checkNumberOfTodosInLocalStorage(page, 1);

});

test('should append new items to the bottom of the list', async ({ page }) => {
// Create 3 items.
await createDefaultTodos(page);

    // create a todo count locator
    const todoCount = page.getByTestId('todo-count');

    // Check test using different methods.
    await expect(page.getByText('3 items left')).toBeVisible();
    await expect(todoCount).toHaveText('3 items left');
    await expect(todoCount).toContainText('3');
    await expect(todoCount).toHaveText(/3/);

    // Check all items in one call.
    await expect(page.getByTestId('todo-title')).toHaveText(TODO_ITEMS);
    await checkNumberOfTodosInLocalStorage(page, 3);

});
});

test.describe('Mark all as completed', () => {
test.beforeEach(async ({ page }) => {
await createDefaultTodos(page);
await checkNumberOfTodosInLocalStorage(page, 3);
});

test.afterEach(async ({ page }) => {
await checkNumberOfTodosInLocalStorage(page, 3);
});

test('should allow me to mark all items as completed', async ({ page }) => {
// Complete all todos.
await page.getByLabel('Mark all as complete').check();

    // Ensure all todos have 'completed' class.
    await expect(page.getByTestId('todo-item')).toHaveClass(['completed', 'completed', 'completed']);
    await checkNumberOfCompletedTodosInLocalStorage(page, 3);

});

test('should allow me to clear the complete state of all items', async ({ page }) => {
const toggleAll = page.getByLabel('Mark all as complete');
// Check and then immediately uncheck.
await toggleAll.check();
await toggleAll.uncheck();

    // Should be no completed classes.
    await expect(page.getByTestId('todo-item')).toHaveClass(['', '', '']);

});

test('complete all checkbox should update state when items are completed / cleared', async ({ page }) => {
const toggleAll = page.getByLabel('Mark all as complete');
await toggleAll.check();
await expect(toggleAll).toBeChecked();
await checkNumberOfCompletedTodosInLocalStorage(page, 3);

    // Uncheck first todo.
    const firstTodo = page.getByTestId('todo-item').nth(0);
    await firstTodo.getByRole('checkbox').uncheck();

    // Reuse toggleAll locator and make sure its not checked.
    await expect(toggleAll).not.toBeChecked();

    await firstTodo.getByRole('checkbox').check();
    await checkNumberOfCompletedTodosInLocalStorage(page, 3);

    // Assert the toggle all is checked again.
    await expect(toggleAll).toBeChecked();

});
});

test.describe('Item', () => {
test('should allow me to mark items as complete', async ({ page }) => {
// create a new todo locator
const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }

    // Check first item.
    const firstTodo = page.getByTestId('todo-item').nth(0);
    await firstTodo.getByRole('checkbox').check();
    await expect(firstTodo).toHaveClass('completed');

    // Check second item.
    const secondTodo = page.getByTestId('todo-item').nth(1);
    await expect(secondTodo).not.toHaveClass('completed');
    await secondTodo.getByRole('checkbox').check();

    // Assert completed class.
    await expect(firstTodo).toHaveClass('completed');
    await expect(secondTodo).toHaveClass('completed');

});

test('should allow me to un-mark items as complete', async ({ page }) => {
// create a new todo locator
const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }

    const firstTodo = page.getByTestId('todo-item').nth(0);
    const secondTodo = page.getByTestId('todo-item').nth(1);
    const firstTodoCheckbox = firstTodo.getByRole('checkbox');

    await firstTodoCheckbox.check();
    await expect(firstTodo).toHaveClass('completed');
    await expect(secondTodo).not.toHaveClass('completed');
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await firstTodoCheckbox.uncheck();
    await expect(firstTodo).not.toHaveClass('completed');
    await expect(secondTodo).not.toHaveClass('completed');
    await checkNumberOfCompletedTodosInLocalStorage(page, 0);

});

test('should allow me to edit an item', async ({ page }) => {
await createDefaultTodos(page);

    const todoItems = page.getByTestId('todo-item');
    const secondTodo = todoItems.nth(1);
    await secondTodo.dblclick();
    await expect(secondTodo.getByRole('textbox', { name: 'Edit' })).toHaveValue(TODO_ITEMS[1]);
    await secondTodo.getByRole('textbox', { name: 'Edit' }).fill('buy some sausages');
    await secondTodo.getByRole('textbox', { name: 'Edit' }).press('Enter');

    // Explicitly assert the new text value.
    await expect(todoItems).toHaveText([TODO_ITEMS[0], 'buy some sausages', TODO_ITEMS[2]]);
    await checkTodosInLocalStorage(page, 'buy some sausages');

});
});

test.describe('Editing', () => {
test.beforeEach(async ({ page }) => {
await createDefaultTodos(page);
await checkNumberOfTodosInLocalStorage(page, 3);
});

test('should hide other controls when editing', async ({ page }) => {
const todoItem = page.getByTestId('todo-item').nth(1);
await todoItem.dblclick();
await expect(todoItem.getByRole('checkbox')).not.toBeVisible();
await expect(
todoItem.locator('label', {
hasText: TODO_ITEMS[1],
}),
).not.toBeVisible();
await checkNumberOfTodosInLocalStorage(page, 3);
});

test('should save edits on blur', async ({ page }) => {
const todoItems = page.getByTestId('todo-item');
await todoItems.nth(1).dblclick();
await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('buy some sausages');
await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).dispatchEvent('blur');

    await expect(todoItems).toHaveText([TODO_ITEMS[0], 'buy some sausages', TODO_ITEMS[2]]);
    await checkTodosInLocalStorage(page, 'buy some sausages');

});

test('should trim entered text', async ({ page }) => {
const todoItems = page.getByTestId('todo-item');
await todoItems.nth(1).dblclick();
await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill(' buy some sausages ');
await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).press('Enter');

    await expect(todoItems).toHaveText([TODO_ITEMS[0], 'buy some sausages', TODO_ITEMS[2]]);
    await checkTodosInLocalStorage(page, 'buy some sausages');

});

test('should remove the item if an empty text string was entered', async ({ page }) => {
const todoItems = page.getByTestId('todo-item');
await todoItems.nth(1).dblclick();
await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('');
await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).press('Enter');

    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);

});

test('should cancel edits on escape', async ({ page }) => {
const todoItems = page.getByTestId('todo-item');
await todoItems.nth(1).dblclick();
await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('buy some sausages');
await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).press('Escape');
await expect(todoItems).toHaveText(TODO_ITEMS);
});
});

test.describe('Counter', () => {
test('should display the current number of todo items', async ({ page }) => {
// create a new todo locator
const newTodo = page.getByPlaceholder('What needs to be done?');

    // create a todo count locator
    const todoCount = page.getByTestId('todo-count');

    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');
    await expect(todoCount).toContainText('1');

    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press('Enter');
    await expect(todoCount).toContainText('2');

    await checkNumberOfTodosInLocalStorage(page, 2);

});
});

test.describe('Clear completed button', () => {
test.beforeEach(async ({ page }) => {
await createDefaultTodos(page);
});

test('should display the correct text', async ({ page }) => {
await page.locator('.todo-list li .toggle').first().check();
await expect(page.getByRole('button', { name: 'Clear completed' })).toBeVisible();
});

test('should remove completed items when clicked', async ({ page }) => {
const todoItems = page.getByTestId('todo-item');
await todoItems.nth(1).getByRole('checkbox').check();
await page.getByRole('button', { name: 'Clear completed' }).click();
await expect(todoItems).toHaveCount(2);
await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
});

test('should be hidden when there are no items that are completed', async ({ page }) => {
await page.locator('.todo-list li .toggle').first().check();
await page.getByRole('button', { name: 'Clear completed' }).click();
await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();
});
});

test.describe('Persistence', () => {
test('should persist its data', async ({ page }) => {
// create a new todo locator
const newTodo = page.getByPlaceholder('What needs to be done?');

    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }

    const todoItems = page.getByTestId('todo-item');
    const firstTodoCheck = todoItems.nth(0).getByRole('checkbox');
    await firstTodoCheck.check();
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstTodoCheck).toBeChecked();
    await expect(todoItems).toHaveClass(['completed', '']);

    // Ensure there is 1 completed item.
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    // Now reload.
    await page.reload();
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstTodoCheck).toBeChecked();
    await expect(todoItems).toHaveClass(['completed', '']);

});
});

test.describe('Routing', () => {
test.beforeEach(async ({ page }) => {
await createDefaultTodos(page);
// make sure the app had a chance to save updated todos in storage
// before navigating to a new view, otherwise the items can get lost :(
// in some frameworks like Durandal
await checkTodosInLocalStorage(page, TODO_ITEMS[0]);
});

test('should allow me to display active items', async ({ page }) => {
const todoItem = page.getByTestId('todo-item');
await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();

    await checkNumberOfCompletedTodosInLocalStorage(page, 1);
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(todoItem).toHaveCount(2);
    await expect(todoItem).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);

});

test('should respect the back button', async ({ page }) => {
const todoItem = page.getByTestId('todo-item');
await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();

    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await test.step('Showing all items', async () => {
      await page.getByRole('link', { name: 'All' }).click();
      await expect(todoItem).toHaveCount(3);
    });

    await test.step('Showing active items', async () => {
      await page.getByRole('link', { name: 'Active' }).click();
    });

    await test.step('Showing completed items', async () => {
      await page.getByRole('link', { name: 'Completed' }).click();
    });

    await expect(todoItem).toHaveCount(1);
    await page.goBack();
    await expect(todoItem).toHaveCount(2);
    await page.goBack();
    await expect(todoItem).toHaveCount(3);

});

test('should allow me to display completed items', async ({ page }) => {
await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();
await checkNumberOfCompletedTodosInLocalStorage(page, 1);
await page.getByRole('link', { name: 'Completed' }).click();
await expect(page.getByTestId('todo-item')).toHaveCount(1);
});

test('should allow me to display all items', async ({ page }) => {
await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();
await checkNumberOfCompletedTodosInLocalStorage(page, 1);
await page.getByRole('link', { name: 'Active' }).click();
await page.getByRole('link', { name: 'Completed' }).click();
await page.getByRole('link', { name: 'All' }).click();
await expect(page.getByTestId('todo-item')).toHaveCount(3);
});

test('should highlight the currently applied filter', async ({ page }) => {
await expect(page.getByRole('link', { name: 'All' })).toHaveClass('selected');

    //create locators for active and completed links
    const activeLink = page.getByRole('link', { name: 'Active' });
    const completedLink = page.getByRole('link', { name: 'Completed' });
    await activeLink.click();

    // Page change - active items.
    await expect(activeLink).toHaveClass('selected');
    await completedLink.click();

    // Page change - completed items.
    await expect(completedLink).toHaveClass('selected');

});
});

async function createDefaultTodos(page) {
// create a new todo locator
const newTodo = page.getByPlaceholder('What needs to be done?');

for (const item of TODO_ITEMS) {
await newTodo.fill(item);
await newTodo.press('Enter');
}
}

/\*\*

- @param {import('@playwright/test').Page} page
- @param {number} expected
  \*/
  async function checkNumberOfTodosInLocalStorage(page, expected) {
  return await page.waitForFunction((e) => {
  return JSON.parse(localStorage['react-todos']).length === e;
  }, expected);
  }

/\*\*

- @param {import('@playwright/test').Page} page
- @param {number} expected
  \*/
  async function checkNumberOfCompletedTodosInLocalStorage(page, expected) {
  return await page.waitForFunction((e) => {
  return JSON.parse(localStorage['react-todos']).filter((i) => i.completed).length === e;
  }, expected);
  }

/\*\*

- @param {import('@playwright/test').Page} page
- @param {string} title
  \*/
  async function checkTodosInLocalStorage(page, title) {
  return await page.waitForFunction((t) => {
  return JSON.parse(localStorage['react-todos'])
  .map((i) => i.title)
  .includes(t);
  }, title);
  }

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
