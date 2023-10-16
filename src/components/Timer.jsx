import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useTimer } from '../hooks/use-timer.js';
import { formatRemainingTime } from '../utils/helpers.js';

Timer.propTypes = {
  initialTime: PropTypes.number.isRequired,
  switchMode: PropTypes.func.isRequired,
};

export default function Timer({ initialTime, switchMode }) {
  const { isRunning, pauseTimer, resetTimer, startTimer, timeRemaining } = useTimer(initialTime);

  useEffect(() => {
    if (timeRemaining === 0) {
      switchMode();
    }
  }, [switchMode, timeRemaining]);

  const formattedTimeRemaining = formatRemainingTime(timeRemaining);

  const canReset = !isRunning && timeRemaining !== initialTime;

  return (
    <>
      <div className="timer" aria-label={formattedTimeRemaining} data-testid="time-remaining">
        <span>{formattedTimeRemaining}</span>
      </div>
      <div className="buttons">
        {!isRunning && (
          <button onClick={startTimer} className="btn-1">
            Start
          </button>
        )}
        {isRunning && (
          <button onClick={pauseTimer} className="btn-2">
            Pause
          </button>
        )}
        <button disabled={!canReset} onClick={resetTimer} className="btn-3">
          Reset
        </button>
      </div>
    </>
  );
}
