import { Button, Flex, Text, useMediaQuery } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { colors } from '../../themes/colors';

export default function Footer() {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');

  return (
    <>
      <Flex marginX="auto" maxWidth="1440px" backgroundColor={colors.background._04} height="1px"></Flex>
      <Flex
        id="contact"
        marginX="auto"
        maxWidth="1440px"
        paddingX={isLargerThan1024 ? '204px' : '24px'}
        justifyContent={isLargerThan1024 ? 'space-between' : 'center'}
        alignItems="center"
        height="14"
        backgroundColor="#ebebeb"
      >
        {isLargerThan1024 && (
          <Text color={colors.text._04} fontSize="12px">
            Copyright © 2021 Maneki, Inc.
          </Text>
        )}
        <Flex alignItems="center">
          <Button
            background="none"
            color={colors.text._03}
            colorScheme="gray"
            fontWeight="normal"
            height="56px"
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
            fontWeight="normal"
            height="56px"
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
            fontWeight="normal"
            height="56px"
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
            fontWeight="normal"
            height="56px"
            borderRadius={0}
            as={Link}
            target="_blank"
            rel="noreferrer"
            to={{ pathname: `https://manekiswap.medium.com` }}
          >
            Medium
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
