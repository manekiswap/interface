import { Flex, FlexProps, Heading } from '@theme-ui/components';

interface Props extends Omit<FlexProps, 'sx'> {
  a?: boolean;
}

export default function ContentView(props: Props) {
  const { className } = props;

  return (
    <Flex
      className={className}
      sx={{ paddingX: 24, paddingY: 28, backgroundColor: '#1D1D2D', flexDirection: 'column' }}
    >
      <Heading
        variant="styles.h6"
        {...{ name: 'generalAnchor' }}
        sx={{
          backgroundColor: '#34344A',
          paddingX: 12,
          paddingY: '8px',
          lineHeight: '28px',
          borderRadius: 'lg',
          marginBottom: 16,
          marginTop: 48,
        }}
      >
        General Info
      </Heading>
      <Flex sx={{ height: 480, width: '100%', backgroundColor: 'blue.300' }}></Flex>

      <Heading
        variant="styles.h6"
        {...{ name: 'momentumAnchor' }}
        sx={{
          backgroundColor: '#34344A',
          paddingX: 12,
          paddingY: '8px',
          lineHeight: '28px',
          borderRadius: 'lg',
          marginBottom: 16,
          marginTop: 48,
        }}
      >
        Momentum
      </Heading>
      <Flex sx={{ height: 480, width: '100%', backgroundColor: 'blue.300' }}></Flex>

      <Heading
        variant="styles.h6"
        {...{ name: 'ownershipAnchor' }}
        sx={{
          backgroundColor: '#34344A',
          paddingX: 12,
          paddingY: '8px',
          lineHeight: '28px',
          borderRadius: 'lg',
          marginBottom: 16,
          marginTop: 48,
        }}
      >
        Ownership
      </Heading>
      <Flex sx={{ height: 480, width: '100%', backgroundColor: 'blue.300' }}></Flex>

      <Heading
        variant="styles.h6"
        {...{ name: 'fundamentalAnchor' }}
        sx={{
          backgroundColor: '#34344A',
          paddingX: 12,
          paddingY: '8px',
          lineHeight: '28px',
          borderRadius: 'lg',
          marginBottom: 16,
          marginTop: 48,
        }}
      >
        Fundamental
      </Heading>
      <Flex sx={{ height: 480, width: '100%', backgroundColor: 'blue.300' }}></Flex>
    </Flex>
  );
}
