import { Box, Container, Flex, Heading, Tabs } from '@radix-ui/themes';
import { useState } from 'react';
import ProgressDemo from './components/Progress.jsx';
import Timer from './components/Timer.jsx';
import { INITIAL_TIME_IN_SECONDS } from './utils/constants.js';

const longBreakInterval = 4;

export default function App() {
  const [mode, setMode] = useState('pomodoro');
  const [session, setSession] = useState(1);

  function updateMode(value) {
    setMode(value);
  }

  function switchMode() {
    if (mode === 'pomodoro') {
      if (session === longBreakInterval) {
        setMode('long-break');
        setSession(0);
      } else {
        setMode('short-break');
      }
    } else {
      setMode('pomodoro');
      setSession(session + 1);
    }
  }

  return (
    <>
      <Container size="4" style={{ marginTop: '20px', backgroundColor: 'greenyellow', height: '100vh' }}>
        <Flex direction="column" gap="8" align="center">
          <Heading as="h1" size="9">
            Pomodoro
          </Heading>
          <ProgressDemo />
          <Tabs.Root value={mode} onValueChange={updateMode} style={{ backgroundColor: 'red' }}>
            <Tabs.List style={{ fontSize: '30px' }}>
              <Tabs.Trigger value="pomodoro">Pomodoro</Tabs.Trigger>
              <Tabs.Trigger value="short-break">Short break</Tabs.Trigger>
              <Tabs.Trigger value="long-break">Long break</Tabs.Trigger>
            </Tabs.List>

            <Box px="4" pt="3" pb="2">
              <Tabs.Content value="pomodoro">
                <Timer initialTime={INITIAL_TIME_IN_SECONDS.pomodoro} switchMode={switchMode} />
              </Tabs.Content>

              <Tabs.Content value="short-break">
                <Timer initialTime={INITIAL_TIME_IN_SECONDS.shortBreak} switchMode={switchMode} />
              </Tabs.Content>

              <Tabs.Content value="long-break">
                <Timer initialTime={INITIAL_TIME_IN_SECONDS.longBreak} switchMode={switchMode} />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Flex>

        <footer className="footer">{mode === 'pomodoro' ? 'Time to focus' : 'Time for break'}</footer>
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
      </Container>
    </>
  );
}
