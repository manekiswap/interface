import { ButtonHTMLAttributes } from 'react';
import { Button, Text } from 'theme-ui';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  children?: string | number;
}

export default function Tag(props: Props) {
  const { leftIcon, children, ...rest } = props;

  return (
    <Button
      variant="buttons.small-secondary"
      sx={{
        height: 32,
        paddingX: '8px',
        margin: '4px',
        borderRadius: 'lg',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...rest}
    >
      {leftIcon && leftIcon}
      <Text variant="caps" sx={{ marginLeft: '4px', fontWeight: 'medium' }}>
        {children}
      </Text>
    </Button>
  );
}
