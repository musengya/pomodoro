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
    expect(screen.findByText(/00/i)).toBeDefined();
    expect(screen.findByText(/:/i)).toBeDefined();
    expect(screen.findByText(/05/i)).toBeDefined();
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
    /**
     * We wrap the `advanceTimersByTime` function in an `act` call because it is updating React state outside
     * React's call stack and the assertions do not wait for these updates to happen.
     * The `act` function prepares the component for assertions by flushing all the state updated and running all
     * the effects so that the component behaves closer to how React works in the browser.
     * https://legacy.reactjs.org/docs/test-utils.html#act
     * https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
     */
    act(() => vi.advanceTimersByTime(5_000));
    expect(screen.getByLabelText(/00:05/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /start/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /reset/i })).toBeDisabled();
  });
});
