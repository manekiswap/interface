import { Button, Flex, Heading } from 'theme-ui';

import ArrowUp from '../../assets/images/icons/arrow-up-circle-fill.svg';
import FormInput from '../../components/forms/form.input';
import PickerInput from '../../components/forms/picker.input';

export default function SamplePage() {
  return (
    <Flex
      sx={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#D9761B',
      }}
    >
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Heading as="h1" variant="styles.h1" sx={{ color: 'white' }} />
        <Button variant="buttons.primary">Large button</Button>
        <Button variant="buttons.primary">
          <ArrowUp />
          Large button
        </Button>
        <Button variant="buttons.secondary">Large button</Button>
        <Button variant="buttons.ghost">Large button</Button>
        <Button variant="buttons.link">Large button</Button>
        <Button variant="buttons.icon">
          <ArrowUp />
        </Button>
      </Flex>
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Button variant="buttons.small-primary" disabled>
          Small button
        </Button>
        <Button variant="buttons.small-primary" disabled>
          Small button
          <ArrowUp />
        </Button>
        <Button variant="buttons.small-secondary" disabled>
          Small button
        </Button>
        <Button variant="buttons.small-ghost" disabled>
          Small button
        </Button>
        <Button variant="buttons.small-link" disabled>
          Small button
        </Button>
        <Button variant="buttons.icon" disabled>
          <ArrowUp />
        </Button>
      </Flex>
      <FormInput placeholder="hello world" disabled />
      <PickerInput label="Username" placeholder="hello world" />
    </Flex>
  );
}
