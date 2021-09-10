import numbro from 'numbro';

// using a currency library here in case we want to add more in future
export const formatDollarAmount = (num: number | undefined, digits = 2, round = true) => {
  if (num === 0) return '$0.00';
  if (!num) return '-';
  if (num < 0.001 && digits <= 3) {
    return '<$0.001';
  }

  return numbro(num).formatCurrency({
    average: round,
    mantissa: num > 1000 ? 2 : digits,
    abbreviations: {
      million: 'M',
      billion: 'B',
    },
  });
};

// using a currency library here in case we want to add more in future
export const formatAmount = (num: number | undefined, digits = 2) => {
  if (num === 0) return '0';
  if (!num) return '-';
  if (num < 0.001) {
    return '<0.001';
  }
  return numbro(num).format({
    average: true,
    mantissa: num > 1000 ? 2 : digits,
    abbreviations: {
      million: 'M',
      billion: 'B',
    },
  });
};

export const formattedNum = (number?: any, usd = false): string | number => {
  if (isNaN(number) || number === '' || number === undefined) {
    return usd ? '$0' : 0;
  }

  const num = parseFloat(number);

  if (num === 0) {
    if (usd) {
      return '$0';
    }
    return 0;
  }

  if (num < 0.0001 && num > 0) {
    return usd ? '< $0.0001' : '< 0.0001';
  }

  return `${usd ? '$' : ''}${numbro(num).format({
    average: true,
    thousandSeparated: true,
    mantissa: num < 0.1 ? 4 : 2,
    abbreviations: {
      thousand: 'K',
      million: 'M',
      billion: 'B',
    },
  })}`;
};
