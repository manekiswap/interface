import { Button, Flex, FlexProps, Grid, Heading, Spinner } from '@theme-ui/components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import isEmail from 'validator/es/lib/isEmail';

import ConfirmDialog from '../../../components/dialogs/confirm.dialog';
import FormInput from '../../../components/forms/form.input';
import { mediaWidthTemplates } from '../../../constants/media';
import useToggle from '../../../hooks/useToggle';
import subscribeService from '../../../services/subscribe-service';

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

interface FormValues {
  email: string;
}

const Footer: React.FC<Props> = ({ maxContentWidth, className }) => {
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
          flexDirection: 'column',
          // background: `url("${FooterBg}") no-repeat center bottom/contain`,
          // ...mediaWidthTemplates.upToSmall({
          //   backgroundImage: `url("${FooterMobileBg}")`,
          // }),
        }}
      >
        <div
          sx={{
            paddingBottom: 64,
            paddingX: 16,
          }}
        >
          <Heading
            variant="h2"
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
          <p
            sx={{
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
          </p>
          <Grid
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              gap: 12,
              gridTemplateColumns: '1fr auto',
              maxWidth: 645,
              marginX: 'auto',
              marginTop: 44,
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
        </div>
        <div
          sx={{
            marginTop: 300,
            paddingY: 20,
            paddingX: 16,
            ...mediaWidthTemplates.upToMedium({
              marginTop: 200,
            }),
            ...mediaWidthTemplates.upToSmall({
              marginTop: 100,
            }),
          }}
        >
          <Grid
            sx={{
              gridTemplateColumns: '1fr auto auto auto auto',
              gap: 24,
              maxWidth: maxContentWidth,
              marginX: 'auto',
              '& a': {
                textDecoration: 'none',
              },
              fontSize: 14,
              lineHeight: '18px',
              ...mediaWidthTemplates.upToSmall({
                gridTemplateColumns: 'repeat(4, auto) 1fr',
                gridTemplateRows: '1fr 1fr',
              }),
            }}
          >
            <p
              sx={{
                color: 'white.300',
                ...mediaWidthTemplates.upToSmall({
                  gridRow: '2',
                  gridColumn: '1/-1',
                }),
              }}
            >
              Copyright © 2021 Maneki, Inc.
            </p>
            <a href="https://twitter.com/manekiswap">
              <p
                sx={{
                  color: 'white.300',
                }}
              >
                Twitter
              </p>
            </a>
            <a href="https://github.com/manekiswap">
              <p
                sx={{
                  color: 'white.300',
                }}
              >
                Github
              </p>
            </a>
            <a href="https://t.me/manekiswap">
              <p
                sx={{
                  color: 'white.300',
                }}
              >
                Telegram
              </p>
            </a>
            <a href="https://info.manekiswap.com">
              <p
                sx={{
                  color: 'white.300',
                }}
              >
                More
              </p>
            </a>
          </Grid>
        </div>
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
};

export default Footer;
