import NextLink from 'next/link';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from 'routes/paths';
// layouts
import AuthLayout from 'layouts/AuthLayout';
// components
import Page from 'components/Page';
import { MHidden } from 'components/@material-extend';
import { RegisterForm } from 'components/authentication/register';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {

  return (
    <RootStyle title="Register | Find Scan">
      <AuthLayout>
        <Typography variant="body2" sx={{ mt: { md: -2 } }}>
          Already have an account? {''}
          <NextLink href={PATH_AUTH.login} passHref>
            <Link variant="subtitle2">Login</Link>
          </NextLink>
        </Typography>
      </AuthLayout>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Get started absolutely free.
              </Typography>
            </Box>
          </Box>

          <RegisterForm />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            By registering, I agree to Find-Scan&nbsp;
            <Link underline="always" color="text.primary" href="#">
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" color="text.primary" href="#">
              Privacy Policy
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?{' '}
              <NextLink href={PATH_AUTH.login} passHref>
                <Link variant="subtitle2">Login</Link>
              </NextLink>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
