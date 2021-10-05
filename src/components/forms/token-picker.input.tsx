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

export default function TokenPickerInput(props: Props) {
  const { className, label, currency: token, id, disabled, onBlur, onClick, onFocus, ...rest } = props;
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
    <Flex
      className={className}
      sx={{ flexDirection: 'column', borderRadius: 'lg', backgroundColor: 'dark.transparent' }}
    >
      <Button
        variant="styles.picker-input"
        className={buttonClassName}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingX: 0,
          paddingY: 0,
          height: 60,
          pointerEvents: 'auto',
          backgroundColor: 'transparent',
        }}
        onBlur={_onBlur}
        onClick={_onClick}
        onFocus={_onFocus}
      >
        <Label
          htmlFor={id}
          sx={{
            paddingTop: '4px',
            paddingBottom: '4px',
            paddingX: 12,
            fontFamily: 'body',
            fontSize: 0,
            fontWeight: 'medium',
            lineHeight: 0,
            color: 'white.300',
          }}
        >
          {label}
        </Label>
        <Flex
          sx={{ width: '100%', paddingX: 12, color: 'text', justifyContent: 'space-between', alignItems: 'center' }}
        >
          {token ? (
            <Flex>
              <TokenLogo currency={token} />
              <Text sx={{ marginLeft: 12 }}>{token.symbol}</Text>
            </Flex>
          ) : (
            <Flex>
              <Text
                color="placeholder"
                sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: 'white.200' }}
              >
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
