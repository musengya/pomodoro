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

  await test.step('Assert initial state', async () => {
    await expect(page.getByRole('heading', { name: 'Pomodoro' })).toHaveText('Pomodoro');

    await expect(page.getByRole('tab', { name: 'Pomodoro' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tab', { name: 'Short break' })).toHaveAttribute('aria-selected', 'false');
    await expect(page.getByRole('tab', { name: 'Long break' })).toHaveAttribute('aria-selected', 'false');

    await expect(page.getByTestId('time-remaining')).toHaveText(formatRemainingTime(INITIAL_TIME_IN_SECONDS.pomodoro));

    await expect(page.getByRole('button', { name: 'Start' })).toBeEnabled();
    await expect(page.getByRole('button', { name: 'Reset' })).toBeDisabled();
  });

  await assertPomodoroWorkflow(page);
  await assertPomodoroWorkflow(page);
});

/**
 *
 * @param {import('@playwright/test').Page} page
 */
async function assertPomodoroWorkflow(page) {
  await test.step('Pomodoro 1', async () => {
    await assertPomodoro(page, 'pomodoro', 'shortBreak');
    await assertPomodoro(page, 'shortBreak', 'pomodoro');
  });
  await test.step('Pomodoro 2', async () => {
    await assertPomodoro(page, 'pomodoro', 'shortBreak');
    await assertPomodoro(page, 'shortBreak', 'pomodoro');
  });
  await test.step('Pomodoro 3', async () => {
    await assertPomodoro(page, 'pomodoro', 'shortBreak');
    await assertPomodoro(page, 'shortBreak', 'pomodoro');
  });
  await test.step('Pomodoro 4', async () => {
    await assertPomodoro(page, 'pomodoro', 'longBreak');
    await assertPomodoro(page, 'longBreak', 'pomodoro');
  });
}

/**
 *
 * @param {import('@playwright/test').Page} page
 * @param {'pomodoro' | 'shortBreak' | 'longBreak'} startTab
 * @param {'pomodoro' | 'shortBreak' | 'longBreak'} activeTabOnTimerEnd
 */
async function assertPomodoro(page, startTab, activeTabOnTimerEnd) {
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();

  await page.evaluate((time) => {
    window.__clock.tick(time);
  }, INITIAL_TIME_IN_SECONDS[startTab] * 1_000);

  await expect(page.getByRole('tab', { name: 'Pomodoro' })).toHaveAttribute(
    'aria-selected',
    activeTabOnTimerEnd === 'pomodoro' ? 'true' : 'false',
  );
  await expect(page.getByRole('tab', { name: 'Short break' })).toHaveAttribute(
    'aria-selected',
    activeTabOnTimerEnd === 'shortBreak' ? 'true' : 'false',
  );
  await expect(page.getByRole('tab', { name: 'Long break' })).toHaveAttribute(
    'aria-selected',
    activeTabOnTimerEnd === 'longBreak' ? 'true' : 'false',
  );

  await expect(page.getByTestId('time-remaining')).toHaveText(
    formatRemainingTime(INITIAL_TIME_IN_SECONDS[activeTabOnTimerEnd]),
  );

  await expect(page.getByRole('button', { name: 'Start' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Reset' })).toBeDisabled();
}
