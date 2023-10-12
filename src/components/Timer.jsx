import PropTypes from 'prop-types';
import { useTimer } from '../hooks/use-timer';
import { useEffect } from 'react';

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

  const minutes = Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeRemaining - minutes * 60).toString().padStart(2, '0');

  const canReset = !isRunning && timeRemaining !== initialTime;

  return (
    <>
      <div className="timer" aria-label={`${minutes}:${seconds}`}>
        <span>{`${minutes}:${seconds}`}</span>
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
