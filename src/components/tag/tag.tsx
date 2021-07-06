import { Flex, Text } from 'theme-ui';

interface Props {
  leftIcon?: React.ReactNode;
  children?: string | number;
}

export default function Tag(props: Props) {
  const { leftIcon, children } = props;

  return (
    <Flex
      sx={{
        height: 32,
        paddingX: '8px',
        borderRadius: 'lg',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {leftIcon && leftIcon}
      <Text variant="caps" sx={{ marginLeft: '4px', fontWeight: 'medium' }}>
        {children}
      </Text>
    </Flex>
  );
}
