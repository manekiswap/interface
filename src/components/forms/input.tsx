import { FocusEvent, useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { Flex, Input, Label, Text, ThemeUICSSObject } from 'theme-ui';

interface Props {
  id?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  error?: string;
  placeholder?: string;
}

export default function FormInput(props: Props) {
  const { id, disabled, label, name, placeholder, error } = props;
  const [focused, setFocused] = useState(false);

  const onFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
    setFocused(true);
  }, []);

  const onBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
    setFocused(false);
  }, []);

  const inputStyle: ThemeUICSSObject = useMemo(() => {
    if (!!error) {
      return {
        borderColor: 'red.200',
        '&>label': {
          color: 'red.200',
        },
      };
    }
    return {
      pointerEvents: disabled ? 'none' : 'auto',
      backgroundColor: disabled ? 'dark.400' : 'transparent',
      borderColor: focused ? 'blue.300' : 'white.100',
      '&>label': {
        color: focused ? 'blue.300' : 'white.300',
      },
    };
  }, [disabled, error, focused]);

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex variant="styles.form-input" className={!!error ? 'error' : ''} sx={inputStyle}>
        <Label htmlFor={id}>{label}</Label>
        <Input name={name} id={id} placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} />
      </Flex>
      {error && <Text sx={{ fontSize: 0, fontWeight: 'medium', color: 'red.200', marginTop: '4px' }}>{error}</Text>}
    </Flex>
  );
}
