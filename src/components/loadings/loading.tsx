import { Flex, Spinner } from 'theme-ui';

export default function Loading() {
  return (
    <Flex
      sx={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background',
      }}
    >
      <Spinner color={'white.400'} />
    </Flex>
  );
}
