import { useHistory } from 'react-router';
import { Flex, Text } from 'theme-ui';

import TokenTable from '../../../components/tables/token.table';
import { mediaWidthTemplates } from '../../../constants/media';
import graphs from '../../../graph';

export default function ChartTokenPage() {
  const history = useHistory();
  const { data, sortedColumn, onSort } = graphs.hooks.token.useTokenListForRender();

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
        <Text sx={{ color: 'white.300', fontWeight: 'bold' }}>ALL TOKENS</Text>
      </Flex>

      <TokenTable
        data={data}
        maxItems={10}
        sortedColumn={sortedColumn}
        onHeaderClick={onSort}
        onRowClick={(id) => {
          history.push(`/app/chart/token/${id}`);
        }}
      />
    </Flex>
  );
}
