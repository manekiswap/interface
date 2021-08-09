import { useParams } from 'react-router-dom';
import { Flex, Heading } from 'theme-ui';

export default function TokenDetailPage() {
  const { address } = useParams<{ address: string }>();
  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Heading as="h2" variant="styles.h2">
        Ether
      </Heading>
    </Flex>
  );
}
