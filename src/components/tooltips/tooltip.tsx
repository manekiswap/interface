import { Text } from '@theme-ui/components';
import React from 'react';
import { Position, Tooltip as TippyTooltip, Trigger } from 'react-tippy';

interface Props {
  className?: string;
  title?: string;
  html?: React.ReactElement;
  position?: Position;
  trigger?: Trigger;
}

const Tooltip: React.FC<Props> = ({ children, className, title, html, position = 'bottom', trigger }) => {
  const content = html ? (
    html
  ) : (
    <Text variant="caps100" sx={{ color: 'dark.500', display: 'block', textAlign: 'left', maxWidth: 300 }}>
      {title}
    </Text>
  );
  return (
    <TippyTooltip
      sx={{
        display: 'inline-flex',
        lineHeight: '0px',
      }}
      useContext
      className={className}
      html={content}
      position={position}
      trigger={trigger}
      arrow={true}
    >
      {children}
    </TippyTooltip>
  );
};

export default Tooltip;
