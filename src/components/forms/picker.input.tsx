import { FocusEvent, useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Flex, Input, Label, Text } from 'theme-ui';

import { combineClassNames } from '../../utils';

interface Props {
  id?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  error?: string;
  placeholder?: string;
}

export default function PickerInput(props: Props) {
  const { id, disabled, label, name, placeholder, error } = props;
  const [focused, setFocused] = useState(false);

  const onFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
    setFocused(true);
  }, []);

  const onBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
    setFocused(false);
  }, []);

  const className = useMemo(() => {
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
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex variant="styles.form-input" className={className}>
        <Label htmlFor={id}>{label}</Label>
        <Flex>
          <Input name={name} id={id} placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} />
          <FiChevronDown />
        </Flex>
      </Flex>
      {error && <Text sx={{ fontSize: 0, fontWeight: 'medium', color: 'red.200', marginTop: '4px' }}>{error}</Text>}
    </Flex>
  );
}
