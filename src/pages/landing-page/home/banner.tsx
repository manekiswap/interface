import { Flex, Heading, Text } from 'theme-ui';

import HeroImg from '../../../assets/images/landing-v3/hero.png';
import { mediaWidthTemplates } from '../../../constants/media';

export default function Banner() {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        background: `url("${HeroImg}") no-repeat bottom/contain`,
      }}
    >
      <Heading
        variant="h1"
        sx={{
          fontWeight: 700,
          marginTop: 181,
          fontSize: 90,
          lineHeight: '80px',
          color: '#18EBFB',
          textAlign: 'center',
          ...mediaWidthTemplates.upToMedium({
            marginTop: 100,
            fontSize: 68,
            lineHeight: '72px',
          }),
          ...mediaWidthTemplates.upToSmall({
            marginTop: 60,
            fontSize: 48,
            lineHeight: '56px',
          }),
        }}
      >
        Strategy NFT Marketplace
      </Heading>
      <Text
        sx={{
          fontSize: 24,
          fontFamily: "'DM Mono', monospace",
          lineHeight: '31px',
          color: 'white.300',
          textAlign: 'center',
          marginTop: 24,
          marginBottom: 885,
          ...mediaWidthTemplates.upToMedium({
            fontSize: 18,
            lineHeight: '23px',
            marginTop: 16,
            marginBottom: 550,
          }),
          ...mediaWidthTemplates.upToSmall({
            marginBottom: 340,
            marginTop: '8px',
          }),
        }}
      >
        Simplifying insights for marketing & investment
      </Text>
    </Flex>
  );
}
