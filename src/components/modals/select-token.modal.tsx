import { Modal, ModalContent, ModalFooter, ModalTitle } from '@mattjennings/react-modal';
import { useEffect } from 'react';
import { FiList } from 'react-icons/fi';
import { Button, Divider, Flex, Heading, Text } from 'theme-ui';

import { ShortToken } from '../../reducers/types';
import FormInput from '../forms/form.input';
import TokenLogo from '../logo/token.logo';
import Tag from '../tag/tag';

interface Props {
  active: boolean;
  title: string;
  onOpen?: () => void;
  onClose: (id: string, token: ShortToken) => void;
}

const CommonTokens: ShortToken[] = [
  {
    address: '',
    symbol: 'ETH',
  },
  {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    symbol: 'DAI',
  },
  {
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    symbol: 'USDC',
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
  },
  {
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    symbol: 'WBTC',
  },
];

export default function SelectTokenModal(props: Props) {
  const { active, title, onClose, onOpen } = props;

  useEffect(() => {
    if (!active) return;
    onOpen && onOpen();
  }, [active, onOpen]);

  const _onClose = () => {
    onClose('a', {} as ShortToken);
  };

  return (
    <Modal
      allowClose={true}
      closeOnOutsideClick={false}
      fullScreen={false}
      onClose={_onClose}
      open={active}
      width={600}
    >
      <ModalTitle>
        <Heading as="h5" variant="styles.h5">
          {title}
        </Heading>
      </ModalTitle>

      <ModalContent sx={{ flexDirection: 'column' }}>
        <FormInput placeholder="Select name or paste address" />
        <Text sx={{ paddingY: 16, color: 'label' }}>Common bases</Text>
        <Flex sx={{ justifyContent: 'flex-start', flexWrap: 'wrap', margin: '-4px', 'div ': { margin: '4px' } }}>
          {CommonTokens.map((token) => (
            <Tag key={token.address} leftIcon={<TokenLogo address={token.address} />}>
              {token.symbol}
            </Tag>
          ))}
        </Flex>
        <Divider sx={{ marginY: 16 }} />
        <Text sx={{ color: 'label' }}>Select from list</Text>
      </ModalContent>

      <ModalFooter sx={{ justifyContent: 'center' }}>
        <Button variant="buttons.small-link" onClick={_onClose}>
          <FiList sx={{ marginRight: '8px' }} />
          Manage token list
        </Button>
      </ModalFooter>
    </Modal>
  );
}
