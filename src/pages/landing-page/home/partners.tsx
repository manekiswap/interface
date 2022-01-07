import { Flex, FlexProps, Heading } from 'theme-ui';

import PartnerQuantconnect from '../../../assets/images/landing-v3/partner-quantconnect.png';
import PartnerTradologics from '../../../assets/images/landing-v3/partner-tradologics.png';
import PartnerUniswap from '../../../assets/images/landing-v3/partner-uniswap.png';
import { mediaWidthTemplates } from '../../../constants/media';

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

export default function Partners({ className }: Props) {
  return (
    <Flex
      className={className}
      sx={{
        flexDirection: 'column',
      }}
    >
      <Heading
        variant="h2"
        sx={{
          fontWeight: 500,
          fontSize: 48,
          lineHeight: '56px',
          color: 'white.400',
          textAlign: 'center',
          ...mediaWidthTemplates.upToMedium({
            fontSize: 40,
            lineHeight: '48px',
          }),
        }}
      >
        Our Partners
      </Heading>
      <Flex
        sx={{
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          paddingX: 16,
          '& > img': {
            height: 51,
            mixBlendMode: 'luminosity',
            marginTop: 48,
            marginX: 40,
            ...mediaWidthTemplates.upToMedium({
              marginTop: 32,
              marginX: 32,
              height: 33,
            }),
            ...mediaWidthTemplates.upToSmall({
              height: 24,
              marginX: 24,
            }),
          },
        }}
      >
        <img src={PartnerUniswap} />
        <img src={PartnerTradologics} />
        <img src={PartnerQuantconnect} />
      </Flex>
    </Flex>
  );
}
