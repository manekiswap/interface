import { FocusEvent, forwardRef, InputHTMLAttributes, useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { Flex, Input, Label, Text } from 'theme-ui';

import { combineClassNames } from '../../utils/utils';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const FormInput = forwardRef((props: Omit<Props, 'sx'>) => {
  const { className, label, error, id, disabled, onBlur, onFocus, ...rest } = props;
  const [focused, setFocused] = useState(false);

  const _onFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus && onFocus(e);
    },
    [onFocus],
  );

  const _onBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur && onBlur(e);
    },
    [onBlur],
  );

  const inputClassName = useMemo(() => {
    let _className = '';
    if (disabled) {
      _className = combineClassNames(_className, 'disabled');
    }
    if (!!error) {
      _className = combineClassNames(_className, 'error');
    }
    if (focused) {
      _className = combineClassNames(_className, 'focused');
    }
    return _className.trim();
  }, [disabled, error, focused]);

  return (
    <Flex className={className} sx={{ flexDirection: 'column' }}>
      <Flex variant="styles.form-input" className={inputClassName}>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Input id={id} onBlur={_onBlur} onFocus={_onFocus} {...rest} />
      </Flex>
      {error && <Text sx={{ fontSize: 0, fontWeight: 'medium', color: 'error', marginTop: '4px' }}>{error}</Text>}
    </Flex>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
