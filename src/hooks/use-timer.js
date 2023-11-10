import { useCallback, useEffect, useRef, useState } from 'react';
import { INITIAL_TIME_IN_SECONDS } from '../utils/constants.js';

/**
 *
 * @param {import('../App.jsx').Mode} mode
 * @returns {{
 * startTimer: () => void
 * timeRemaining: number;
 * pauseTimer: () => void;
 * resetTimer: () => void;
 * isRunning: boolean;
 * }}
 */
export function useTimer(mode) {
  const initialTime = INITIAL_TIME_IN_SECONDS[mode];
  const [timeRemaining, setTimeremaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  /**
   * @type {React.MutableRefObject<NodeJS.Timeout | null>}
   */
  const intervalRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setTimeremaining(initialTime);
  }, [initialTime]);

  useEffect(() => {
    resetTimer();
  }, [mode, resetTimer]);

  useEffect(() => {
    if (timeRemaining === 0) {
      resetTimer();
    }
  }, [resetTimer, timeRemaining]);

  function startTimer() {
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeremaining((timeRemaining) => timeRemaining - 1);
    }, 1000);
  }

  function pauseTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
  }

  return {
    startTimer,
    timeRemaining,
    pauseTimer,
    resetTimer,
    isRunning,
  };
}
