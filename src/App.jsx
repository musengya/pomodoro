import { Box, Container, Flex, Heading, Tabs } from '@radix-ui/themes';

import { useState } from 'react';
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
    <Container size="4" style={{ marginTop: '20px', backgroundColor: 'greenyellow', height: '100vh' }}>
      <Flex direction="column" gap="8" align="center">
        <Heading as="h1" size="9">
          Pomodoro
        </Heading>

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
    </Container>
  );
}
