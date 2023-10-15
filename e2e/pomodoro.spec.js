// @ts-check
import { test, expect } from '@playwright/test';
import { formatRemainingTime } from '../src/utils/helpers';
import { INITIAL_TIME } from '../src/utils/constants';

test('pomodoro workflow', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Pomodoro' })).toHaveText('Pomodoro');

  await expect(page.getByRole('tab', { name: 'Pomodoro' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tab', { name: 'Short break' })).toHaveAttribute('aria-selected', 'false');
  await expect(page.getByRole('tab', { name: 'Long break' })).toHaveAttribute('aria-selected', 'false');

  await expect(page.getByTestId('time-remaining')).toHaveText(formatRemainingTime(INITIAL_TIME.pomodoro));

  await expect(page.getByRole('button', { name: 'Start' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Reset' })).toBeDisabled();
});
