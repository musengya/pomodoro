import PropTypes from 'prop-types';

Timer.propTypes = {
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  isRunning: PropTypes.bool.isRequired,
  startTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  canReset: PropTypes.bool.isRequired,
};

export default function Timer({ minutes, seconds, isRunning, startTimer, pauseTimer, resetTimer, canReset }) {
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
