import { FocusEvent, forwardRef, ReactNode, useCallback, useImperativeHandle, useRef } from 'react';
import { useMemo, useState } from 'react';
import { Flex, Input, InputProps, Label, Text } from 'theme-ui';

import { combineClassNames } from '../../utils/renders';

interface Props extends Omit<InputProps, 'sx'> {
  label?: string;
  leftNode?: ReactNode;
  error?: string;
}

const FormInput = forwardRef((props: Props, ref) => {
  const { className, label, leftNode, error, id, disabled, onBlur, onFocus, ...rest } = props;
  const [focused, setFocused] = useState(false);
  const inputRef = useRef();

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

  useImperativeHandle(
    ref,
    () =>
      ({
        changeValue: (newValue: string) => {
          (inputRef.current as any).value = newValue;
        },
      } as never),
  );

  return (
    <Flex className={className} sx={{ flexDirection: 'column', borderRadius: 'base' }}>
      <Flex variant="styles.form-input" className={inputClassName}>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Flex className="input-wrapper" sx={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 12 }}>
          {!!leftNode && leftNode}
          <Input id={id} ref={inputRef as any} type="text" onBlur={_onBlur} onFocus={_onFocus} {...rest} />
        </Flex>
      </Flex>
      {error && <Text sx={{ fontSize: 0, fontWeight: 'medium', color: 'error', marginTop: '4px' }}>{error}</Text>}
    </Flex>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
