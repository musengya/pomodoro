import React from 'react';

function App() {
  const [timeRemaining, setTimeremaining] = React.useState(25 * 60);

  function startTimer() {
    setInterval(() => {
      setTimeremaining((timeRemaining) => timeRemaining - 1);
    }, 1000);
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
      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="buttons">
        <button onClick={startTimer} className="btn-1">
          Start
        </button>
        <button className="btn-2">Stop</button>
      </div>
    </>
  );
}

export default App;
