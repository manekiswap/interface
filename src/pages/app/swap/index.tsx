import { Button, Flex, Heading, Text } from 'theme-ui';

export default function SwapPage() {
  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Flex sx={{ flexDirection: 'column', minWidth: 320 }}>
        <Heading as="h3" variant="styles.h3">
          Swap
        </Heading>
        <Flex sx={{ backgroundColor: 'muted', boxShadow: 'xl' }}>
          <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Select a pair</Text>
            <Flex>
              <Button variant="buttons.small-ghost">Reset</Button>
              <Button variant="buttons.small-ghost">Setting</Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
