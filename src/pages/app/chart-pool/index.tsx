import { useState } from 'react';
import { useHistory } from 'react-router';
import { Checkbox, Flex, Label, Text } from 'theme-ui';

import PairTable from '../../../components/tables/pair.table';
import { mediaWidthTemplates } from '../../../constants/media';
import graphs from '../../../graph';

export default function ChartPoolPage() {
  const history = useHistory();
  const [useTracked, setUseTracked] = useState(true);
  const { data, sortedColumn, onSort } = graphs.hooks.pair.usePairListForRender(useTracked);

  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'dark.400',
      }}
    >
      <Flex
        sx={{
          alignItems: 'center',
          marginBottom: '8px',
          justifyContent: 'space-between',
          marginTop: 28,
          ...mediaWidthTemplates.upToSmall({
            marginTop: 16,
          }),
        }}
      >
        <Text sx={{ color: 'white.300', fontWeight: 'bold' }}>ALL POOLS</Text>

        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            '& label': {
              width: 'initial',
            },
          }}
        >
          <Label>
            <Checkbox
              defaultChecked={useTracked}
              onChange={({ target }) => {
                setUseTracked(target.checked);
              }}
            />
          </Label>
          <Text sx={{ color: 'subtitle' }}>Hide untracked pairs</Text>
        </Flex>
      </Flex>
      <PairTable
        data={data}
        maxItems={10}
        sortedColumn={sortedColumn}
        onHeaderClick={onSort}
        onRowClick={(id) => {
          history.push(`/app/chart/pool/${id}`);
        }}
      />
    </Flex>
  );
}
