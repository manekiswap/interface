import { Flex, FlexProps, Grid, Heading, Text } from '@theme-ui/components';
import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

import HeroImg from '../../assets/images/landing-v3/hero.png';
import Logo from '../../assets/images/landing-v3/logo.png';
import { mediaWidthTemplates } from '../../constants/media';

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

const Header: React.FC<Props> = ({ maxContentWidth }) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const handleToggleMobileMenu = () => {
    setOpenMobileMenu((o) => !o);
  };

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        paddingX: 16,
      }}
    >
      <Flex
        sx={{
          alignItems: 'center',
          maxWidth: maxContentWidth,
          marginX: 'auto',
          width: '100%',
          paddingTop: 56,
          justifyContent: 'space-between',
          ...mediaWidthTemplates.upToMedium({
            paddingTop: 30,
          }),
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
          }}
        >
          <img
            src={Logo}
            sx={{
              width: 44,
            }}
            alt=""
          />
          <p
            sx={{
              marginLeft: 16,
              fontSize: 24,
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            Maneki
          </p>
        </Flex>
        <Grid
          sx={{
            gap: 58,
            gridAutoFlow: 'column',
            alignItems: 'center',
            ...mediaWidthTemplates.upToSmall({
              display: 'none',
            }),
          }}
        >
          <a
            sx={{
              color: 'rgba(24, 235, 251, 1)',
              fontSize: 16,
              fontWeight: 500,
              textDecoration: 'none',
            }}
            href="#"
          >
            Product
          </a>
          <a
            sx={{
              color: 'rgba(24, 235, 251, 1)',
              fontSize: 16,
              fontWeight: 500,
              textDecoration: 'none',
            }}
            href="#"
          >
            Roadmap
          </a>
          <a
            sx={{
              background: 'rgba(24, 235, 251, 1)',
              fontSize: 16,
              textDecoration: 'none',
              paddingX: 36,
              paddingY: 12,
              color: '#000',
            }}
            href="#"
          >
            Visit app
          </a>
        </Grid>
        <button
          sx={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'none',
            ...mediaWidthTemplates.upToSmall({
              display: 'flex',
            }),
          }}
          onClick={handleToggleMobileMenu}
        >
          <FiMenu sx={{ width: 24, height: 24, color: 'white.400' }} />
        </button>
      </Flex>
      <div
        sx={{
          background: `url("${HeroImg}") no-repeat bottom/contain`,
        }}
      >
        <Heading
          variant="h1"
          sx={{
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
      <Flex
        sx={{
          display: 'none',
          position: 'fixed',
          height: '100%',
          width: '100%',
          top: 0,
          left: openMobileMenu ? 0 : '100%',
          zIndex: 10,
          transition: '0.3s',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          textAlign: 'right',
          paddingX: 44,
          paddingY: 67,
          background: 'rgba(22, 18, 72, 0.7)',
          backdropFilter: 'blur(20px)',
          '& ul': {
            listStyle: 'none',
          },
          ...mediaWidthTemplates.upToSmall({
            display: 'flex',
          }),
        }}
      >
        <ul
          sx={{
            '& a': {
              color: 'white.400',
              textDecoration: 'none',
              display: 'block',
              fontWeight: 700,
            },
          }}
        >
          <li>
            <Heading variant="h4" sx={{ color: 'rgba(24, 235, 251, 1)', fontSize: 32, lineHeight: '40px' }}>
              Products
            </Heading>
            <ul
              sx={{
                '& > li span': {
                  marginTop: 12,
                  fontSize: 20,
                  lineHeight: '28px',
                  color: 'rgba(226, 108, 255, 1)',
                  display: 'block',
                },
              }}
            >
              <li>
                <a href="#">
                  <Text>DEX Platform</Text>
                </a>
              </li>
              <li>
                <a href="#">
                  <Text>NFT Exchange (NFT)</Text>
                </a>
              </li>
              <li>
                <a href="#">
                  <Text>Blockchain Intelligence</Text>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <Heading sx={{ fontSize: 32, lineHeight: '40px', marginTop: 48 }}>Roadmap</Heading>
            </a>
          </li>
          <li>
            <a href="#">
              <Heading sx={{ fontSize: 32, lineHeight: '40px', marginTop: 48 }}>Sign up</Heading>
            </a>
          </li>
          <li>
            <button
              sx={{
                backgroundColor: 'white.200',
                border: 'none',
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                '& > svg': {
                  width: '100%',
                },
                marginTop: 48,
                marginLeft: 'auto',
              }}
              onClick={handleToggleMobileMenu}
            >
              <FiX sx={{ width: 24, height: 24, color: 'rgba(22, 18, 72)' }} />
            </button>
          </li>
        </ul>
      </Flex>
    </Flex>
  );
};

export default Header;
