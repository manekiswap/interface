import { Modal, ModalContent, ModalFooter, ModalTitle } from '@mattjennings/react-modal';
import { Currency, NativeCurrency } from '@uniswap/sdk-core';
import { get } from 'lodash';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { FiList } from 'react-icons/fi';
import { FixedSizeList as List } from 'react-window';
import { Button, Divider, Flex, Heading, Text } from 'theme-ui';

import { ExtendedEther } from '../../constants/extended-ether';
import { COMMON_TOKENS } from '../../constants/token';
import useActiveChainId from '../../hooks/useActiveChainId';
import useDebounce from '../../hooks/useDebounce';
import { useMediaQueryMaxWidth } from '../../hooks/useMediaQuery';
import useSearchToken from '../../hooks/useSearchToken';
import useToggle from '../../hooks/useToggle';
import { useWindowSize } from '../../hooks/useWindowSize';
import { ShortToken } from '../../reducers/swap/types';
import FormInput from '../forms/form.input';
import TokenLogo from '../logos/token.logo';
import Tag from '../tags/tag';
import TokenListModal from './token-list.modal';

interface Props {
  active: boolean;
  title: string;
  disabledToken?: Currency;
  onOpen?: () => void;
  onClose: (token: ShortToken | undefined) => void;
}

export default function SelectTokenModal(props: Props) {
  const { active, title, disabledToken, onClose, onOpen } = props;
  const chainId = useActiveChainId();
  const { width = 0 } = useWindowSize();
  const [queryText, setQueryText] = useState('');
  const [activeManageList, toggleManageList] = useToggle(false);
  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');

  const debouncedQuery = useDebounce(queryText, 200);
  const searchTokens = useSearchToken(debouncedQuery);

  const commonTokens: Currency[] = useMemo(() => {
    const ether = ExtendedEther.onChain(chainId);
    return [ether, ...COMMON_TOKENS];
  }, [chainId]);

  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryText(e.target.value);
  };

  useEffect(() => {
    if (!active) return;
    onOpen && onOpen();
  }, [active, onOpen]);

  const _onClose = useCallback(
    (token: ShortToken | undefined) => {
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
            _onClose({
              chainId: token.chainId,
              address: get(token, 'address', ''),
              decimals: token.decimals,
              symbol: token.symbol,
              name: token.symbol,
            });
          }}
        >
          <TokenLogo token={token} />
          <Flex sx={{ flexDirection: 'column', marginLeft: 12 }}>
            <Text sx={{ fontSize: 1, fontWeight: 'medium' }}>{token.symbol}</Text>
            <Text sx={{ color: 'secondary', fontSize: 0, fontWeight: 'medium' }}>{token.name}</Text>
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
        fullScreen={false}
        onClose={() => _onClose(undefined)}
        open={active}
        width={Math.min(448, width - 32)}
      >
        <ModalTitle>
          <Heading as="h5" variant={isUpToExtraSmall ? 'styles.h6' : 'styles.h5'}>
            {title}
          </Heading>
        </ModalTitle>

        <ModalContent sx={{ flexDirection: 'column' }}>
          <FormInput placeholder="Select name or paste address" onChange={_onChange} />
          <Text sx={{ color: 'subtitle', marginTop: 16, marginBottom: '8px' }}>Common bases</Text>
          <Flex sx={{ justifyContent: 'flex-start', flexWrap: 'wrap', margin: '-4px' }}>
            {commonTokens.map((token) => {
              const key = token instanceof NativeCurrency ? 'ether' : token.address;
              const disabled = disabledToken && token.equals(disabledToken);
              return (
                <Tag
                  key={key}
                  leftIcon={<TokenLogo token={token} />}
                  disabled={disabled}
                  sx={{ height: 32, border: '1px solid rgba(255, 255, 255, 0.2)' }}
                  onClick={() => {
                    _onClose({
                      chainId: token.chainId,
                      address: get(token, 'address', ''),
                      decimals: token.decimals,
                      symbol: token.symbol,
                      name: token.symbol,
                    });
                  }}
                >
                  {token.symbol}
                </Tag>
              );
            })}
          </Flex>
          <Divider sx={{ marginY: 16 }} />
          <Text sx={{ color: 'subtitle', marginBottom: '8px' }}>Select from list</Text>
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
