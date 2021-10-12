import { Currency } from '@manekiswap/sdk';
import { Flex, FlexProps, Heading, Text } from '@theme-ui/components';

import { mediaWidthTemplates } from '../../../constants/media';

interface Props extends Omit<FlexProps, 'sx'> {
  from?: Currency;
  to?: Currency;
}

export default function TokenScoreHeaderView(props: Props) {
  const { className, from, to } = props;

  return (
    <Flex
      className={className}
      sx={{
        transition: 'opacity 0.3s, visibility 0.3s',
        position: 'fixed',
        top: 80,
        paddingX: 28,
        paddingY: 12,
        backgroundColor: 'dark.400',
        borderBottom: '1px solid #3C3F5A',
        ...mediaWidthTemplates.upToExtraSmall({ display: 'none' }),
      }}
    >
      {from && (
        <Flex
          sx={{
            width: '50%',
            borderRadius: 'lg',
            padding: '8px 12px',
            backgroundColor: 'dark.300',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: 12,
          }}
        >
          <Flex sx={{ alignItems: 'center' }}>
            <Text variant="body200" sx={{ marginRight: 16 }}>{`${from.symbol ?? ''}`}</Text>
            <Flex sx={{ padding: '4px 8px', backgroundColor: 'green.transparent', borderRadius: 'lg' }}>
              <Text variant="subtitle" sx={{ color: 'green.200' }}>
                ON SALE
              </Text>
            </Flex>
          </Flex>
          <Flex sx={{ alignItems: 'center' }}>
            <Flex
              sx={{
                width: 96,
                height: 8,
                backgroundColor: 'dark.400',
                borderRadius: 100,
                justifyContent: 'flex-end',
                overflow: 'hidden',
                marginRight: 16,
              }}
            >
              <Flex
                sx={{
                  height: '100%',
                  width: `${(10 / 18) * 100}%`,
                  backgroundColor: 'green.200',
                  borderRadius: 100,
                }}
              />
            </Flex>
            <Flex sx={{ color: 'green.200', alignItems: 'flex-end' }}>
              <Heading variant="styles.h5">{'10'}</Heading>
              <Text variant="body300" sx={{ fontSize: 0 }}>
                /{'18'}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      )}

      {to && (
        <Flex
          sx={{
            width: '50%',
            borderRadius: 'lg',
            padding: '8px 12px',
            backgroundColor: 'dark.300',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Flex sx={{ alignItems: 'center' }}>
            <Text variant="body200" sx={{ marginRight: 16 }}>{`${to.symbol ?? ''}`}</Text>
            <Flex sx={{ padding: '4px 8px', backgroundColor: 'green.transparent', borderRadius: 'lg' }}>
              <Text variant="subtitle" sx={{ color: 'green.200' }}>
                ON SALE
              </Text>
            </Flex>
          </Flex>
          <Flex sx={{ alignItems: 'center' }}>
            <Flex
              sx={{
                width: 96,
                height: 8,
                backgroundColor: 'dark.400',
                borderRadius: 100,
                justifyContent: 'flex-end',
                overflow: 'hidden',
                marginRight: 16,
              }}
            >
              <Flex
                sx={{
                  height: '100%',
                  width: `${(10 / 18) * 100}%`,
                  backgroundColor: 'green.200',
                  borderRadius: 100,
                }}
              />
            </Flex>
            <Flex sx={{ color: 'green.200', alignItems: 'flex-end' }}>
              <Heading variant="styles.h5">{'10'}</Heading>
              <Text variant="body300" sx={{ fontSize: 0 }}>
                /{'18'}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
