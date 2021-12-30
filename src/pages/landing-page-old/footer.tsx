import { Divider, Flex, Link, Text } from '@theme-ui/components';

import { mediaWidthTemplates } from '../../constants/media';

export default function Footer(props: { paddingX: number }) {
  const { paddingX } = props;

  return (
    <>
      <Divider />
      <Flex
        {...{ name: 'contactAnchor' }}
        sx={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 56,
          backgroundColor: '#EBEBEB',
          paddingX,
          ...mediaWidthTemplates.upToMedium({
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: 86,
          }),
        }}
      >
        <Flex
          sx={{
            width: 'auto',
            alignItems: 'center',
            justifyContent: 'space-between',
            ...mediaWidthTemplates.upToMedium({
              width: '100%',
            }),
          }}
        >
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
        <Text
          sx={{
            fontSize: 0,
            marginTop: 0,
            color: '#0E0E0E',
            ...mediaWidthTemplates.upToMedium({
              marginTop: 16,
            }),
          }}
        >
          Copyright © 2021 Maneki, Inc.
        </Text>
      </Flex>
    </>
  );
}
