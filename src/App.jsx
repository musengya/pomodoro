import { Box, Tabs, Text } from '@radix-ui/themes';
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

      <Tabs.Root defaultValue="pomodoro">
        <Tabs.List>
          <Tabs.Trigger value="pomodoro">Pomodoro</Tabs.Trigger>
          <Tabs.Trigger value="short-break">Short break</Tabs.Trigger>
          <Tabs.Trigger value="long-break">Long break</Tabs.Trigger>
        </Tabs.List>

        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="pomodoro">
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
          </Tabs.Content>

          <Tabs.Content value="short-break">
            <Text size="2">Access and update your documents.</Text>
          </Tabs.Content>

          <Tabs.Content value="long-break">
            <Text size="2">Edit your profile or update contact information.</Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </>
  );
}

export default App;
