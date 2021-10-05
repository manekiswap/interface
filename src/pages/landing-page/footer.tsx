import { Divider, Flex, Link, Text } from '@theme-ui/components';

import useIsWindowWider from '../../hooks/useIsWindowWider';

export default function Footer(props: { paddingX: string }) {
  const { paddingX } = props;
  const isWiderThan1024 = useIsWindowWider(1024);

  return (
    <>
      <Divider />
      <Flex
        {...{ name: 'contactAnchor' }}
        sx={{
          flexDirection: isWiderThan1024 ? 'row-reverse' : 'column',
          justifyContent: isWiderThan1024 ? 'space-between' : 'center',
          alignItems: isWiderThan1024 ? 'center' : 'flex-start',
          height: isWiderThan1024 ? 56 : 86,
          backgroundColor: '#EBEBEB',
          paddingX,
        }}
      >
        <Flex sx={{ width: isWiderThan1024 ? 'auto' : '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            variant="buttons.small-link"
            sx={{ color: '#5C5C5C', fontSize: 0, fontWeight: 'regular', textDecoration: 'none', marginRight: 12 }}
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/manekiswap`}
          >
            Twitter
          </Link>
          <Link
            variant="buttons.small-link"
            sx={{ color: '#5C5C5C', fontSize: 0, fontWeight: 'regular', textDecoration: 'none', marginX: 12 }}
            target="_blank"
            rel="noreferrer"
            href={`https://github.com/manekiswap`}
          >
            Github
          </Link>
          <Link
            variant="buttons.small-link"
            sx={{ color: '#5C5C5C', fontSize: 0, fontWeight: 'regular', textDecoration: 'none', marginX: 12 }}
            target="_blank"
            rel="noreferrer"
            href={`https://t.me/manekiswap`}
          >
            Telegram
          </Link>
          <Link
            variant="buttons.small-link"
            sx={{ color: '#5C5C5C', fontSize: 0, fontWeight: 'regular', textDecoration: 'none', marginLeft: 12 }}
            target="_blank"
            rel="noreferrer"
            href={`https://blog.manekiswap.com`}
          >
            Medium
          </Link>
        </Flex>
        <Text sx={{ fontSize: 0, marginTop: isWiderThan1024 ? 0 : 16, color: '#0E0E0E' }}>
          Copyright © 2021 Maneki, Inc.
        </Text>
      </Flex>
    </>
  );
}
