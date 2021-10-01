import { Flex, FlexProps } from '@theme-ui/components';

interface Props extends Omit<FlexProps, 'sx'> {
  a?: boolean;
}

export default function ContentView(props: Props) {
  const { className } = props;

  return <Flex className={className}></Flex>;
}
