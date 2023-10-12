import { Box, Container, Flex, Heading, Tabs } from '@radix-ui/themes';

import Timer from './components/Timer';
import { useState } from 'react';

export default function App() {
  const [mode, setMode] = useState('pomodoro');

  function updateMode(value) {
    setMode(value);
  }

  function switchMode() {
    setMode('short-break');
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
              <Timer initialTime={5} switchMode={switchMode} />
            </Tabs.Content>

            <Tabs.Content value="short-break">
              <Timer initialTime={10} switchMode={switchMode} />
            </Tabs.Content>

            <Tabs.Content value="long-break">
              <Timer initialTime={15} switchMode={switchMode} />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Flex>
    </Container>
  );
}
