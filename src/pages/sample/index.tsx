import { Button, Flex, Heading } from 'theme-ui';

import ArrowUp from '../../assets/images/icons/arrow-up-circle-fill.svg';

export default function SamplePage() {
  return (
    <Flex
      sx={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <Heading as="h1" variant="styles.h1" sx={{ color: 'white' }} />
        <Button variant="buttons.primary">Large button</Button>
        <Button variant="buttons.ghost">Large button</Button>
        <Button variant="buttons.link">Large button</Button>
        <Button variant="buttons.small-primary">Small button</Button>
        <Button variant="buttons.small-ghost">Small button</Button>
        <Button variant="buttons.small-link">Small button</Button>
        <Button variant="buttons.icon">
          <ArrowUp />
        </Button>
      </Flex>
    </Flex>
  );
}
