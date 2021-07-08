import { useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import { Flex } from 'theme-ui';

import { app } from '../../../reducers';

interface Props {
  active: boolean;
}

export default function ManageList(props: Props) {
  const { active } = props;
  const listUrls = useSelector(app.selectors.list.selectListUrls);

  return (
    <Flex
      sx={{
        display: active ? 'flex' : 'none',
      }}
    >
      <List
        height={256}
        itemCount={listUrls.length}
        itemSize={60}
        width={'100%'}
        itemData={listUrls}
        sx={{
          '&::-webkit-scrollbar-track': {},
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '8px',
            height: '80px',
            backgroundColor: 'rgba(92, 92, 92, 0.3)',
          },
        }}
      >
        {({ index, data, style }) => {
          const list = data[index];
          return (
            <Flex
              variant="styles.row"
              key={list.id}
              style={style}
              // onClick={() => {
              //   onClose(token);
              // }}
            >
              <Flex sx={{ flexDirection: 'column', marginLeft: 12 }}>{list.id}</Flex>
            </Flex>
          );
        }}
      </List>
    </Flex>
  );
}
