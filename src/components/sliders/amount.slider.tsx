import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Flex, FlexProps, Heading, Slider, Text } from 'theme-ui';

import Tag from '../tags/tag';

interface Props extends Omit<FlexProps, 'sx'> {
  onSlide: (value: number) => void;
}

const defaultValues = [
  {
    value: 25,
    text: '25%',
  },
  {
    value: 50,
    text: '50%',
  },
  {
    value: 75,
    text: '75%',
  },
  {
    value: 100,
    text: 'Max',
  },
];

export default function AmountSlider(props: Props) {
  const { className, onSlide } = props;

  const [rangeValue, setRangeValue] = useState(0);

  const _onSlide = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(Number(e.target.value));
  }, []);

  useEffect(() => {
    onSlide(rangeValue);
  }, [onSlide, rangeValue]);

  return (
    <Flex
      className={className}
      sx={{
        backgroundColor: 'dark.400',
        borderRadius: 'base',
        border: '1px solid rgba(92, 92, 92, 0.3)',
        justifyContent: 'space-between',
        padding: 16,
        paddingBottom: 12,
      }}
    >
      <Flex sx={{ flexDirection: 'column', width: '25%' }}>
        <Text sx={{ fontWeight: 'bold' }}>Amount</Text>
        <Heading as="h4" variant="styles.h4" sx={{ fontWeight: 'bold' }}>{`${rangeValue}%`}</Heading>
      </Flex>
      <Flex sx={{ flexDirection: 'column', marginLeft: 32, flex: 1 }}>
        <Flex sx={{ alignSelf: 'flex-end' }}>
          {defaultValues.map(({ value, text }) => {
            return (
              <Tag
                key={text}
                sx={{ height: 32, border: '1px solid rgba(132, 179, 255, 0.3)', '> span': { color: 'blue.300' } }}
                onClick={() => {
                  setRangeValue(value);
                }}
              >
                {text}
              </Tag>
            );
          })}
        </Flex>
        <Slider
          value={rangeValue}
          min={0}
          max={100}
          sx={{
            height: '2px',
            width: '100%',
          }}
          onChange={_onSlide}
        />
      </Flex>
    </Flex>
  );
}
