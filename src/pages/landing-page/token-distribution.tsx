import { Flex, Heading, Image, Text } from '@theme-ui/components';
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell, Pie, PieChart, Sector } from 'recharts';

import ChartEyeImg from '../../assets/images/landing/chart-eye.png';
import useIsWindowWider from '../../hooks/useIsWindowWider';
import { useWindowSize } from '../../hooks/useWindowSize';

function Distribution(props: { title: string; description?: string; dotColor: string }) {
  const { title, description, dotColor } = props;
  const isWiderThan1024 = useIsWindowWider(1024);

  let marginBottom = 0;
  if (!!description) {
    marginBottom = isWiderThan1024 ? 28 : 20;
  }

  return (
    <Flex sx={{ marginBottom, maxWidth: isWiderThan1024 ? 270 : undefined }}>
      <Flex sx={{ heigh: 20, width: 20, backgroundColor: dotColor, borderRadius: '4px', marginRight: 24 }} />
      <Flex sx={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
        <Text sx={{ textAlign: 'left', fontWeight: 'bold', color: '#FFFFFF' }}>{title}</Text>
        {description && (
          <Text sx={{ textAlign: 'left', fontSize: 0, marginTop: isWiderThan1024 ? '8px' : '4px', color: '#5C5C5C' }}>
            {description}
          </Text>
        )}
      </Flex>
    </Flex>
  );
}

type DistributionInfo = {
  title: string;
  description?: string;
  dotColor: string;
  name: string;
  value: number;
};

const distributionConfig: Array<DistributionInfo> = [
  {
    title: '5% Contributors',
    dotColor: '#554423',
    name: 'contributors',
    value: 5,
  },
  {
    title: '10% Investors',
    description: 'TBD after 6 months',
    dotColor: '#8d6b2a',
    name: 'investors',
    value: 10,
  },
  {
    title: '10% Team',
    description: '20% initial after 6 months, remaining vested quarterly',
    dotColor: '#b87c0a',
    name: 'team',
    value: 10,
  },
  {
    title: '15% Founders',
    description: '20% initial after 6 months, remaining vested quarterly',
    dotColor: '#e59701',
    name: 'founders',
    value: 15,
  },
  {
    title: '25% Treasury',
    description: 'For strategic planning (rewards, bounty hunt, finance)',
    dotColor: '#e5b301',
    name: 'treasury',
    value: 25,
  },
  {
    title: '35% Community',
    description: 'Airdrop, IDO, IEO',
    dotColor: '#e5c401',
    name: 'community',
    value: 35,
  },
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;

  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 11;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius + 3}
        outerRadius={outerRadius + 3}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={'#fff'} fill="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 6}
        y={ey}
        textAnchor={textAnchor}
        fill="#fff"
        fontFamily="'DM Sans', sans-serif"
      >{`${value}%`}</text>
    </g>
  );
};

export default function TokenDistribution(props: { paddingX: string }) {
  const { paddingX } = props;
  const isWiderThan1024 = useIsWindowWider(1024);
  const { t } = useTranslation(['landing']);
  const ref = useRef(null);
  const eyeEl: MutableRefObject<HTMLElement | null> = useRef(null);
  const [activeIndex, setActiveIndex] = useState(distributionConfig.length - 1);
  const { width = 0 } = useWindowSize();

  useEffect(() => {
    eyeEl.current = document.getElementById('eye') as HTMLElement;
    return () => {
      eyeEl.current = null;
    };
  }, []);

  const onPieEnter = useCallback(
    (data: { midAngle: number }, index) => {
      const { midAngle } = data;
      const degree = 270 - midAngle;
      eyeEl.current?.style.setProperty('transform', `rotate(${degree}deg)`);
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  const pieSize = useMemo(() => {
    return Math.min(540, width);
  }, [width]);

  const outerRadius = useMemo(() => {
    return (pieSize - 170) / 2;
  }, [pieSize]);

  const innerRadius = useMemo(() => {
    return outerRadius - pieSize / 16;
  }, [outerRadius, pieSize]);

  const eyePosition = useMemo(() => {
    return pieSize / 2 - innerRadius + 18;
  }, [innerRadius, pieSize]);

  return (
    <>
      <Flex
        {...{ name: 'distributionAnchor' }}
        sx={{
          backgroundColor: '#0E0E0E',
          flexDirection: 'column',
          paddingTop: isWiderThan1024 ? 120 : 80,
          paddingX,
        }}
      >
        <Heading
          as="h3"
          variant="styles.h3"
          sx={{ textAlign: 'center', marginBottom: 12, marginX: 24, color: '#FFFFFF' }}
        >
          {t('landing:token_distribution')}
        </Heading>
        <Text sx={{ textAlign: 'center', color: 'secondary', marginBottom: isWiderThan1024 ? 80 : 0 }}>
          {t('landing:total_supply', { value: 100_000_000 })}
        </Text>
        <Flex
          sx={{
            flexDirection: isWiderThan1024 ? 'row-reverse' : 'column',
            justifyContent: isWiderThan1024 ? 'space-around' : 'center',
            overflow: 'hidden',
          }}
        >
          <Flex
            sx={{
              position: 'relative',
              alignItems: 'center',
              alignSelf: isWiderThan1024 ? undefined : 'center',
              justifyContent: 'center',
              height: pieSize,
              width: pieSize,
            }}
          >
            <Flex
              ref={ref}
              id="eye"
              sx={{
                position: 'absolute',
                top: eyePosition,
                right: eyePosition,
                bottom: eyePosition,
                left: eyePosition,
                transform: 'rotate(-169.3deg)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image src={ChartEyeImg} />
            </Flex>
            <PieChart width={pieSize} height={pieSize}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={distributionConfig.sort((a, b) => b.value - a.value)}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={2}
                startAngle={90}
                endAngle={450}
                dataKey="value"
                onMouseOver={onPieEnter}
              >
                {distributionConfig.map((info: DistributionInfo) => (
                  <Cell key={info.name} fill={info.dotColor} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </Flex>
          <Flex sx={{ flexDirection: 'column', justifyContent: 'center' }}>
            {distributionConfig.map((val) => (
              <Distribution key={val.title} {...val} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
