import { useState } from 'react';
import { Button, Flex, FlexProps, Text } from 'theme-ui';

import { mediaWidthTemplates } from '../../constants/media';
import { Token } from '../../constants/token';

interface Props extends Omit<FlexProps, 'sx'> {
  basePrice: number;
  title: string;
  current?: Token;
  base: Token;
}

export default function PriceSlider(props: Props) {
  const { basePrice, className, title, current, base } = props;
  const [value, setValue] = useState(0);

  return (
    <Flex
      className={className}
      sx={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        border: '1px solid rgba(92, 92, 92, 0.3)',
        borderRadius: 'base',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '8px',
        paddingBottom: 12,
        paddingX: 30,
      }}
    >
      <Text sx={{ color: 'white.300', fontSize: 0 }}>{title}</Text>
      <Text sx={{ color: value > 0 ? 'white.400' : 'white.200', fontSize: 2 }}>{(1 + value) * basePrice}</Text>
      <Text sx={{ color: 'white.200', fontSize: 0 }}>{`${current?.symbol || ''} per ${base.symbol}`.trim()}</Text>
      <Flex sx={{ marginTop: '8px' }}>
        <Button
          variant="small-link"
          sx={{
            height: 28,
            width: 80,
            backgroundColor: 'dark.400',
            marginRight: 12,
            ...mediaWidthTemplates.upToExtraSmall({ width: 48 }),
          }}
          onClick={() => {
            setValue(value - 0.1 / 100);
          }}
        >
          -0.1%
        </Button>
        <Button
          variant="small-link"
          sx={{
            height: 28,
            width: 80,
            backgroundColor: 'dark.400',
            ...mediaWidthTemplates.upToExtraSmall({ width: 48 }),
          }}
          onClick={() => {
            setValue(value + 0.1 / 100);
          }}
        >
          +0.1%
        </Button>
      </Flex>
    </Flex>
  );
}
