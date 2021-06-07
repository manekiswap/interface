import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import isEmail from 'validator/es/lib/isEmail';

import LandingBottomBackgroundImg from '../../assets/images/landing-bottom-background.png';
import LogoBlackImg from '../../assets/images/logo-black.png';
import MailBoxImg from '../../assets/images/mailbox.png';
import subscribeService from '../../services/subscribe-service';
import { colors } from '../../themes/colors';

interface FormValues {
  email: string;
}

export function Subscribe() {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');
  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    await subscribeService.subscribe(values.email);
  };

  return (
    <Box
      height="700px"
      maxWidth="1440px"
      marginX="auto"
      backgroundImage={LandingBottomBackgroundImg}
      backgroundSize="auto"
      backgroundPosition="bottom"
      backgroundRepeat="no-repeat"
      position="relative"
    >
      <Flex
        height="100%"
        paddingBottom={isLargerThan1024 ? '80px' : '56px'}
        flexDirection="column"
        justifyContent="flex-end"
        paddingX={isLargerThan1024 ? '204px' : '24px'}
        backgroundImage={MailBoxImg}
        backgroundSize="auto"
        backgroundPosition={`bottom 0px right ${isLargerThan1024 ? '104px' : '-16px'}`}
        backgroundRepeat="no-repeat"
      >
        <Image src={LogoBlackImg} height="48px" width="160px" marginBottom="12" />
        <Heading as="h2" color={colors.text._04} fontSize="40px" fontWeight="bold">
          {t('subscribe_newsletter')}
        </Heading>
        <Text display={'flex'} color={colors.text._03} marginTop="3" marginBottom="8">
          {t('subscribe_email')}
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex maxWidth="100%" flexDirection={isLargerThan1024 ? 'row' : 'column'}>
            <FormControl maxWidth="340px" marginRight="12px" isInvalid={!!errors.email}>
              <Input
                id="email"
                display="inline-block"
                borderColor="#ebebeb"
                color="#5c5c5c"
                backgroundColor="rgba(255, 255, 255, 0.7)"
                borderRadius={0}
                height="54px"
                placeholder={t('your_email_address')}
                sx={{
                  '::placeholder': {
                    color: colors.text._01,
                  },
                }}
                {...register('email', {
                  required: true,
                  validate: (value: string) => {
                    return isEmail(value) ? true : t('wrong_email_format');
                  },
                })}
              />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              colorScheme="yellow"
              backgroundColor={colors.background._03}
              height="54px"
              width="152px"
              color={colors.text._04}
              borderRadius={0}
              marginTop={isLargerThan1024 ? 0 : '12px'}
              isLoading={isSubmitting}
            >
              {t('sign_up')}
            </Button>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
}
