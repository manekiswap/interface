import { Button, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Element } from 'react-scroll';

import { colors } from '../../themes/colors';

export default function Footer(props: { paddingX: string }) {
  const { paddingX } = props;
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');

  return (
    <>
      <Flex backgroundColor={colors.background._04} height="1px"></Flex>
      <Flex
        as={Element}
        name="contactAnchor"
        paddingX={paddingX}
        flexDirection={isLargerThan1024 ? 'row-reverse' : 'column'}
        justifyContent={isLargerThan1024 ? 'space-between' : 'center'}
        alignItems={isLargerThan1024 ? 'center' : 'flex-start'}
        height={isLargerThan1024 ? '56px' : '86px'}
        backgroundColor={colors.background._05}
      >
        <Flex width={isLargerThan1024 ? 'auto' : '100%'} alignItems="center" justifyContent="space-between">
          <Button
            background="none"
            color={colors.text._03}
            colorScheme="gray"
            fontSize="12px"
            fontWeight="normal"
            paddingX={0}
            marginRight={isLargerThan1024 ? '24px' : 0}
            height="32px"
            borderRadius={0}
            as={Link}
            target="_blank"
            rel="noreferrer"
            to={{ pathname: `https://twitter.com/manekiswap` }}
          >
            Twitter
          </Button>
          <Button
            background="none"
            color={colors.text._03}
            colorScheme="gray"
            fontSize="12px"
            fontWeight="normal"
            paddingX={0}
            marginRight={isLargerThan1024 ? '24px' : 0}
            height="32px"
            borderRadius={0}
            as={Link}
            target="_blank"
            rel="noreferrer"
            to={{ pathname: `https://github.com/manekiswap` }}
          >
            Github
          </Button>
          <Button
            background="none"
            color={colors.text._03}
            colorScheme="gray"
            fontSize="12px"
            fontWeight="normal"
            paddingX={0}
            marginRight={isLargerThan1024 ? '24px' : 0}
            height="32px"
            borderRadius={0}
            as={Link}
            target="_blank"
            rel="noreferrer"
            to={{ pathname: `https://t.me/manekiswap` }}
          >
            Telegram
          </Button>
          <Button
            background="none"
            color={colors.text._03}
            colorScheme="gray"
            fontSize="12px"
            fontWeight="normal"
            paddingX={0}
            marginRight={isLargerThan1024 ? '24px' : 0}
            height="32px"
            borderRadius={0}
            as={Link}
            target="_blank"
            rel="noreferrer"
            to={{ pathname: `https://blog.manekiswap.com` }}
          >
            Medium
          </Button>
          {/* <Button
            paddingX={0}
            height="32px"
            borderRadius={0}
            as={Link}
            target="_blank"
            rel="noreferrer"
            to={{ pathname: 'https://www.netlify.com' }}
          >
            <Image
              height="32px"
              width="auto"
              src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg"
              alt="Deploys by Netlify"
            />
          </Button> */}
        </Flex>
        <Text color={colors.text._04} fontSize="12px" marginTop={isLargerThan1024 ? 0 : '8px'}>
          Copyright © 2021 Maneki, Inc.
        </Text>
      </Flex>
    </>
  );
}
