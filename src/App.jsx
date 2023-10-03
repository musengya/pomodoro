import React from 'react';
const time = 5;
function App() {
  const [timeRemaining, setTimeremaining] = React.useState(time);
  const [isRunning, setIsRunning] = React.useState(false);
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
    setTimeremaining(time);

    setIsRunning(false);
  }

  const minutes = Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeRemaining - minutes * 60).toString().padStart(2, '0');
  function handlePomodoro() {
    alert('Focus time!');
  }

  return (
    <>
      <div className="title">
        <h1>Pomodoro</h1>
      </div>
      <div className="schedule">
        <button className="pomodoro" onClick={handlePomodoro}>
          pomodoro
        </button>
        <button className="shortbreak">short break</button>
        <button className="longbreak">long break</button>
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
        <button disabled={isRunning || timeRemaining === time} onClick={resetTimer} className="btn-3">
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
