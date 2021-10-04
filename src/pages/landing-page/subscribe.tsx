import { Box, Button, Flex, Heading, Spinner, Text } from '@theme-ui/components';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import isEmail from 'validator/es/lib/isEmail';

import LandingBottomBackgroundImg from '../../assets/images/landing/landing-bottom-background.png';
import MailBoxImg from '../../assets/images/landing/mailbox.png';
import LogoBlackSVG from '../../assets/images/logo-black.svg';
import ConfirmDialog from '../../components/dialogs/confirm.dialog';
import FormInput from '../../components/forms/form.input';
import useIsWindowWider from '../../hooks/useIsWindowWider';
import useToggle from '../../hooks/useToggle';
import { useWindowSize } from '../../hooks/useWindowSize';
import subscribeService from '../../services/subscribe-service';
import { wrapAsset } from '../../utils/renders';

interface FormValues {
  email: string;
}

export function Subscribe(props: { paddingX: string }) {
  const { paddingX } = props;
  const isWiderThan1024 = useIsWindowWider(1024);
  const { width = 0 } = useWindowSize();
  const { t } = useTranslation(['landing']);
  const [active, toggle] = useToggle(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ mode: 'all' });

  const onSubmit = async (values: FormValues) => {
    const result = await subscribeService.subscribe(values.email);
    if (result) {
      toggle();
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
            paddingBottom: isWiderThan1024 ? 80 : 56,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            backgroundImage: wrapAsset(MailBoxImg),
            backgroundSize: `${Math.min(width / 2, 430)}px  auto`,
            backgroundPosition: `bottom 0px right ${isWiderThan1024 ? '104px' : '12px'}`,
            backgroundRepeat: 'no-repeat',
            paddingX,
          }}
        >
          <LogoBlackSVG sx={{ height: 48, width: 160, marginBottom: 12 }} />
          <Heading as="h2" variant="styles.h2" sx={{ color: '#0E0E0E' }}>
            {t('landing:subscribe_newsletter')}
          </Heading>
          <Text sx={{ display: 'flex', color: '#5C5C5C', marginTop: 12, marginBottom: '8px' }}>
            {t('landing:subscribe_email')}
          </Text>
          <Flex
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              maxWidth: '100%',
              flexDirection: isWiderThan1024 ? 'row' : 'column',
              alignItems: isWiderThan1024 ? 'center' : 'flex-start',
            }}
          >
            <FormInput
              id="email"
              sx={{
                marginRight: 12,
                maxWidth: 340,
                width: '100%',
                '&>div': {
                  borderRadius: 'base',
                  borderColor: '#EBEBEB',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',

                  input: {
                    color: '#0E0E0E',

                    '::placeholder': {
                      color: '#C2C2C2',
                    },
                  },
                },
              }}
              placeholder={t('landing:your_email_address')}
              error={errors.email?.message}
              {...register('email', {
                required: true,
                validate: (value: string) => {
                  return isEmail(value) ? true : t('landing:wrong_email_format');
                },
              })}
            />
            <Button
              type="submit"
              variant="buttons.primary"
              sx={{
                borderRadius: 'base',
                width: 128,
                marginTop: isWiderThan1024 ? 0 : 12,
              }}
              disabled={isSubmitting || !!errors.email}
            >
              {isSubmitting ? <Spinner size={24} /> : t('landing:sign_up')}
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <ConfirmDialog
        active={active}
        title={t('landing:thank_you_for_subscribing')}
        content={t('landing:will_be_in_touch')}
        confirmText={t('landing:back_to_site')}
        onClose={() => {
          toggle();
        }}
      />
    </>
  );
}
