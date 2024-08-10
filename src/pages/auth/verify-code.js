import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import _ from 'lodash';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Link, Container, Typography } from '@mui/material';
import { MIconButton } from 'components/@material-extend';
// layouts
import useAuth from 'hooks/useAuth';
import LogoOnlyLayout from 'layouts/LogoOnlyLayout';

// context
// components
import Page from 'components/Page';
import { VerifyCodeForm } from 'components/authentication/verify-code';
import { PATH_SCREENER } from 'routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function VerifyCode() {
  const navigate = useRouter();
  const { signupData, sendOtp, userActivity, verifyOtp, register, markUserVerified } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // useEffect(() => {
  //   if (_.isEmpty(signupData)) {
  //     navigate(-1);
  //   }
  // }, []);

  const onVerifyCode = async (code, formikProps) => {
    try {
      const phoneNumber = _.includes(signupData.phoneNumber, '+91')
        ? signupData.phoneNumber
        : `+91${signupData.phoneNumber}`;
      const response = await verifyOtp({ phoneNumber, code });
      const { data } = response.data;
      if (data?.isVerified) {
        enqueueSnackbar('Otp Verification Successful', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        switch (userActivity) {
          case 'SIGNUP':
            await register(signupData);
            navigate(PATH_SCREENER.root);
            break;
          case 'RESET_PASSWORD':
            // Call Reset password api
            break;
          case 'NEW_USER':
            await markUserVerified(signupData);
            // navigate(PATH_AUTH.resetPassword);
            navigate(PATH_SCREENER.root);

            break;
          default:
            break;
        }
      } else {
        formikProps.setErrors({ afterSubmit: formikProps.error.message });
        formikProps.setSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      formikProps.setErrors({ afterSubmit: error.message });
      formikProps.setSubmitting(false);
    }
  };

  const onResendCode = async () => {
    // if (over) {
    // onResetTimer(true);
    // toggleResendLoading(true);
    // const phNo = route?.params?.phoneNumber;
    const response = await sendOtp(`+91${signupData.phoneNumber}`);
    const { data = {} } = response || {};
    if (data?.status === 'success') {
      enqueueSnackbar('Otp Sent successfully', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };
  return (
    <RootStyle title="Verify | Find-Scan">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <Button
            size="small"
            onClick={() => navigate(-1)}
            startIcon={<Icon icon={arrowIosBackFill} width={20} height={20} />}
            sx={{ mb: 3 }}
          >
            Back
          </Button>

          <Typography variant="h3" paragraph>
            Please check your phone!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            We have messaged a 4-digit confirmation code to {signupData?.phoneNumber}, please enter the code in below
            box to verify your email.
          </Typography>

          <Box sx={{ mt: 5, mb: 3 }}>
            <VerifyCodeForm onVerifyCode={onVerifyCode} />
          </Box>

          <Typography variant="body2" align="center">
            Don’t have a code? &nbsp;
            <Link variant="subtitle2" underline="none" onClick={() => onResendCode()}>
              Resend code
            </Link>
          </Typography>
        </Box>
      </Container>
    </RootStyle>
  );
}
