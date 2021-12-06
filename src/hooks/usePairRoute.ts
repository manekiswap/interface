import { Currency } from '@manekiswap/sdk';
import { ParsedQs } from 'qs';
import { useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { buildRoute } from '../routes';
import { getAddress, parseAddressFromURLParameter } from '../utils/getAddress';
import useParsedQueryString from './useParsedQueryString';
import useToggle from './useToggle';
import useCurrency from './useTokenAddress';

function queryParametersToState(parsedQs: ParsedQs, keys: string[], defaultFirst = 'MATIC') {
  if (keys.length !== 2) return [];
  if (keys[0] === keys[1]) return [];

  let firstCurrency = parseAddressFromURLParameter(parsedQs[keys[0]]);
  let secondCurrency = parseAddressFromURLParameter(parsedQs[keys[1]]);

  if (firstCurrency === '' && secondCurrency === '') {
    firstCurrency = defaultFirst;
  } else if (firstCurrency === secondCurrency) {
    secondCurrency = '';
  }

  return [firstCurrency, secondCurrency];
}

export default function usePairRoute(keys: string[]) {
  const history = useHistory();
  const { pathname, hash } = useLocation();

  const parsedQs = useParsedQueryString();
  const [addressA, addressB] = queryParametersToState(parsedQs, keys);

  const currencyA = useCurrency(addressA);
  const currencyB = useCurrency(addressB);

  const [isSelectingCurrency, toggleSelectCurrency] = useToggle(false);
  const [activeField, setActiveField] = useState<'currencyA' | 'currencyB' | undefined>(undefined);

  const updateCurrencyA = useCallback(
    (currency: Currency) => {
      if (keys.length !== 2) return;

      const checksumedAddressA = getAddress(currency);
      const checksumedAddressB = getAddress(currencyB);
      if (checksumedAddressA === checksumedAddressB) return;

      const route = buildRoute(
        { [keys[0]]: checksumedAddressA, [keys[1]]: checksumedAddressB },
        { path: pathname, hash },
      );
      history.push(route);
    },
    [currencyB, hash, history, keys, pathname],
  );

  const updateCurrencyB = useCallback(
    (currency: Currency) => {
      if (keys.length !== 2) return;

      const checksumedAddressA = getAddress(currencyA);
      const checksumedAddressB = getAddress(currency);
      if (checksumedAddressA === checksumedAddressB) return;

      const route = buildRoute(
        { [keys[0]]: getAddress(currencyA), [keys[1]]: getAddress(currency) },
        { path: pathname, hash },
      );
      history.push(route);
    },
    [currencyA, hash, history, keys, pathname],
  );

  const toggleSelectCurrencyA = useCallback(() => {
    setActiveField('currencyA');
    toggleSelectCurrency();
  }, [toggleSelectCurrency]);

  const toggleSelectCurrencyB = useCallback(() => {
    setActiveField('currencyB');
    toggleSelectCurrency();
  }, [toggleSelectCurrency]);

  const onSelectCurrency = useCallback(
    (currency: Currency | undefined) => {
      if (!!activeField && !!currency) {
        if (activeField === 'currencyA') updateCurrencyA(currency);
        else if (activeField === 'currencyB') updateCurrencyB(currency);
      }
      toggleSelectCurrency();
    },
    [activeField, toggleSelectCurrency, updateCurrencyA, updateCurrencyB],
  );

  return {
    disabledCurrency: activeField === 'currencyA' ? currencyB : currencyA,
    isSelectingCurrency,
    toggleSelectCurrencyA,
    toggleSelectCurrencyB,
    onSelectCurrency,
    currencies: {
      CURRENCY_A: currencyA,
      CURRENCY_B: currencyB,
    },
  };
}
