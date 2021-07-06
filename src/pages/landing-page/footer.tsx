import { Element } from 'react-scroll';
import { useMedia } from 'react-use';
import { Divider, Flex, Link, Text } from 'theme-ui';

export default function Footer(props: { paddingX: string }) {
  const { paddingX } = props;
  const isLargerThan1024 = useMedia('(min-width: 1024px)');

  return (
    <>
      <Divider />
      <Element name="contactAnchor" />
      <Flex
        sx={{
          flexDirection: isLargerThan1024 ? 'row-reverse' : 'column',
          justifyContent: isLargerThan1024 ? 'space-between' : 'center',
          alignItems: isLargerThan1024 ? 'center' : 'flex-start',
          height: isLargerThan1024 ? 56 : 86,
          backgroundColor: 'underlay',
          paddingX,
        }}
      >
        <Flex sx={{ width: isLargerThan1024 ? 'auto' : '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            variant="buttons.small-link"
            sx={{ color: 'secondary', fontSize: 0, fontWeight: 'regular', textDecoration: 'none', marginRight: 12 }}
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/manekiswap`}
          >
            Twitter
          </Link>
          <Link
            variant="buttons.small-link"
            sx={{ color: 'secondary', fontSize: 0, fontWeight: 'regular', textDecoration: 'none', marginX: 12 }}
            target="_blank"
            rel="noreferrer"
            href={`https://github.com/manekiswap`}
          >
            Github
          </Link>
          <Link
            variant="buttons.small-link"
            sx={{ color: 'secondary', fontSize: 0, fontWeight: 'regular', textDecoration: 'none', marginX: 12 }}
            target="_blank"
            rel="noreferrer"
            href={`https://t.me/manekiswap`}
          >
            Telegram
          </Link>
          <Link
            variant="buttons.small-link"
            sx={{ color: 'secondary', fontSize: 0, fontWeight: 'regular', textDecoration: 'none', marginLeft: 12 }}
            target="_blank"
            rel="noreferrer"
            href={`https://blog.manekiswap.com`}
          >
            Medium
          </Link>
        </Flex>
        <Text sx={{ fontSize: 0, marginTop: isLargerThan1024 ? 0 : 16, color: '#0E0E0E' }}>
          Copyright © 2021 Maneki, Inc.
        </Text>
      </Flex>
    </>
  );
}
