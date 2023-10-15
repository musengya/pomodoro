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

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByLabel('00:02').click();
  await page.getByRole('button', { name: 'Start' }).click();
  await page.getByRole('button', { name: 'Start' }).click();
  await page.getByRole('tab', { name: 'Short break' }).click();
  await page.getByRole('tab', { name: 'Long break' }).click();
  await page.getByRole('tab', { name: 'Pomodoro' }).click();
  await page.getByRole('button', { name: 'Start' }).click();
  await page.getByRole('button', { name: 'Pause' }).click();
  expect(page.getByLabel('00:02')).toBeDefined();
});
