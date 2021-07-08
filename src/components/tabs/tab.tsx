import { ButtonHTMLAttributes } from 'react';
import { Button, ButtonProps } from 'theme-ui';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {
  active: boolean;
}

export default function Tab(props: Props) {
  const { className, active, children, ...rest } = props;

  return (
    <Button
      className={className}
      variant="buttons.small-ghost"
      sx={{
        borderRadius: 0,
        borderBottom: active ? '2px solid' : 'none',
        borderColor: 'yellow.400',
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
