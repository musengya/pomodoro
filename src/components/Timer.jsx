import PropTypes from 'prop-types';
import { formatRemainingTime } from '../utils/helpers.js';

Timer.propTypes = {
  initialTime: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  pauseTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  timeRemaining: PropTypes.number.isRequired,
};

export default function Timer({ isRunning, initialTime, pauseTimer, resetTimer, startTimer, timeRemaining }) {
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
