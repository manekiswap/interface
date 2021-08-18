import { Currency, CurrencyAmount, Token } from '@uniswap/sdk-core';
import numbro from 'numbro';
import { FocusEvent, MouseEvent, useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Button, Flex, FlexProps, Input, Text } from 'theme-ui';

import { formatAmount } from '../../utils/numbers';
import { combineClassNames } from '../../utils/renders';
import TokenLogo from '../logos/token.logo';

interface Props extends Omit<FlexProps, 'sx'> {
  token?: Currency;
  balance?: CurrencyAmount<Token>;
  onSelect: () => void;
}

export default function TokenAmountPickerInput(props: Props) {
  const { className, token, balance, onSelect, onFocus, ...rest } = props;
  const [focused, setFocused] = useState(false);

  const _onClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      setFocused(false);
      onSelect && onSelect();
    },
    [onSelect],
  );

  const _onFocus = useCallback(
    (e: FocusEvent<HTMLDivElement>) => {
      setFocused(true);
      onFocus && onFocus(e);
    },
    [onFocus],
  );

  const buttonClassName = useMemo(() => {
    let _className = '';

    if (focused) {
      _className = combineClassNames(_className, 'focused');
    }
    return _className.trim();
  }, [focused]);

  return (
    <Flex
      className={className}
      sx={{
        backgroundColor: 'dark.transparent',
        borderRadius: 'base',
        height: 76,
        paddingX: 16,
        paddingTop: 14,
        paddingBottom: 12,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
      onFocus={_onFocus}
    >
      {token ? (
        <Flex sx={{ height: 28, width: '100%', alignItems: 'center' }}>
          <Button variant="buttons.extra-small-ghost" sx={{ padding: 0, color: '#FFFFFF' }} onClick={_onClick}>
            <TokenLogo token={token} />
            <Text sx={{ marginLeft: 12 }}>{token.symbol}</Text>
          </Button>
          <Input
            sx={{ flex: 1, height: 28, marginLeft: 16, textAlign: 'right', fontSize: 2, fontWeight: 'bold' }}
            placeholder={'0.0'}
          />
        </Flex>
      ) : (
        <Button variant="buttons.extra-small-primary" className={buttonClassName} onClick={_onClick}>
          Select a token
          <FiChevronDown />
        </Button>
      )}
      {token && (
        <Flex sx={{ height: 20, width: '100%', alignItems: 'center' }}>
          <Text sx={{ fontSize: 0, fontWeight: 'bold', color: 'white.200', marginLeft: 36 }}>{`Balance: ${
            parseFloat(balance?.toExact() || '0') === 0 ? 0 : formatAmount(parseFloat(balance?.toExact() || '0'))
          } ${token?.symbol}`}</Text>
        </Flex>
      )}
    </Flex>
  );
}
