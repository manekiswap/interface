interface BasicData {
  token0?: {
    id: string;
    name: string;
    symbol: string;
  };
  token1?: {
    id: string;
    name: string;
    symbol: string;
  };
}

// Override data return from graph - usually because proxy token has changed
// names since entitiy was created in subgraph
// keys are lowercase token addresses <--------
const TOKEN_OVERRIDES: { [address: string]: { name: string; symbol: string } } = {
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': {
    name: 'Ether (Wrapped)',
    symbol: 'ETH',
  },
  '0x1416946162b1c2c871a73b07e932d2fb6c932069': {
    name: 'Energi',
    symbol: 'NRGE',
  },
};

// override tokens with incorrect symbol or names
export default function updateNameData(_data: BasicData): BasicData | undefined {
  const data = { ..._data };

  if (data?.token0?.id && Object.keys(TOKEN_OVERRIDES).includes(data.token0.id)) {
    const token0 = { ...data.token0 };
    token0.name = TOKEN_OVERRIDES[data.token0.id].name;
    token0.symbol = TOKEN_OVERRIDES[data.token0.id].symbol;
    data.token0 = token0;
  }

  if (data?.token1?.id && Object.keys(TOKEN_OVERRIDES).includes(data.token1.id)) {
    const token1 = { ...data.token1 };
    token1.name = TOKEN_OVERRIDES[data.token1.id].name;
    token1.symbol = TOKEN_OVERRIDES[data.token1.id].symbol;
    data.token1 = token1;
  }

  return data;
}
