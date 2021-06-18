import { useTranslation } from 'react-i18next';
import { Flex, Heading } from 'theme-ui';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <Flex sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
      <Flex sx={{ alignItems: 'center' }}>
        <Heading as="h1" variant="styles.h1" sx={{ color: 'white' }}>
          {t('not_found')}
        </Heading>
      </Flex>
    </Flex>
  );
}
