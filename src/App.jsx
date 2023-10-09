import { Box, Container, Flex, Heading, Tabs, Text } from '@radix-ui/themes';
import { useTimer } from './hooks/use-timer';

const initialTime = 5;
const shortBreak = 300;

export default function App() {
  const { isRunning, pauseTimer, resetTimer, startTimer, timeRemaining } = useTimer(initialTime);

  const minutes = Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeRemaining - minutes * 60).toString().padStart(2, '0');

  return (
    <Container size="1" style={{ marginTop: '32px', backgroundColor: 'greenyellow' }}>
      <Flex direction="column" gap="8" align="center">
        <Heading as="h1" size="9">
          Pomodoro
        </Heading>

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
              <div className="timer" aria-label={`${minutes}:${seconds}`}>
                <span>05:00</span>
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
                <button disabled={isRunning || timeRemaining === shortBreak} onClick={resetTimer} className="btn-3">
                  Reset
                </button>
              </div>
            </Tabs.Content>

            <Tabs.Content value="long-break">
              <Text size="2">Edit your profile or update contact information.</Text>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Flex>
    </Container>
  );
}
