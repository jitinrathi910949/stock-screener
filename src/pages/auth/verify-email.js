import { useEffect } from 'react';
import LoadingScreen from 'components/LoadingScreen';
import queryString from 'query-string';
import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { MIconButton } from 'components/@material-extend';
import { PATH_SCREENER } from 'routes/paths';

import useAuth from 'hooks/useAuth';

function VerifyEmail() {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { verifyUser, getUser } = useAuth();
  // const { pathname } = router;
  const locQuery = router.query;

  useEffect(() => {
    const urlQueryVal = queryString.parse(locQuery);

    if (urlQueryVal.token) {
      validateToken(urlQueryVal.token);
    }
  }, [location]);

  const validateToken = async (token) => {
    try {
      const response = await verifyUser(token);
      const { data = {} } = response || {};
      if (data?.isSuccess) {
        enqueueSnackbar('Email Verified Successfully.', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        getUser();
        router.push(PATH_SCREENER.root);
      }
    } catch (err) {
      const msg = err?.message || 'Something went wrong. Please try resending email';
      router.push(PATH_SCREENER.root);
      enqueueSnackbar(msg, {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };

  return <LoadingScreen />;
}

export default VerifyEmail;
