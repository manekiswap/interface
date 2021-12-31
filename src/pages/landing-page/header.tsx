import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Flex, FlexProps, Grid, Heading, Text } from 'theme-ui';

import LogoSVG from '../../assets/images/logo.svg';
import Link from '../../components/links/link';
import { mediaWidthTemplates } from '../../constants/media';
import routes from '../../routes';

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

export default function Header({ maxContentWidth }: Props) {
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
        <Flex sx={{ alignItems: 'center' }}>
          <Link
            variant="buttons.ghost"
            sx={{
              padding: 0,
              ':focus': { boxShadow: 'none' },
              '>svg': {
                height: 44,
                width: 172,
              },
              ...mediaWidthTemplates.upToSmall({
                '>svg': {
                  height: 38,
                  width: 145,
                },
              }),
            }}
            to={routes.landing}
          >
            <LogoSVG />
          </Link>
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
          <Link
            variant="buttons.small-ghost"
            sx={{
              color: 'rgba(24, 235, 251, 1)',
              fontSize: 16,
              fontWeight: 500,
              textDecoration: 'none',
            }}
            to={routes.product}
          >
            Product
          </Link>
          <Link
            variant="buttons.small-ghost"
            sx={{
              color: 'rgba(24, 235, 251, 1)',
              fontSize: 16,
              fontWeight: 500,
              textDecoration: 'none',
            }}
            to="#"
          >
            Roadmap
          </Link>
          <Link
            sx={{
              background: 'rgba(24, 235, 251, 1)',
              fontSize: 16,
              textDecoration: 'none',
              paddingX: 36,
              paddingY: 12,
              color: '#000',
            }}
            to={routes.app}
          >
            Visit app
          </Link>
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
              fontWeight: 500,
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
                <Link to={routes.app}>
                  <Text>DEX Platform</Text>
                </Link>
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
}
