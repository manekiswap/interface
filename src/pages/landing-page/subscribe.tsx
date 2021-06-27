import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMedia, useToggle, useWindowSize } from 'react-use';
import { Box, Button, Flex, Heading, Image, Spinner, Text } from 'theme-ui';
import isEmail from 'validator/es/lib/isEmail';

import LandingBottomBackgroundImg from '../../assets/images/landing-bottom-background.png';
import LogoBlackImg from '../../assets/images/logo-black.png';
import MailBoxImg from '../../assets/images/mailbox.png';
import FormInput from '../../components/forms/form.input';
import ConfirmModal from '../../components/modals/confirm.modal';
import subscribeService from '../../services/subscribe-service';
import { wrapAsset } from '../../utils';

interface FormValues {
  email: string;
}

export function Subscribe(props: { paddingX: string }) {
  const { paddingX } = props;
  const isLargerThan1024 = useMedia('(min-width: 1024px)');
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const [active, toggle] = useToggle(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    const result = await subscribeService.subscribe(values.email);
    if (result) {
      toggle(true);
      reset();
    }
  };

  return (
    <>
      <Flex
        sx={{
          position: 'relative',
          height: 700,
          backgroundImage: wrapAsset(LandingBottomBackgroundImg),
          backgroundSize: 'auto',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Flex
          sx={{
            width: '100%',
            height: '100%',
            paddingBottom: isLargerThan1024 ? 80 : 56,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            backgroundImage: wrapAsset(MailBoxImg),
            backgroundSize: `${Math.min(width / 2, 430)}px  auto`,
            backgroundPosition: `bottom 0px right ${isLargerThan1024 ? '104px' : '12px'}`,
            backgroundRepeat: 'no-repeat',
            paddingX,
          }}
        >
          <Image src={LogoBlackImg} sx={{ height: 48, width: 160, marginBottom: 12 }} />
          <Heading as="h2" variant="styles.h2">
            {t('subscribe_newsletter')}
          </Heading>
          <Text sx={{ display: 'flex', color: 'dark.300', marginTop: 12, marginBottom: '8px' }}>
            {t('subscribe_email')}
          </Text>
          <Flex
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ maxWidth: '100%', flexDirection: isLargerThan1024 ? 'row' : 'column' }}
          >
            <Box sx={{ maxWidth: 340, width: '100%', marginRight: 12, flexDirection: 'column' }}>
              <FormInput
                id="email"
                wrapperStyle={{
                  borderColor: 'dark.100',
                  backgroundColor: 'white.300',
                  'input ': {
                    color: 'dark.300',
                    '::placeholder': {
                      color: 'dark.100',
                    },
                  },
                }}
                placeholder={t('your_email_address')}
                error={errors.email?.message}
                {...register('email', {
                  required: true,
                  validate: (value: string) => {
                    return isEmail(value) ? true : t('wrong_email_format');
                  },
                })}
              />
            </Box>
            <Button
              type="submit"
              variant="buttons.primary"
              sx={{
                width: 128,
                marginTop: isLargerThan1024 ? 0 : 12,
              }}
              disabled={isSubmitting || !!errors.email}
            >
              {isSubmitting ? <Spinner size={32} /> : t('sign_up')}
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <ConfirmModal
        active={active}
        title={t('thank_you_for_subscribing')}
        content={t('will_be_in_touch')}
        confirmText={t('back_to_site')}
        onClose={() => {
          toggle(false);
        }}
      />
    </>
  );
}
