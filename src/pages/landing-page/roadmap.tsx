import { Flex, Heading, Text } from '@theme-ui/components';
import { ThemeUIStyleObject } from '@theme-ui/css';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import Line122SVG from '../../assets/images/landing/line122.svg';
import Line222SVG from '../../assets/images/landing/line222.svg';
import Line321SVG from '../../assets/images/landing/line321.svg';
import Line322SVG from '../../assets/images/landing/line322.svg';
import Line421SVG from '../../assets/images/landing/line421.svg';
import Milestone1SVG from '../../assets/images/landing/milestone_1.svg';
import Milestone2SVG from '../../assets/images/landing/milestone_2.svg';
import Milestone3SVG from '../../assets/images/landing/milestone_3.svg';
import Milestone4SVG from '../../assets/images/landing/milestone_4.svg';
import Milestone5SVG from '../../assets/images/landing/milestone_5.svg';
import MilestonesSVG from '../../assets/images/landing/milestones.svg';
import useIsWindowWider from '../../hooks/useIsWindowWider';
import { useWindowSize } from '../../hooks/useWindowSize';

function MilestoneL(props: {
  title: string;
  content: string;
  textAlign: 'left' | 'right';
  childNode: ReactNode;
  customeStyle: ThemeUIStyleObject;
}) {
  const { title, content, textAlign, customeStyle, childNode } = props;
  const flexDirection = textAlign === 'right' ? 'row-reverse' : 'row';
  const contentStyle =
    textAlign === 'right'
      ? { justifyContent: 'flex-end', marginRight: 4, textAlign }
      : { justifyContent: 'flex-start', marginLeft: 4, textAlign };

  return (
    <Flex
      sx={{
        position: 'absolute',
        flexDirection,
        ...customeStyle,
      }}
    >
      {childNode}
      <Flex sx={{ flexDirection: 'column', width: 208, ...contentStyle }}>
        <Heading as="h5" variant="styles.h5" sx={{ marginBottom: '8px', color: 'white.400' }}>
          {title}
        </Heading>
        <Text sx={{ color: 'secondary' }}>{content}</Text>
      </Flex>
    </Flex>
  );
}

function MilestoneS(props: {
  title: string;
  content: string;
  workingState: 'new' | 'doing' | 'done';
  childNode: ReactNode;
  last?: boolean;
}) {
  const { title, content, workingState, childNode, last = false } = props;
  const beginColor = workingState === 'new' ? 'dark.200' : 'primary';
  const endColor = workingState === 'done' ? 'primary' : 'dark.200';

  return (
    <Flex sx={{ marginX: 24, flexDirection: 'row' }}>
      <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Flex sx={{ height: 40, width: '4px', backgroundColor: beginColor }}></Flex>
        <Flex sx={{ height: 64, width: 64, justifyContent: 'center' }}>{childNode}</Flex>
        <Flex sx={{ flex: 1, width: '4px', backgroundColor: endColor }}></Flex>
      </Flex>
      <Flex sx={{ flex: 1, marginLeft: 16, flexDirection: 'column' }}>
        <Heading as="h5" variant="styles.h5" sx={{ marginTop: 60, marginBottom: '8px', color: 'white.400' }}>
          {title}
        </Heading>
        <Text sx={{ color: 'secondary', marginBottom: last ? 20 : 0 }}>{content}</Text>
      </Flex>
    </Flex>
  );
}

export default function Roadmap(props: { paddingX: string }) {
  const isWiderThan1024 = useIsWindowWider(1024);
  const { t } = useTranslation(['landing']);
  const { width = 0 } = useWindowSize();
  const marginLeft = Math.min(-(1440 - width) / 2, 0);

  return (
    <>
      <Flex
        {...{ name: 'roadmapAnchor' }}
        sx={{ backgroundColor: 'dark.500', flexDirection: 'column', paddingTop: isWiderThan1024 ? 120 : 80 }}
      >
        <Heading
          as="h3"
          variant="styles.h3"
          sx={{
            textAlign: 'center',
            marginX: 24,
            marginBottom: isWiderThan1024 ? 64 : 24,
            color: 'white.400',
          }}
        >
          {t('landing:roadmap')}
        </Heading>
        {isWiderThan1024 ? (
          <Flex
            sx={{
              position: 'relative',
              paddingTop: 96,
              paddingBottom: 192,
              overflow: 'hidden',
              marginLeft,
            }}
          >
            {isWiderThan1024 && (
              <Flex
                sx={{
                  width: 1440,
                  flexShrink: 0,
                }}
              >
                <MilestonesSVG />
              </Flex>
            )}
            <MilestoneL
              title="Q3 2021"
              content={t('landing:q3_2021')}
              textAlign="left"
              customeStyle={{
                top: '5%',
                left: 318,
              }}
              childNode={<Line321SVG />}
            />
            <MilestoneL
              title="Q4 2021"
              content={t('landing:q4_2021')}
              textAlign="right"
              customeStyle={{
                top: '50%',
                left: 258,
              }}
              childNode={<Line421SVG />}
            />
            <MilestoneL
              title="Q1 2022"
              content={t('landing:q1_2022')}
              textAlign="left"
              customeStyle={{
                top: '28%',
                left: 628,
              }}
              childNode={<Line122SVG />}
            />
            <MilestoneL
              title="Q2 2022"
              content={t('landing:q2_2022')}
              textAlign="right"
              customeStyle={{
                top: '75%',
                left: 578,
              }}
              childNode={<Line222SVG />}
            />
            <MilestoneL
              title="Q3 2022 +"
              content={t('landing:q3_2022')}
              textAlign="left"
              customeStyle={{
                top: '23%',
                left: 958,
              }}
              childNode={<Line322SVG />}
            />
          </Flex>
        ) : (
          <>
            <MilestoneS
              title="Q3 2021"
              content={t('landing:q3_2021')}
              workingState="doing"
              childNode={<Milestone1SVG />}
            />
            <MilestoneS
              title="Q4 2021"
              content={t('landing:q4_2021')}
              workingState="new"
              childNode={<Milestone2SVG />}
            />
            <MilestoneS
              title="Q1 2022"
              content={t('landing:q1_2022')}
              workingState="new"
              childNode={<Milestone3SVG />}
            />
            <MilestoneS
              title="Q2 2022"
              content={t('landing:q2_2022')}
              workingState="new"
              childNode={<Milestone4SVG />}
            />
            <MilestoneS
              title="Q3 2022 +"
              content={t('landing:q3_2022')}
              workingState="new"
              childNode={<Milestone5SVG />}
              last={true}
            />
          </>
        )}
      </Flex>
    </>
  );
}
