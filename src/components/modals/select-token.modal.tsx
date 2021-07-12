import { Modal, ModalContent, ModalFooter, ModalTitle } from '@mattjennings/react-modal';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { FiList } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useToggle } from 'react-use';
import { FixedSizeList as List } from 'react-window';
import { Button, Divider, Flex, Heading, Text } from 'theme-ui';

import { COMMON_TOKENS } from '../../constants/token';
import useSearchToken from '../../hooks/useSearchToken';
import { app } from '../../reducers';
import { SerializedToken, ShortToken } from '../../reducers/types';
import FormInput from '../forms/form.input';
import TokenLogo from '../logo/token.logo';
import Tag from '../tag/tag';
import TokenListModal from './token-list.modal';

interface Props {
  active: boolean;
  title: string;
  onOpen?: () => void;
  onClose: (token: ShortToken | undefined) => void;
}

export default function SelectTokenModal(props: Props) {
  const { active, title, onClose, onOpen } = props;
  const [searchText, setSearchText] = useState('');
  const [activeManageList, toggleManageList] = useToggle(false);

  const chainId = useSelector(app.selectors.user.selectCurrentChainId);
  const selectTokenMap = useCallback(app.selectors.list.makeSelectTokenMap(chainId), [chainId]);
  const tokenMap = useSelector(selectTokenMap);

  const searchTokens = useSearchToken(searchText);

  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // need ways to solve the lowercase and uppercase compare for unique token address
  const actualTokens = useMemo(() => {
    let tokens: SerializedToken[] = [];
    if (searchText !== '') {
      tokens = searchTokens;
    } else {
      tokens = Object.values(tokenMap);
    }

    return tokens.sort((a, b) => {
      if (!a.symbol || !b.symbol) return 0;
      return a.symbol.localeCompare(b.symbol);
    });
  }, [searchText, searchTokens, tokenMap]);

  useEffect(() => {
    if (!active) return;
    onOpen && onOpen();
  }, [active, onOpen]);

  const _onClose = (token: ShortToken | undefined) => {
    onClose(token);
  };

  return (
    <>
      <Modal
        allowClose={true}
        closeOnOutsideClick={false}
        fullScreen={false}
        onClose={() => _onClose(undefined)}
        open={active}
        width={600}
      >
        <ModalTitle>
          <Heading as="h5" variant="styles.h5">
            {title}
          </Heading>
        </ModalTitle>

        <ModalContent sx={{ flexDirection: 'column' }}>
          <FormInput placeholder="Select name or paste address" onChange={_onChange} />
          <Text sx={{ paddingY: 16, color: 'label' }}>Common bases</Text>
          <Flex sx={{ justifyContent: 'flex-start', flexWrap: 'wrap', margin: '-4px' }}>
            {COMMON_TOKENS.map((token) => (
              <Tag
                key={token.address}
                leftIcon={<TokenLogo address={token.address} />}
                onClick={() => {
                  onClose(token);
                }}
              >
                {token.symbol}
              </Tag>
            ))}
          </Flex>
          <Divider sx={{ marginY: 16 }} />
          <Text sx={{ color: 'label' }}>Select from list</Text>
          <List
            height={256}
            itemCount={actualTokens.length}
            itemSize={60}
            width={'100%'}
            itemData={actualTokens}
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
            {({ index, data, style }) => {
              const token = data[index];
              return (
                <Button
                  variant="styles.row"
                  key={token.address}
                  style={style}
                  onClick={() => {
                    onClose(token);
                  }}
                >
                  <TokenLogo address={token.address} logoURI={token.logoURI} />
                  <Flex sx={{ flexDirection: 'column', marginLeft: 12 }}>
                    <Text sx={{ fontSize: 1, fontWeight: 'medium' }}>{token.symbol}</Text>
                    <Text sx={{ color: 'secondary', fontSize: 0, fontWeight: 'medium' }}>{token.name}</Text>
                  </Flex>
                </Button>
              );
            }}
          </List>
        </ModalContent>

        <ModalFooter sx={{ justifyContent: 'center' }}>
          <Button
            variant="buttons.small-link"
            onClick={() => {
              toggleManageList(true);
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
          toggleManageList(false);
        }}
      />
    </>
  );
}
