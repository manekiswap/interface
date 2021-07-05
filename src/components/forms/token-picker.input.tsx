import { ButtonHTMLAttributes, FocusEvent, useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Button, Flex, Label, Text, ThemeUICSSObject } from 'theme-ui';

import { ShortToken } from '../../reducers/types';
import { combineClassNames } from '../../utils/utils';
import TokenLogo from '../logo/token.logo';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  token?: ShortToken;

  wrapperStyle?: ThemeUICSSObject;
}

export default function TokenPickerInput(props: Omit<Props, 'sx'>) {
  const { label, token, wrapperStyle, id, disabled, onBlur, onFocus, ...rest } = props;
  const [focused, setFocused] = useState(false);

  const _onFocus = useCallback(
    (e: FocusEvent<HTMLButtonElement>) => {
      setFocused(true);
      onFocus && onFocus(e);
    },
    [onFocus],
  );

  const _onBlur = useCallback(
    (e: FocusEvent<HTMLButtonElement>) => {
      setFocused(false);
      onBlur && onBlur(e);
    },
    [onBlur],
  );

  const className = useMemo(() => {
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
    <Flex sx={{ flexDirection: 'column', backgroundColor: 'dark.transparent', ...wrapperStyle }}>
      <Button variant="styles.picker-input" className={className} onFocus={_onFocus} onBlur={_onBlur}>
        <Label htmlFor={id}>{label}</Label>
        <Flex className="content">
          {token ? (
            <Flex sx={{ justifyContent: 'flex-start' }}>
              <TokenLogo address={token.address} />
              <Text sx={{ marginLeft: 12 }}>{token.symbol}</Text>
            </Flex>
          ) : (
            <Flex sx={{ justifyContent: 'flex-start' }}>
              <Text color="placeholder">Select a token</Text>
            </Flex>
          )}
          <FiChevronDown sx={{ height: 24, width: 24, color: 'blue.300' }} />
        </Flex>
      </Button>
    </Flex>
  );
}
