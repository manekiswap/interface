import { ChangeEvent, useState } from 'react';
import { Button, Flex, Heading, Text } from 'theme-ui';

import useToken from '../../../hooks/useToken';
import FormInput from '../../forms/form.input';
import TokenLogo from '../../logo/token.logo';

interface Props {
  active: boolean;
}

export default function ManageToken(props: Props) {
  const { active } = props;
  const [searchText, setSearchText] = useState('');

  const token = useToken(searchText);

  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <Flex
      sx={{
        display: active ? 'flex' : 'none',
        flexDirection: 'column',
        height: 480,
      }}
    >
      <FormInput placeholder="Input token address" sx={{ width: '100%', marginTop: '16px' }} onChange={_onChange} />
      {!token ? (
        <div />
      ) : (
        <>
          <Flex sx={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <Text sx={{ width: '100%', textAlign: 'center', marginTop: 76 }}>
              This token doesn’t appear on the active token list. Make sure this is the token you want to trade.
            </Text>
            <TokenLogo token={token} sx={{ height: 52, width: 52, marginTop: 24 }} />
            <Heading as="h6" variant="styles.h6" sx={{ marginTop: '8px' }}>
              {token.symbol}
            </Heading>
            <Text sx={{ fontSize: 12, fontWeight: 'medium', color: 'white.100' }}>{token.name}</Text>
            <Flex
              sx={{
                marginTop: 12,
                height: 24,
                paddingX: '8px',
                alignItems: 'center',
                backgroundColor: 'rgba(92, 92, 92, 0.3)',
              }}
            >
              <Text sx={{ fontSize: 12, fontWeight: 'medium', color: 'blue.300' }}>{token.address}</Text>
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
        </>
      )}
    </Flex>
  );
}
