import { Box, Container, Flex, Heading, Tabs } from '@radix-ui/themes';

import Timer from './components/Timer';

export default function App() {
  return (
    <Container size="1" style={{ marginTop: '32px', backgroundColor: 'greenyellow' }}>
      <Flex direction="column" gap="8" align="center">
        <Heading as="h1" size="9">
          Pomodoro
        </Heading>

        <Tabs.Root defaultValue="pomodoro">
          <Tabs.List style={{ fontSize: '30px' }}>
            <Tabs.Trigger value="pomodoro">Pomodoro</Tabs.Trigger>
            <Tabs.Trigger value="short-break">Short break</Tabs.Trigger>
            <Tabs.Trigger value="long-break">Long break</Tabs.Trigger>
          </Tabs.List>

          <Box px="4" pt="3" pb="2">
            <Tabs.Content value="pomodoro">
              <Timer initialTime={5} />
            </Tabs.Content>

            <Tabs.Content value="short-break">
              <Timer initialTime={10} />
            </Tabs.Content>

            <Tabs.Content value="long-break">
              <Timer initialTime={15} />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Flex>
    </Container>
  );
}
