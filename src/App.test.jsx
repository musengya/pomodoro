import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App';

describe('App', () => {
  test('it displays correct heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /pomodoro/i })).toBeInTheDocument();
  });
  test('it displays buttons', () => {
    render(<App />);
    expect(screen.getAllByRole('button', { name: /start/i })).toBeDefined();
    expect(screen.getAllByRole('button', { name: /reset/i })).toBeDefined();
  });
});
