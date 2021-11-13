import { Flex, FlexProps, Heading } from '@theme-ui/components';
import React from 'react';

import PartnerImg1 from '../../assets/images/landing-v3/partner-1.png';
import PartnerImg2 from '../../assets/images/landing-v3/partner-2.png';
import PartnerImg3 from '../../assets/images/landing-v3/partner-3.png';
import { mediaWidthTemplates } from '../../constants/media';

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

const Partners: React.FC<Props> = ({ className }) => {
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
        <img src={PartnerImg1} />
        <img src={PartnerImg2} />
        <img src={PartnerImg3} />
      </Flex>
    </Flex>
  );
};

export default Partners;
