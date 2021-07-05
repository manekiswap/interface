import { FiSettings } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Button, Flex, Heading, Text } from 'theme-ui';

import FormInput from '../../../components/forms/form.input';
import TokenPickerInput from '../../../components/forms/token-picker.input';
import { useTokenList } from '../../../hooks/tokens';
import { app } from '../../../reducers';

export default function SwapPage() {
  const [activeListUrl] = useSelector(app.selectors.list.selectListUrls);
  const { token0, token1 } = useSelector(app.selectors.swap.selectSwapPair);
  // const { data } = useTokenList(activeListUrl.url);
  // const { data: data2 } = useTokenList('t2crtokens.eth');

  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'muted',
      }}
    >
      <Flex sx={{ flexDirection: 'column', minWidth: 512 }}>
        <Heading as="h3" variant="styles.h3" sx={{ marginTop: 32, marginBottom: 12 }}>
          Swap
        </Heading>
        <Flex
          sx={{
            paddingX: 24,
            paddingY: '8px',
            flexDirection: 'column',
            backgroundColor: 'background',
            boxShadow: 'card',
            borderRadius: 'lg',
          }}
        >
          <Flex sx={{ marginY: 16, alignItems: 'center', justifyContent: 'space-between' }}>
            <Text sx={{ color: 'label' }}>Select a pair</Text>
            <Flex>
              <Button variant="buttons.small-link" sx={{ marginRight: 16 }}>
                Reset
              </Button>
              <Button variant="buttons.small-link">
                <FiSettings sx={{ marginRight: '8px' }} />
                Setting
              </Button>
            </Flex>
          </Flex>
          <Flex>
            <TokenPickerInput wrapperStyle={{ width: 172, marginRight: 16 }} label="From" token={token0} />
            <FormInput wrapperStyle={{ flex: 1 }} label="Amount" />
          </Flex>
          <Flex sx={{ marginTop: 16 }}>
            <TokenPickerInput wrapperStyle={{ width: 172, marginRight: 16 }} label="To" token={token1} />
            <FormInput wrapperStyle={{ flex: 1 }} label="Amount" />
          </Flex>
          <Button disabled sx={{ marginY: 24 }}>
            Swap
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
