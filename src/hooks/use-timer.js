import { useCallback, useEffect, useRef, useState } from 'react';
import { useSound } from 'use-sound';
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
  const [playAlarmKitchen] = useSound('alarm-kitchen.mp3');
  const [playTickingSlow, { stop: stopTickingSlow }] = useSound('ticking-slow.mp3', { loop: true });

  /**
   * @type {React.MutableRefObject<NodeJS.Timeout | null>}
   */
  const intervalRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    stopTickingSlow();
    setTimeremaining(initialTime);
  }, [initialTime, stopTickingSlow]);

  useEffect(() => {
    resetTimer();
  }, [mode, resetTimer]);

  useEffect(() => {
    if (timeRemaining === 0) {
      playAlarmKitchen();
      resetTimer();
    }
  }, [playAlarmKitchen, resetTimer, timeRemaining]);

  function startTimer() {
    setIsRunning(true);
    playTickingSlow();

    intervalRef.current = setInterval(() => {
      setTimeremaining((timeRemaining) => timeRemaining - 1);
    }, 1000);
  }

  function pauseTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    stopTickingSlow();
  }

  return {
    startTimer,
    timeRemaining,
    pauseTimer,
    resetTimer,
    isRunning,
  };
}
