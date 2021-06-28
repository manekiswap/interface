import { Element } from 'react-scroll';
import { useMedia } from 'react-use';
import { Divider, Flex, Link, Text } from 'theme-ui';

export default function Footer(props: { paddingX: string }) {
  const { paddingX } = props;
  const isLargerThan1024 = useMedia('(min-width: 1024px)');

  return (
    <>
      <Divider sx={{ backgroundColor: 'dark.200' }} />
      <Element name="contactAnchor" />
      <Flex
        sx={{
          flexDirection: isLargerThan1024 ? 'row-reverse' : 'column',
          justifyContent: isLargerThan1024 ? 'space-between' : 'center',
          alignItems: isLargerThan1024 ? 'center' : 'flex-start',
          height: isLargerThan1024 ? 56 : 86,
          backgroundColor: '#ebebeb',
          paddingX,
        }}
      >
        <Flex sx={{ width: isLargerThan1024 ? 'auto' : '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            variant="buttons.small-link"
            sx={{ color: 'dark.300', fontSize: 0, fontWeight: 'regular', textDecoration: 'none' }}
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/manekiswap`}
          >
            Twitter
          </Link>
          <Link
            variant="buttons.small-link"
            sx={{ color: 'dark.300', fontSize: 0, fontWeight: 'regular', textDecoration: 'none' }}
            target="_blank"
            rel="noreferrer"
            href={`https://github.com/manekiswap`}
          >
            Github
          </Link>
          <Link
            variant="buttons.small-link"
            sx={{ color: 'dark.300', fontSize: 0, fontWeight: 'regular', textDecoration: 'none' }}
            target="_blank"
            rel="noreferrer"
            href={`https://t.me/manekiswap`}
          >
            Telegram
          </Link>
          <Link
            variant="buttons.small-link"
            sx={{ color: 'dark.300', fontSize: 0, fontWeight: 'regular', textDecoration: 'none' }}
            target="_blank"
            rel="noreferrer"
            href={`https://blog.manekiswap.com`}
          >
            Medium
          </Link>
        </Flex>
        <Text sx={{ fontSize: 0, marginTop: isLargerThan1024 ? 0 : '8px' }}>Copyright © 2021 Maneki, Inc.</Text>
      </Flex>
    </>
  );
}
