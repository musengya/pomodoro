import { useCallback, useEffect, useRef, useState } from 'react';

export function useTimer(initialTime) {
  const [timeRemaining, setTimeremaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeremaining(initialTime);
  }, [initialTime]);

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
    clearInterval(intervalRef.current);
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
