import { Currency, NativeCurrency } from '@manekiswap/sdk';
import { Modal, ModalContent, ModalFooter, ModalTitle } from '@mattjennings/react-modal';
import { Button, Divider, Flex, Heading, Text } from '@theme-ui/components';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { FiList } from 'react-icons/fi';
import { FixedSizeList as List } from 'react-window';

import { COMMON_BASES } from '../../constants/routing';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import useDebounce from '../../hooks/useDebounce';
import { useMediaQueryMaxWidth } from '../../hooks/useMediaQuery';
import useSearchToken from '../../hooks/useSearchToken';
import useToggle from '../../hooks/useToggle';
import { useWindowSize } from '../../hooks/useWindowSize';
import FormInput from '../forms/form.input';
import TokenLogo from '../logos/token.logo';
import Tag from '../tags/tag';
import TokenListModal from './token-list.modal';

interface Props {
  active: boolean;
  title: string;
  disabledToken?: Currency;
  onOpen?: () => void;
  onClose: (token: Currency | undefined) => void;
}

export default function SelectTokenModal(props: Props) {
  const { active, title, disabledToken, onClose, onOpen } = props;
  const { chainId } = useActiveWeb3React();
  const { width = 0 } = useWindowSize();
  const [queryText, setQueryText] = useState('');
  const [activeManageList, toggleManageList] = useToggle(false);
  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');

  const debouncedQuery = useDebounce(queryText, 200);
  const searchTokens = useSearchToken(debouncedQuery);

  const commonTokens: Currency[] = useMemo(() => COMMON_BASES[chainId ?? -1] ?? [], [chainId]);

  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryText(e.target.value);
  };

  useEffect(() => {
    if (!active) return;
    onOpen && onOpen();
  }, [active, onOpen]);

  const _onClose = useCallback(
    (token: Currency | undefined) => {
      setQueryText('');
      onClose(token);
    },
    [onClose],
  );

  const Row = useCallback(
    ({ index, data, style }) => {
      const token: Currency = data[index];
      const key = token instanceof NativeCurrency ? 'ether' : token.address;
      const disabled = disabledToken && token.equals(disabledToken);
      return (
        <Button
          variant="styles.row"
          key={key}
          style={style}
          disabled={disabled}
          onClick={() => {
            _onClose(token);
          }}
        >
          <TokenLogo currency={token} />
          <Flex sx={{ flexDirection: 'column', marginLeft: 12 }}>
            <Text sx={{ fontSize: 1, fontWeight: 'medium', color: 'white.400' }}>{token.symbol}</Text>
            <Text sx={{ color: 'dark.200', fontSize: 0, fontWeight: 'medium' }}>{token.name}</Text>
          </Flex>
        </Button>
      );
    },
    [_onClose, disabledToken],
  );

  const itemKey = useCallback((index: number, data: typeof searchTokens) => {
    const token = data[index];
    return token.address;
  }, []);

  return (
    <>
      <Modal
        allowClose={true}
        closeOnOutsideClick={false}
        closeOnEscKey={false}
        fullScreen={false}
        onClose={() => _onClose(undefined)}
        open={active}
        width={Math.min(448, width - 32)}
      >
        <ModalTitle>
          <Heading variant={isUpToExtraSmall ? 'styles.h6' : 'styles.h4'}>{title}</Heading>
        </ModalTitle>

        <ModalContent sx={{ flexDirection: 'column' }}>
          <FormInput placeholder="Select name or paste address" onChange={_onChange} />
          <Text sx={{ color: 'white.300', marginTop: 16, marginBottom: '8px' }}>Common bases</Text>
          <Flex sx={{ justifyContent: 'flex-start', flexWrap: 'wrap', margin: '-4px' }}>
            {commonTokens.map((token) => {
              const key = token instanceof NativeCurrency ? 'ether' : token.address;
              const disabled = disabledToken && token.equals(disabledToken);
              return (
                <Tag
                  key={key}
                  leftIcon={<TokenLogo currency={token} />}
                  disabled={disabled}
                  sx={{ height: 32, border: '1px solid rgba(255, 255, 255, 0.2)' }}
                  onClick={() => {
                    _onClose(token);
                  }}
                >
                  {token.symbol}
                </Tag>
              );
            })}
          </Flex>
          <Divider sx={{ marginY: 16 }} />
          <Text sx={{ color: 'white.300', marginBottom: '8px' }}>Select from list</Text>
          <List
            height={256}
            itemSize={60}
            width={'100%'}
            itemData={searchTokens}
            itemCount={searchTokens.length}
            itemKey={itemKey}
            sx={{
              '&::-webkit-scrollbar-track': {},
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '8px',
                height: '80px',
                backgroundColor: 'rgba(92, 92, 92, 0.3)',
              },
            }}
          >
            {Row}
          </List>
        </ModalContent>

        <ModalFooter sx={{ justifyContent: 'center' }}>
          <Button
            variant="buttons.small-link"
            onClick={() => {
              toggleManageList();
            }}
          >
            <FiList sx={{ marginRight: '8px' }} />
            Manage token list
          </Button>
        </ModalFooter>
      </Modal>
      <TokenListModal
        active={activeManageList}
        onClose={() => {
          toggleManageList();
        }}
      />
    </>
  );
}
