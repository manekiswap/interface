import { Currency, Price } from '@manekiswap/sdk';
import { useCallback, useState } from 'react';
import { Button, Flex, FlexProps } from 'theme-ui';

interface Props extends Omit<FlexProps, 'sx'> {
  price: Price<Currency, Currency>;
}

export default function SwapPriceInfo(props: Props) {
  const { className, price } = props;
  const [showInverted, setShowInverted] = useState(false);

  let formattedPrice: string;

  try {
    formattedPrice = showInverted ? price.toSignificant(4) : price.invert()?.toSignificant(4);
  } catch (error) {
    formattedPrice = '0';
  }

  const label = showInverted ? `${price.quoteCurrency?.symbol}` : `${price.baseCurrency?.symbol} `;

  const labelInverted = showInverted ? `${price.baseCurrency?.symbol} ` : `${price.quoteCurrency?.symbol}`;
  const text = `${'1 ' + labelInverted + ' = ' + formattedPrice ?? '-'} ${label}`;

  const _handleInvert = useCallback(() => {
    setShowInverted((v) => !v);
  }, []);

  return (
    <Flex className={className} sx={{ alignItems: 'center' }}>
      <Button
        variant="buttons.small-ghost"
        sx={{ padding: 0, height: 'initial', color: 'yellow.400' }}
        onClick={_handleInvert}
      >
        {text}
      </Button>
    </Flex>
  );
}