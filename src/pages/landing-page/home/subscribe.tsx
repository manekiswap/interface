import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Flex, FlexProps, Grid, Heading, Spinner, Text } from 'theme-ui';
import isEmail from 'validator/es/lib/isEmail';

import ConfirmDialog from '../../../components/dialogs/confirm.dialog';
import FormInput from '../../../components/forms/form.input';
import { mediaWidthTemplates } from '../../../constants/media';
import useToggle from '../../../hooks/useToggle';
import subscribeService from '../../../services/subscribe-service';

type Props = Omit<FlexProps, 'sx'>;

interface FormValues {
  email: string;
}

export default function Subscribe(props: Props) {
  const { className } = props;
  const [active, toggle] = useToggle(false);
  const { t } = useTranslation(['landing']);
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
        className={className}
        sx={{
          paddingBottom: 64,
          paddingX: 16,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Heading
          variant="styles.h2"
          sx={{
            color: 'white.400',
            fontWeight: 500,
            fontSize: 48,
            lineHeight: '56px',
            textAlign: 'center',
            ...mediaWidthTemplates.upToMedium({
              fontSize: 40,
              lineHeight: '48px',
            }),
            ...mediaWidthTemplates.upToSmall({
              fontSize: 28,
              lineHeight: '32px',
            }),
          }}
        >
          Subscribe to our newsletter
        </Heading>
        <Text
          sx={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 20,
            lineHeight: '28px',
            fontWeight: 500,
            textAlign: 'center',
            marginTop: '8px',
            color: 'rgba(226, 108, 255, 1)',
            ...mediaWidthTemplates.upToMedium({
              fontSize: 16,
              lineHeight: '24px',
            }),
          }}
        >
          Make sure to receive our latest updates and announcements
        </Text>
        <Grid
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: '100%',
            gap: 12,
            gridTemplateColumns: '1fr auto',
            maxWidth: 645,
            marginX: 'auto',
            marginTop: 44,
            'button, input, input::placeholder, input::-ms-input-placeholder': {
              fontFamily: "'DM Mono', monospace",
            },
            ...mediaWidthTemplates.upToSmall({
              gridTemplateColumns: '1fr',
              gap: 32,
            }),
          }}
        >
          <FormInput
            placeholder="Your email address"
            sx={{
              minHeight: 56,
              position: 'relative',
              '& *:not(span)': { height: '100%' },
              '& span': {
                position: 'absolute',
                bottom: 0,
                left: 0,
                transform: 'translateY(100%)',
              },
              '& > div': {
                borderRadius: 0,
                borderColor: 'rgba(78, 83, 125, 0.3)',
              },
              '& input': {
                borderRadius: 0,
              },
            }}
            error={errors.email?.message}
            {...register('email', {
              required: true,
              validate: (value: string) => {
                return isEmail(value) ? true : t('landing:wrong_email_format');
              },
            })}
          />
          <Button
            sx={{
              padding: '18px 57px',
              borderRadius: 0,
              background: 'rgba(24, 235, 251, 1)',
              '&:not(:disabled):hover': {
                backgroundColor: 'rgba(24, 235, 251, 1)',
              },
            }}
            disabled={isSubmitting || !!errors.email}
          >
            {isSubmitting ? <Spinner size={24} /> : 'Submit'}
          </Button>
        </Grid>
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
