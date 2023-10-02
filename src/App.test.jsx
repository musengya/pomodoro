import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
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

    // vi.advanceTimersByTime(100_000);
    // const timeLapsed = {
    //   time: /00:05/i,
    // };
    // expect(timeLapsed.time).toStrictEqual(/00:05/i);
    // // expect(screen.findByText(/00/i)).toBeDefined();
    // //expect(screen.findByText(/:/i)).toBeDefined();
    // // expect(screen.findByText(/05/i)).toBeDefined();
    // expect(screen.getByRole('button', { name: /start/i })).toBeEnabled();
    // expect(screen.getByRole('button', { name: /reset/i })).toBeDisabled();
  });
});
