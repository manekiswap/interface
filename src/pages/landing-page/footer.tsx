import { Element } from 'react-scroll';
import { useMedia } from 'react-use';
import { Button, Flex, Link, Text } from 'theme-ui';

export default function Footer(props: { paddingX: number }) {
  const { paddingX } = props;
  const isLargerThan1024 = useMedia('(min-width: 1024px)');

  return (
    <>
      <Flex sx={{ backgroundColor: 'grey.2', height: 1 }}></Flex>
      <Element name="contactAnchor" />
      <Flex
        sx={{
          flexDirection: isLargerThan1024 ? 'row-reverse' : 'column',
          justifyContent: isLargerThan1024 ? 'space-between' : 'center',
          alignItems: isLargerThan1024 ? 'center' : 'flex-start',
          height: isLargerThan1024 ? 56 : 86,
          backgroundColor: 'grey.1',
          paddingX,
        }}
      >
        <Flex sx={{ width: isLargerThan1024 ? 'auto' : '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            as={Button}
            sx={{
              background: 'none',
              color: 'grey.3',
              fontSize: 12,
              marginRight: isLargerThan1024 ? 24 : 0,
              height: 32,
              paddingX: 0,
              borderRadius: 0,
            }}
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/manekiswap`}
          >
            Twitter
          </Link>
          <Link
            as={Button}
            sx={{
              background: 'none',
              color: 'grey.3',
              fontSize: 12,
              marginRight: isLargerThan1024 ? 24 : 0,
              height: 32,
              paddingX: 0,
              borderRadius: 0,
            }}
            target="_blank"
            rel="noreferrer"
            href={`https://github.com/manekiswap`}
          >
            Github
          </Link>
          <Link
            as={Button}
            sx={{
              background: 'none',
              color: 'grey.3',
              fontSize: 12,
              marginRight: isLargerThan1024 ? 24 : 0,
              height: 32,
              paddingX: 0,
              borderRadius: 0,
            }}
            target="_blank"
            rel="noreferrer"
            href={`https://t.me/manekiswap`}
          >
            Telegram
          </Link>
          <Link
            as={Button}
            sx={{
              background: 'none',
              color: 'grey.3',
              fontSize: 12,
              marginRight: isLargerThan1024 ? 24 : 0,
              height: 32,
              paddingX: 0,
              borderRadius: 0,
            }}
            target="_blank"
            rel="noreferrer"
            href={`https://blog.manekiswap.com`}
          >
            Medium
          </Link>
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
        <Text sx={{ fontSize: 12, marginTop: isLargerThan1024 ? 0 : 8 }}>Copyright © 2021 Maneki, Inc.</Text>
      </Flex>
    </>
  );
}
