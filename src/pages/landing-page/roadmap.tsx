import { CSSObject, Flex, Heading, Text, useMediaQuery } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Element } from 'react-scroll';
import { useWindowSize } from 'react-use';

import Line122SVG from '../../assets/images/line122.svg';
import Line222SVG from '../../assets/images/line222.svg';
import Line321SVG from '../../assets/images/line321.svg';
import Line322SVG from '../../assets/images/line322.svg';
import Line421SVG from '../../assets/images/line421.svg';
import Milestone1SVG from '../../assets/images/milestone_1.svg';
import Milestone2SVG from '../../assets/images/milestone_2.svg';
import Milestone3SVG from '../../assets/images/milestone_3.svg';
import Milestone4SVG from '../../assets/images/milestone_4.svg';
import Milestone5SVG from '../../assets/images/milestone_5.svg';
import MilestonesSVG from '../../assets/images/milestones.svg';
import { colors } from '../../themes/colors';

function MilestoneL(props: {
  title: string;
  content: string;
  textAlign: 'left' | 'right';
  sx: CSSObject;
  childNode: ReactNode;
}) {
  const { title, content, textAlign, sx, childNode } = props;
  const flexDirection = textAlign === 'right' ? 'row-reverse' : 'row';
  const contentProps =
    textAlign === 'right'
      ? { justifyContent: 'flex-end', marginRight: '4', textAlign }
      : { justifyContent: 'flex-start', marginLeft: '4', textAlign };

  return (
    <Flex
      sx={{
        position: 'absolute',
        ...sx,
      }}
      flexDirection={flexDirection}
    >
      {childNode}
      <Flex flexDirection="column" width="208px" {...contentProps}>
        <Heading as="h3" color="white" fontSize="20px" fontWeight="bold" marginBottom="8px">
          {title}
        </Heading>
        <Text color={colors.text._03} fontSize="16px">
          {content}
        </Text>
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
  const beginColor = workingState === 'new' ? colors.background._04 : colors.background._03;
  const endColor = workingState === 'done' ? colors.background._03 : colors.background._04;

  return (
    <Flex marginX="24px" flexDirection={'row'}>
      <Flex flexDirection="column" alignItems="center">
        <Flex height="40px" width="4px" backgroundColor={beginColor}></Flex>
        <Flex height="64px" width="64px" justifyContent="center">
          {childNode}
        </Flex>
        <Flex flex={1} width="4px" backgroundColor={endColor}></Flex>
      </Flex>
      <Flex flex={1} marginLeft="16px" flexDirection="column">
        <Heading as="h3" color="white" fontSize="20px" fontWeight="bold" marginTop="60px" marginBottom="8px">
          {title}
        </Heading>
        <Text color={colors.text._03} fontSize="16px" marginBottom={last ? '20px' : 0}>
          {content}
        </Text>
      </Flex>
    </Flex>
  );
}

export default function Roadmap(props: { paddingX: string }) {
  const { paddingX } = props;
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const marginLeft = Math.min(-(1440 - width) / 2, 0);

  return (
    <Flex
      as={Element}
      name="roadmapAnchor"
      backgroundColor="#0e0e0e"
      flexDirection={'column'}
      paddingTop={isLargerThan1024 ? '120px' : '80px'}
    >
      <Heading
        as="h2"
        textAlign="center"
        fontSize="40px"
        fontWeight="bold"
        marginX="24px"
        marginBottom={isLargerThan1024 ? '64px' : '24px'}
      >
        {t('roadmap')}
      </Heading>
      {isLargerThan1024 ? (
        <Flex position="relative" paddingTop="24" paddingBottom="48" overflow="hidden" marginLeft={`${marginLeft}px`}>
          {isLargerThan1024 && (
            <Flex width="1440px" flexShrink={0}>
              <MilestonesSVG />
            </Flex>
          )}
          <MilestoneL
            title="Q3 2021"
            content={t('q3_2021')}
            textAlign="left"
            sx={{
              top: '5%',
              left: 318,
            }}
            childNode={<Line321SVG />}
          />
          <MilestoneL
            title="Q4 2021"
            content={t('q4_2021')}
            textAlign="right"
            sx={{
              top: '50%',
              left: 258,
            }}
            childNode={<Line421SVG />}
          />
          <MilestoneL
            title="Q1 2022"
            content={t('q1_2022')}
            textAlign="left"
            sx={{
              top: '28%',
              left: 628,
            }}
            childNode={<Line122SVG />}
          />
          <MilestoneL
            title="Q2 2022"
            content={t('q2_2022')}
            textAlign="right"
            sx={{
              top: '75%',
              left: 578,
            }}
            childNode={<Line222SVG />}
          />
          <MilestoneL
            title="Q3 2022 +"
            content={t('q3_2022')}
            textAlign="left"
            sx={{
              top: '23%',
              left: 958,
            }}
            childNode={<Line322SVG />}
          />
        </Flex>
      ) : (
        <>
          <MilestoneS title="Q3 2021" content={t('q3_2021')} workingState="doing" childNode={<Milestone1SVG />} />
          <MilestoneS title="Q4 2021" content={t('q4_2021')} workingState="new" childNode={<Milestone2SVG />} />
          <MilestoneS title="Q1 2022" content={t('q1_2022')} workingState="new" childNode={<Milestone3SVG />} />
          <MilestoneS title="Q2 2022" content={t('q2_2022')} workingState="new" childNode={<Milestone4SVG />} />
          <MilestoneS
            title="Q3 2022 +"
            content={t('q3_2022')}
            workingState="new"
            childNode={<Milestone5SVG />}
            last={true}
          />
        </>
      )}
    </Flex>
  );
}
