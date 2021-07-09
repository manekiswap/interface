import { Button, Flex, Heading, Text } from 'theme-ui';

import FormInput from '../../forms/form.input';
import TokenLogo from '../../logo/token.logo';

interface Props {
  active: boolean;
}

export default function ManageList(props: Props) {
  const { active } = props;
  return (
    <Flex
      sx={{
        display: active ? 'flex' : 'none',
        flexDirection: 'column',
        height: 480,
      }}
    >
      <FormInput placeholder="Input token address" sx={{ width: '100%', marginTop: '16px' }} />
      <Flex sx={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <Text sx={{ width: '100%', textAlign: 'center', marginTop: 76 }}>
          This token doesn’t appear on the active token list. Make sure this is the token you want to trade.
        </Text>
        <TokenLogo address="" sx={{ height: 52, width: 52, marginTop: 24 }} />
        <Heading as="h6" variant="styles.h6" sx={{ marginTop: '8px' }}>
          REV
        </Heading>
        <Text sx={{ fontSize: 12, fontWeight: 'medium', color: 'white.100' }}>Revain</Text>
        <Flex
          sx={{
            marginTop: 12,
            height: 24,
            paddingX: '8px',
            alignItems: 'center',
            backgroundColor: 'rgba(92, 92, 92, 0.3)',
          }}
        >
          <Text sx={{ fontSize: 12, fontWeight: 'medium', color: 'blue.300' }}>
            0xF59ae934f6fe444afC309586cC60a84a0F89Aaea
          </Text>
        </Flex>
      </Flex>
      <Button
        variant="buttons.small-primary"
        sx={{ width: '100%' }}
        onClick={() => {
          console.log('');
        }}
      >
        Import
      </Button>
    </Flex>
  );
}
