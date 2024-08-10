// material
import NextLink from 'next/link';

import { styled } from '@mui/material/styles';
import { Box, Stack, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from 'routes/paths';
// hooks
// layouts
import AuthLayout from 'layouts/AuthLayout';
// components
import Page from 'components/Page';
import { MHidden } from 'components/@material-extend';
import { LoginForm } from 'components/authentication/login';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));


const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {

  return (
    <RootStyle title="Login | Find-Scan">
      <AuthLayout>
        Don’t have an account? &nbsp;
        <NextLink  href={PATH_AUTH.register} passHref>
        <Link variant="subtitle2">Get started</Link>
        </NextLink>
      </AuthLayout>
 

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Sign in to Find-Scan
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Enter your credentials.</Typography>
            </Box>
          </Stack>
          <LoginForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <NextLink variant="subtitle2" href={PATH_AUTH.register}>
                Get started
              </NextLink>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
