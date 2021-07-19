import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import { Box, Flex, Label, Switch, Text } from 'theme-ui';

import useListUrls from '../../../hooks/useListUrls';
import { actions } from '../../../reducers';
import ListLogo from '../../logo/list.logo';

interface Props {
  active: boolean;
}

export default function ManageList(props: Props) {
  const { active } = props;
  const { t } = useTranslation(['app']);
  const listUrls = useListUrls();
  const dispatch = useDispatch();

  const handleListSwitch = useCallback(
    (url: string, value: boolean) => {
      dispatch(actions.list.updateActiveList({ url, active: value }));
    },
    [dispatch],
  );

  const Row = useCallback(
    ({ index, data, style }) => {
      const list = data[index];

      return (
        <Flex variant="styles.row" key={list.url} style={style} sx={{ alignItems: 'space-between', cursor: 'default' }}>
          <Label htmlFor={list.url} sx={{ flex: 1, alignItems: 'center', cursor: 'pointer' }}>
            <ListLogo logoURI={list.logoURI} />
            <Flex sx={{ flexDirection: 'column', marginLeft: 12 }}>
              <Text sx={{ fontWeight: 'medium' }}>{list.name}</Text>
              <Text variant="caps" sx={{ fontSize: 0, fontWeight: 'medium', color: 'white.100' }}>
                {t('app:token_count', { value: list.tokenCount })}
              </Text>
            </Flex>
          </Label>
          <Box>
            <Switch
              id={list.url}
              defaultChecked={list.active}
              onChange={({ target }) => {
                handleListSwitch(target.id, target.checked);
              }}
            />
          </Box>
        </Flex>
      );
    },
    [handleListSwitch, t],
  );

  return (
    <Flex
      sx={{
        display: active ? 'flex' : 'none',
      }}
    >
      <List
        height={480}
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
        {Row}
      </List>
    </Flex>
  );
}
