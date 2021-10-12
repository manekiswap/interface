import { Currency } from '@manekiswap/sdk';
import { useState } from 'react';
import { FiArrowDown, FiArrowUp, FiInfo } from 'react-icons/fi';
import { Box, Flex, FlexProps, Heading, Text } from 'theme-ui';

import TokenLogo from '../../../components/logos/token.logo';
import TokenInfoModal from '../../../components/modals/token-info.modal';
import { mediaWidthTemplates } from '../../../constants/media';

interface Props extends Omit<FlexProps, 'sx'> {
  token?: Currency;
}

export default function TokenInfo(props: Props) {
  const { className, token } = props;
  const [activeModal, setActiveModal] = useState(false);

  const handleOpenModal = () => {
    setActiveModal(true);
  };

  const handleCloseModal = () => {
    setActiveModal(false);
  };

  if (!token) {
    return (
      <Flex
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
        <Text variant="body100">Token info will be shown here</Text>
      </Flex>
    );
  }

  return (
    <>
      <TokenInfoModal token={token} active={activeModal} onClose={handleCloseModal} />
      <Flex
        className={className}
        sx={{
          border: '1px solid #3C3F5A',
          borderRadius: 'lg',
          backgroundColor: 'background',
          flexDirection: 'column',
        }}
      >
        <Flex sx={{ padding: 12, borderBottom: '1px solid #3C3F5A' }}>
          <TokenLogo currency={token} sx={{ mr: 12 }} />
          <Box sx={{ width: '50%' }}>
            <Flex sx={{ alignItems: 'center' }}>
              <Heading variant="styles.h5">{token.symbol}</Heading>
              <FiInfo onClick={handleOpenModal} sx={{ height: 16, width: 16, marginLeft: 12, cursor: 'pointer' }} />
            </Flex>
            <Text variant="caps200" sx={{ color: 'dark.200' }}>
              Rank #2
            </Text>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Text variant="body300">$2,880.35</Text>
            <Flex sx={{ alignItems: 'center', color: 'red.200' }}>
              <FiArrowDown
                sx={{
                  stroke: 'currentColor',
                }}
              />
              <Text variant="caps100">7.18%</Text>
            </Flex>
          </Box>
        </Flex>
        <Flex sx={{ padding: 12, paddingY: 16, paddingLeft: 48 }}>
          <Flex
            sx={{
              flexDirection: 'column',
              width: '50%',
              ...mediaWidthTemplates.upToMedium({
                marginLeft: -32,
                marginRight: 32,
              }),
            }}
          >
            <Text variant="caps200" sx={{ color: 'dark.200', marginBottom: '4px' }}>
              Market cap
            </Text>
            <Text
              sx={{
                variant: 'text.caps300',
                ...mediaWidthTemplates.upToMedium({
                  variant: 'text.body300',
                }),
              }}
            >
              $336,228,893,722
            </Text>
            <Flex sx={{ alignItems: 'center', color: 'red.200' }}>
              <FiArrowDown
                sx={{
                  stroke: 'currentColor',
                }}
              />
              <Text variant="caps100">7.18%</Text>
            </Flex>
            <Text variant="caps200" sx={{ marginTop: 22, color: 'dark.200' }}>
              Circulating Supply
            </Text>
            <Text
              sx={{
                variant: 'text.caps300',
                ...mediaWidthTemplates.upToMedium({
                  variant: 'text.body300',
                }),
              }}
            >
              117,664,980.62 ETH
            </Text>
          </Flex>
          <Flex sx={{ flexDirection: 'column', width: '50%' }}>
            <Text variant="caps200" sx={{ color: 'dark.200', marginBottom: '4px' }}>
              Volume 24h
            </Text>
            <Text
              sx={{
                variant: 'text.caps300',
                ...mediaWidthTemplates.upToMedium({
                  variant: 'text.body300',
                }),
              }}
            >
              $24,709,262,086
            </Text>
            <Flex sx={{ alignItems: 'center', color: 'green.200' }}>
              <FiArrowUp
                sx={{
                  stroke: 'currentColor',
                }}
              />
              <Text variant="caps100">49.88%</Text>
            </Flex>
            <Text variant="caps200" sx={{ marginTop: 22, color: 'dark.200' }}>
              Total Supply
            </Text>
            <Text
              sx={{
                variant: 'text.caps300',
                ...mediaWidthTemplates.upToMedium({
                  variant: 'text.body300',
                }),
              }}
            >
              117,666,138
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
