import { useSelector } from 'react-redux';
import { Flex } from 'theme-ui';

import { app } from '../../../reducers';

interface Props {
  active: boolean;
}

export default function ManageList(props: Props) {
  const { active } = props;
  return (
    <Flex
      sx={{
        display: active ? 'flex' : 'none',
      }}
    >
      ManageToken
    </Flex>
  );
}
