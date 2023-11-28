import { Box, Container, Flex, Heading, Tabs } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import Progress from './components/Progress.jsx';
import Timer from './components/Timer.jsx';
import { useTimer } from './hooks/use-timer.js';
import { INITIAL_TIME_IN_SECONDS } from './utils/constants.js';
import { formatRemainingTime } from './utils/helpers.js';

/** @typedef {'pomodoro' | 'shortBreak' | 'longBreak'} Mode */

const longBreakInterval = 4;

export default function App() {
  const [mode, setMode] = useState(/** @type {Mode} */ ('pomodoro'));
  const [session, setSession] = useState(1);
  const { isRunning, pauseTimer, resetTimer, startTimer, timeRemaining } = useTimer(mode);

  const timerMessage = mode === 'pomodoro' ? 'Time to focus' : 'Time for a break';

  useEffect(() => {
    document.title = `${formatRemainingTime(timeRemaining)} - ${timerMessage}!`;
  }, [timeRemaining, timerMessage]);

  /**
   * @param {Mode} mode
   */
  function updateMode(mode) {
    setMode(mode);
  }

  useEffect(() => {
    if (timeRemaining === 0) {
      if (mode === 'pomodoro') {
        if (session === longBreakInterval) {
          setMode('longBreak');
          setSession(0);
        } else {
          setMode('shortBreak');
        }
      } else {
        setMode('pomodoro');
        setSession(session + 1);
      }
    }
  }, [mode, session, timeRemaining]);

  return (
    <>
      <Container
        size="3"
        style={{ marginTop: '20px', backgroundColor: 'greenyellow', height: '100vh', display: 'flex' }}
      >
        <Flex direction="column" gap="8" align="center">
          <Heading as="h1" size="9">
            Pomodoro
          </Heading>
          <Progress initialTime={INITIAL_TIME_IN_SECONDS[mode]} timeRemaining={timeRemaining} />
          <Tabs.Root
            className="tabroot"
            value={mode}
            onValueChange={updateMode}
            style={{
              backgroundColor: 'red',
            }}
          >
            <Tabs.List
              className="tablist"
              size="1"
              style={{
                fontSize: '15px',
              }}
            >
              <Tabs.Trigger value="pomodoro">Pomodoro</Tabs.Trigger>
              <Tabs.Trigger value="shortBreak">Short break</Tabs.Trigger>
              <Tabs.Trigger value="longBreak">Long break</Tabs.Trigger>
            </Tabs.List>

            <Box px="4" pt="3" pb="2">
              <Tabs.Content value="pomodoro">
                <Timer
                  initialTime={INITIAL_TIME_IN_SECONDS.pomodoro}
                  isRunning={isRunning}
                  pauseTimer={pauseTimer}
                  resetTimer={resetTimer}
                  startTimer={startTimer}
                  timeRemaining={timeRemaining}
                />
              </Tabs.Content>

              <Tabs.Content value="shortBreak">
                <Timer
                  initialTime={INITIAL_TIME_IN_SECONDS.shortBreak}
                  isRunning={isRunning}
                  pauseTimer={pauseTimer}
                  resetTimer={resetTimer}
                  startTimer={startTimer}
                  timeRemaining={timeRemaining}
                />
              </Tabs.Content>

              <Tabs.Content value="longBreak">
                <Timer
                  initialTime={INITIAL_TIME_IN_SECONDS.longBreak}
                  isRunning={isRunning}
                  pauseTimer={pauseTimer}
                  resetTimer={resetTimer}
                  startTimer={startTimer}
                  timeRemaining={timeRemaining}
                />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Flex>

        <footer className="footer">
          <Flex direction="column" align="center">
            <Box>#{session}</Box>
            <Box>{timerMessage}!</Box>
          </Flex>
        </footer>
        <div className="border">
          <span className="tasks">Tasks</span>
          <div>
            <button className="buton">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="addtasks">
          <svg
            style={{ marginRight: '10px' }}
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>Add tasks</div>
        </div>
      </Container>
    </>
  );
}
