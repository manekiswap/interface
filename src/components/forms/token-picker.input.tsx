import { FocusEvent, MouseEvent, useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Button, ButtonProps, Flex, Label, Text } from 'theme-ui';

import { app } from '../../reducers';
import { ShortToken } from '../../reducers/types';
import { combineClassNames } from '../../utils/utils';
import TokenLogo from '../logo/token.logo';

interface Props extends ButtonProps {
  label?: string;
  token?: ShortToken;
}

export default function TokenPickerInput(props: Omit<Props, 'sx'>) {
  const { className, label, token, id, disabled, onBlur, onClick, onFocus, ...rest } = props;
  const [focused, setFocused] = useState(false);
  const selectDefaultLogoURI = useCallback(app.selectors.list.makeSelectDefaultLogoURI(token || ({} as ShortToken)), [
    token,
  ]);
  const logoURI = useSelector(selectDefaultLogoURI);

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
    <Flex className={className} sx={{ flexDirection: 'column', backgroundColor: 'dark.transparent' }}>
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
              <TokenLogo address={token.address} logoURI={logoURI} />
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
