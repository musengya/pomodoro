import { Box } from '@radix-ui/themes';
import PropTypes from 'prop-types';
import { useSound } from 'use-sound';
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
  const [playButtonPress] = useSound('button-press.wav');

  const formattedTimeRemaining = formatRemainingTime(timeRemaining);

  const canReset = !isRunning && timeRemaining !== initialTime;

  return (
    <>
      <div className="timer" aria-label={formattedTimeRemaining} data-testid="time-remaining">
        <Box style={{ fontSize: 60 }}>{formattedTimeRemaining}</Box>
      </div>
      <div className="buttons">
        {!isRunning && (
          <button
            onClick={() => {
              playButtonPress();
              startTimer();
            }}
            className="btn-1"
          >
            Start
          </button>
        )}
        {isRunning && (
          <button
            onClick={() => {
              playButtonPress();
              pauseTimer();
            }}
            className="btn-2"
          >
            Pause
          </button>
        )}
        <button
          disabled={!canReset}
          onClick={() => {
            playButtonPress();
            resetTimer();
          }}
          className="btn-3"
        >
          Reset
        </button>
      </div>
    </>
  );
}
