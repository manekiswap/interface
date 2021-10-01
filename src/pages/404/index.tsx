import { Flex, Heading } from '@theme-ui/components';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <Flex sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'background' }}>
      <Heading as="h1" variant="styles.h1">
        {t('not_found')}
      </Heading>
    </Flex>
  );
}
