import { useTranslation } from 'react-i18next';
import { Flex, Heading } from 'theme-ui';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <Flex sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'dark.400' }}>
      <Heading as="h1" variant="styles.h1" sx={{ color: 'white.400' }}>
        {t('not_found')}
      </Heading>
    </Flex>
  );
}
