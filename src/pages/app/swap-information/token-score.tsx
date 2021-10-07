import { Currency } from '@manekiswap/sdk';
import { Flex, FlexProps, Heading, Text } from '@theme-ui/components';
import { forwardRef } from 'react';

interface Props extends Omit<FlexProps, 'sx'> {
  token?: Currency;
}

const TokenScore = forwardRef((props: Props, ref: any) => {
  const { className, token } = props;

  const score = 10;
  const totalScore = 18;

  if (!token) {
    return (
      <Flex
        ref={ref}
        className={className}
        sx={{
          border: '1px solid #3C3F5A',
          borderRadius: 'lg',
          backgroundColor: 'dark.500',
          justifyContent: 'center',
          alignItems: 'center',
          paddingY: 22,
        }}
      >
        <Text variant="body100">Token score will be shown here</Text>
      </Flex>
    );
  }

  return (
    <Flex
      ref={ref}
      className={className}
      sx={{
        border: '1px solid #3C3F5A',
        borderRadius: 'lg',
        flexDirection: 'column',
        backgroundColor: 'dark.500',
        padding: 12,
      }}
    >
      <Flex
        sx={{
          borderRadius: 'lg',
          padding: '14px 12px',
          backgroundColor: 'dark.400',
          flexDirection: 'column',
        }}
      >
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Text variant="body200">{`${token.symbol ?? ''} Score`}</Text>
          <Flex sx={{ padding: '4px 8px', backgroundColor: 'green.transparent', borderRadius: 'lg' }}>
            <Text variant="subtitle" sx={{ color: 'green.200' }}>
              ON SALE
            </Text>
          </Flex>
        </Flex>
        <Flex sx={{ marginTop: '6px', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Flex sx={{ color: 'green.200', alignItems: 'baseline' }}>
            <Heading variant="styles.h4">{score}</Heading>
            <Text variant="body300">/{totalScore}</Text>
          </Flex>
          <Flex
            sx={{
              width: 192,
              height: 8,
              backgroundColor: 'dark.300',
              borderRadius: 100,
              justifyContent: 'flex-end',
              overflow: 'hidden',
            }}
          >
            <Flex
              sx={{
                height: '100%',
                width: `${(score / totalScore) * 100}%`,
                backgroundColor: 'green.200',
                borderRadius: 100,
              }}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex sx={{ marginTop: 14, paddingX: 18, justifyContent: 'space-between' }}>
        <Text variant="body100">Momentum</Text>
        <Text variant="body100" sx={{ color: 'green.200' }}>
          3/3
        </Text>
      </Flex>
      <Flex sx={{ marginTop: 12, paddingX: 18, justifyContent: 'space-between' }}>
        <Text variant="body100">Ownership</Text>
        <Text variant="body100" sx={{ color: 'green.200' }}>
          3/3
        </Text>
      </Flex>
      <Flex sx={{ marginTop: 14, paddingX: 18, justifyContent: 'space-between' }}>
        <Text variant="body100">Fundamental</Text>
        <Text variant="body100" sx={{ color: 'orange.200' }}>
          4/10
        </Text>
      </Flex>
    </Flex>
  );
});

TokenScore.displayName = 'TokenScore';

export default TokenScore;
