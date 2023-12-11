import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
const DialogDemo = () => (
  <Dialog.Root>
    <Dialog.Trigger>
      <Button style={{ marginLeft: '500px' }}>Login</Button>
    </Dialog.Trigger>

    <Dialog.Content style={{ maxWidth: 450 }}>
      <Dialog.Title>Login</Dialog.Title>
      <Dialog.Description size="2" mb="4">
        Log into your account.
      </Dialog.Description>

      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Email
          </Text>
          <TextField.Input defaultValue="Freja Johnsen" placeholder="Enter your email" />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Password
          </Text>
          <TextField.Input defaultValue="freja@example.com" placeholder="Enter your password" />
        </label>
      </Flex>

      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button>Save</Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  </Dialog.Root>
);
export default DialogDemo;
