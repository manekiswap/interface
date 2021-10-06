import { Currency } from '@manekiswap/sdk';
import { ParsedQs } from 'qs';
import { useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { buildRoute } from '../routes';
import getAddress from '../utils/getAddress';
import parseAddressFromURLParameter from '../utils/parseAddressFromURLParameter';
import useParsedQueryString from './useParsedQueryString';
import useToggle from './useToggle';
import useCurrency from './useTokenAddress';

function queryParametersToState(parsedQs: ParsedQs, keys: string[], defaultFirst = 'ETH') {
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

type InputField = 'currencyA' | 'currencyB';

export default function usePairRoute(keys: string[]) {
  const history = useHistory();
  const { pathname, hash } = useLocation();

  const parsedQs = useParsedQueryString();
  const [addressA, addressB] = queryParametersToState(parsedQs, keys);

  const currencyA = useCurrency(addressA);
  const currencyB = useCurrency(addressB);

  const [isSelectingCurrency, toggleSelectCurrency] = useToggle(false);
  const [activeField, setActiveField] = useState<InputField | undefined>(undefined);

  const updateCurrencyA = useCallback(
    (currency: Currency) => {
      const route = buildRoute(
        { [keys[0]]: getAddress(currency), [keys[1]]: getAddress(currencyB) },
        { path: pathname, hash },
      );
      history.push(route);
    },
    [currencyB, hash, history, keys, pathname],
  );

  const updateCurrencyB = useCallback(
    (currency: Currency) => {
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
