import { MouseEvent, useCallback, useState } from 'react';
import { Button, Text } from 'theme-ui';

interface Props {
  active: boolean;
  label: string;
  onToggle: (value: boolean) => void;
}

export default function Toggle(props: Props) {
  const { active, label, onToggle } = props;

  const _onClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      onToggle(!active);
    },
    [active, onToggle],
  );

  return (
    <Button
      variant="buttons.ghost"
      sx={{
        backgroundColor: active ? 'primary' : 'white.300',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        height: 60,
        width: 60,
        '&:hover': { backgroundColor: active ? 'primary' : 'white.300' },
      }}
      onClick={_onClick}
    >
      <Text sx={{ color: 'background' }}>{label}</Text>
    </Button>
  );
}
