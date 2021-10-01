import { Currency } from '@manekiswap/sdk';
import { Button, ButtonProps, Flex, Label, Text } from '@theme-ui/components';
import { FocusEvent, MouseEvent, useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import { combineClassNames } from '../../utils/renders';
import TokenLogo from '../logos/token.logo';

interface Props extends Omit<ButtonProps, 'sx'> {
  label?: string;
  token?: Currency;
}

export default function TokenPickerInput(props: Props) {
  const { className, label, token, id, disabled, onBlur, onClick, onFocus, ...rest } = props;
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
    let _className = '';
    if (disabled) {
      _className = combineClassNames(_className, 'disabled');
    }
    if (focused) {
      _className = combineClassNames(_className, 'focused');
    }
    return _className.trim();
  }, [disabled, focused]);

  return (
    <Flex
      className={className}
      sx={{ flexDirection: 'column', backgroundColor: 'dark.transparent', borderRadius: 'base' }}
    >
      <Button
        variant="styles.picker-input"
        className={buttonClassName}
        onBlur={_onBlur}
        onClick={_onClick}
        onFocus={_onFocus}
      >
        <Label htmlFor={id}>{label}</Label>
        <Flex className="content">
          {token ? (
            <Flex sx={{ justifyContent: 'flex-start' }}>
              <TokenLogo currency={token} />
              <Text sx={{ marginLeft: 12 }}>{token.symbol}</Text>
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
