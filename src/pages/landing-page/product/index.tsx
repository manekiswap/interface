import { Box, Flex } from '@theme-ui/components';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { mediaWidthTemplates } from '../../../constants/media';
import Header from '../header';
import Vision from '../home/vision';

export default function ProductPage() {
  const { t } = useTranslation();

  const maxContentWidth = 1224;
  return (
    <>
      <Helmet>
        <title>Manekiswap | Product</title>
        <link rel="canonical" href="https://manekiswap.com/#/product" />
      </Helmet>

      <Box
        sx={{
          background: '#0F0E44',
          paddingY: 100,
          overflow: 'hidden',
          ...mediaWidthTemplates.upToExtraLarge({
            paddingY: 0,
          }),
        }}
      >
        <Flex
          sx={{
            maxWidth: 1440,
            marginX: 'auto',
            flexDirection: 'column',
            background: '#151057',
            '*': {
              margin: 0,
              padding: 0,
              fontFamily: "'DM Mono', monospace",
              fontSize: 16,
              lineHeight: '24px',
            },
            '& *::before, & *::after': {
              boxSizing: 'border-box',
            },
          }}
        >
          <Header maxContentWidth={maxContentWidth} />
          <Vision maxContentWidth={maxContentWidth} />
        </Flex>
      </Box>
    </>
  );
}
