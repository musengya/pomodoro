import React from 'react';
const initialTime = 5;
//const initialText = 'Time to focus';
function App() {
  const [timeRemaining, setTimeremaining] = React.useState(initialTime);
  const [isRunning, setIsRunning] = React.useState(false);
  //const [showMessage, setShowMessage] = React.useState(initialText);
  const intervalRef = React.useRef(null);
  React.useEffect(() => {
    if (timeRemaining === 0) {
      resetTimer();
    }
  }, [timeRemaining]);
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
  function resetTimer() {
    clearInterval(intervalRef.current);
    setTimeremaining(initialTime);

    setIsRunning(false);
  }
  function handlePomodoro() {
    return (
      <div>
        {' '}
        <p>time to focus</p>
      </div>
    );
  }

  const minutes = Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeRemaining - minutes * 60).toString().padStart(2, '0');

  return (
    <>
      <div className="title">
        <h1>Pomodoro</h1>
      </div>
      <div className="schedule">
        <button onClick={handlePomodoro} className="pomodoro">
          Pomodoro
        </button>
        <button className="shortbreak">Short break</button>
        <button className="longbreak">Long break</button>
      </div>
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
        <button disabled={isRunning || timeRemaining === initialTime} onClick={resetTimer} className="btn-3">
          Reset
        </button>
      </div>

      {/* <div className="timertext">Time to focus</div> */}
    </>
  );
}

export default App;
