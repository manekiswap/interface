import { Currency } from '@manekiswap/sdk';
import { Button, Flex, FlexProps, Label, Text } from '@theme-ui/components';
import { FocusEvent, FocusEventHandler, MouseEvent, MouseEventHandler, useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import { combineClassNames } from '../../utils/renders';
import TokenLogo from '../logos/token.logo';

interface Props extends Omit<FlexProps, 'sx' | 'onBlur' | 'onClick' | 'onFocus'> {
  currency?: Currency;
  disabled?: boolean;
  label?: string;

  onBlur?: FocusEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
}

export default function CurrencyPickerInput(props: Props) {
  const { className, label, currency, disabled = false, id, onBlur, onClick, onFocus, ...rest } = props;
  const [focused, setFocused] = useState(false);

  const _onBlur = useCallback(
    (e: FocusEvent<HTMLButtonElement>) => {
      setFocused(false);
      onBlur && onBlur(e);
    },
    [onBlur],
  );

  const _onClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      setFocused(false);
      onClick && onClick(e);
    },
    [onClick],
  );

  const _onFocus = useCallback(
    (e: FocusEvent<HTMLButtonElement>) => {
      setFocused(true);
      onFocus && onFocus(e);
    },
    [onFocus],
  );

  const buttonClassName = useMemo(() => {
    return combineClassNames(disabled ? 'disabled' : '', focused ? 'focused' : '');
  }, [disabled, focused]);

  return (
    <Flex className={className} variant="styles.currency-picker-input" sx={{ flexDirection: 'column' }}>
      <Label
        htmlFor={id}
        sx={{
          height: 24,
          fontWeight: 'bold',
          fontFamily: 'body',
          fontSize: 1,
          color: 'title',
          marginBottom: '8px',
        }}
      >
        {label}
      </Label>
      <Button
        className={buttonClassName}
        variant="styles.currency-picker-button"
        onBlur={_onBlur}
        onClick={_onClick}
        onFocus={_onFocus}
      >
        <Flex className="content" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          {currency ? (
            <Flex sx={{ justifyContent: 'flex-start' }}>
              <TokenLogo currency={currency} />
              <Text sx={{ marginLeft: 12 }}>{currency.symbol}</Text>
            </Flex>
          ) : (
            <Flex sx={{ justifyContent: 'flex-start' }}>
              <Text color="placeholder" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                Select a token
              </Text>
            </Flex>
          )}
          <FiChevronDown sx={{ color: 'blue.300' }} />
        </Flex>
      </Button>
    </Flex>
  );
}
