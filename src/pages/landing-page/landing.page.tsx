import { Box } from '@chakra-ui/react';

import About from './about';
import Footer from './footer';
import Introduction from './introduction';
import Roadmap from './roadmap';
import { Subscribe } from './subscribe';
import TokenDistribution from './token-distribution';

export default function LandingPage() {
  return (
    <Box backgroundColor="white">
      <About />
      <Introduction />
      <Roadmap />
      <TokenDistribution />
      <Subscribe />
      <Footer />
    </Box>
  );
}
