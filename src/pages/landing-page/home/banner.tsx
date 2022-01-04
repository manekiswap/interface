import { Heading } from 'theme-ui';

import HeroImg from '../../../assets/images/landing-v3/hero.png';
import { mediaWidthTemplates } from '../../../constants/media';

export default function Banner() {
  return (
    <div
      sx={{
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
        Investment <br /> Intelligence Platform
      </Heading>
      <p
        sx={{
          fontSize: 24,
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
        Simplifying crypto insights for traders
      </p>
    </div>
  );
}
