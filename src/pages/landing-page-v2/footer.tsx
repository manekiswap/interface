import { Button, Flex, FlexProps, Grid, Heading, Spinner, Text } from '@theme-ui/components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import isEmail from 'validator/es/lib/isEmail';

import ConfirmDialog from '../../components/dialogs/confirm.dialog';
import FormInput from '../../components/forms/form.input';
import { mediaWidthTemplates } from '../../constants/media';
import useToggle from '../../hooks/useToggle';
import subscribeService from '../../services/subscribe-service';

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

interface FormValues {
  email: string;
}

const Footer: React.FC<Props> = ({ maxContentWidth }) => {
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
        sx={{
          flexDirection: 'column',
        }}
      >
        <div
          sx={{
            backgroundColor: '#110F26',
            paddingY: 64,
            paddingX: 16,
          }}
        >
          <Heading
            variant="h2"
            sx={{
              color: 'white.400',
              fontWeight: 700,
              fontSize: 48,
              lineHeight: '56px',
              textAlign: 'center',
              ...mediaWidthTemplates.upToMedium({
                fontSize: 32,
                lineHeight: '32px',
              }),
            }}
          >
            Subscribe to our newsletter
          </Heading>
          <Text
            as="p"
            sx={{
              fontSize: 16,
              lineHeight: '20px',
              fontWeight: 500,
              color: 'white.300',
              textAlign: 'center',
              marginTop: '8px',
            }}
          >
            Make sure to receive our latest updates and announcements
          </Text>
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
              }}
              disabled={isSubmitting || !!errors.email}
            >
              {isSubmitting ? <Spinner size={24} /> : 'Submit'}
            </Button>
          </Grid>
        </div>
        <div
          sx={{
            paddingY: 20,
            paddingX: 16,
            backgroundColor: '#34314B',
          }}
        >
          <Grid
            columns={'1fr auto auto auto auto'}
            sx={{
              maxWidth: maxContentWidth,
              marginX: 'auto',
              '& a': {
                textDecoration: 'none',
              },
            }}
          >
            <Text
              sx={{
                fontSize: 12,
                lineHeight: '18px',
                color: 'white.300',
              }}
            >
              Copyright © 2021 Maneki, Inc.
            </Text>
            <a href="#">
              <Text
                sx={{
                  fontSize: 12,
                  lineHeight: '18px',
                  color: 'white.300',
                }}
              >
                Twitter
              </Text>
            </a>
            <a href="#">
              <Text
                sx={{
                  fontSize: 12,
                  lineHeight: '18px',
                  color: 'white.300',
                }}
              >
                Github
              </Text>
            </a>
            <a href="#">
              <Text
                sx={{
                  fontSize: 12,
                  lineHeight: '18px',
                  color: 'white.300',
                }}
              >
                Telegram
              </Text>
            </a>
            <a href="#">
              <Text
                sx={{
                  fontSize: 12,
                  lineHeight: '18px',
                  color: 'white.300',
                }}
              >
                Medium
              </Text>
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
