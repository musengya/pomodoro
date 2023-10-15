// @ts-check
import { expect, test } from '@playwright/test';
import path from 'path';
import sinon from 'sinon';
import { fileURLToPath } from 'url';
import { INITIAL_TIME_IN_SECONDS } from '../src/utils/constants.js';
import { formatRemainingTime } from '../src/utils/helpers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test.beforeEach(async ({ context }) => {
  await context.addInitScript({
    path: path.join(__dirname, '..', './node_modules/sinon/pkg/sinon.js'),
  });
  await context.addInitScript(() => {
    window.__clock = sinon.useFakeTimers();
  });
});

test('pomodoro workflow', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Pomodoro' })).toHaveText('Pomodoro');

  await expect(page.getByRole('tab', { name: 'Pomodoro' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tab', { name: 'Short break' })).toHaveAttribute('aria-selected', 'false');
  await expect(page.getByRole('tab', { name: 'Long break' })).toHaveAttribute('aria-selected', 'false');

  await expect(page.getByTestId('time-remaining')).toHaveText(formatRemainingTime(INITIAL_TIME_IN_SECONDS.pomodoro));

  await expect(page.getByRole('button', { name: 'Start' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Reset' })).toBeDisabled();

  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();

  await page.evaluate((time) => {
    window.__clock.tick(time);
  }, INITIAL_TIME_IN_SECONDS.pomodoro * 1_000);

  await expect(page.getByRole('tab', { name: 'Pomodoro' })).toHaveAttribute('aria-selected', 'false');
  await expect(page.getByRole('tab', { name: 'Short break' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tab', { name: 'Long break' })).toHaveAttribute('aria-selected', 'false');

  await expect(page.getByTestId('time-remaining')).toHaveText(formatRemainingTime(INITIAL_TIME_IN_SECONDS.shortBreak));

  await expect(page.getByRole('button', { name: 'Start' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Reset' })).toBeDisabled();

  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();

  await page.evaluate((time) => {
    window.__clock.tick(time);
  }, INITIAL_TIME_IN_SECONDS.shortBreak * 1_000);

  await expect(page.getByRole('tab', { name: 'Pomodoro' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tab', { name: 'Short break' })).toHaveAttribute('aria-selected', 'false');
  await expect(page.getByRole('tab', { name: 'Long break' })).toHaveAttribute('aria-selected', 'false');

  await expect(page.getByTestId('time-remaining')).toHaveText(formatRemainingTime(INITIAL_TIME_IN_SECONDS.pomodoro));

  await expect(page.getByRole('button', { name: 'Start' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Reset' })).toBeDisabled();
});
