// @ts-check
//const { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';

test('has title', ({ page }) => {
  //await page.goto('http://127.0.0.1:5173');
  // Expects page to have a heading with the name of Pomodoro.
  // await expect(page).toHaveTitle(/Pomodoro/);
  expect(page.getByRole('heading', { name: 'Pomodoro' })).toBeDefined();
});
test('timer is at Pomodoro tab on start', ({ page }) => {
  expect(page.getByText('Pomodoro')).toBeDefined();
});
test('it displays buttons', ({ page }) => {
  expect(page.getByRole('button', { name: '/Start/i' })).toBeDefined();
  expect(page.getByRole('button', { name: '/Reset/i' })).toBeDefined();
});
test('reset button is disabled when app is opened', ({ page }) => {
  expect(page.getByRole('button', { name: '/Reset/i' })).toBeDisabled();
});
