import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
import { UploadAvatar } from 'components/upload';
import { fData } from 'utils/formatNumber';

// material
import { LoadingButton } from '@mui/lab';
import Label from 'components/Label';

import { Box, Card, Grid, Stack, TextField, Typography, Alert, FormHelperText } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
// Redux
// import { createEmployeeApi } from '../store/api';

UserProfileForm.propTypes = {
  isEdit: PropTypes.bool,
  currentBusiness: PropTypes.object,
};

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
  email: Yup.string().email('Email must be a valid email address'),
});

UserProfileForm.propTypes = {
  currentUser: PropTypes.object,
};

export default function UserProfileForm({ currentUser }) {
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      ...currentUser,
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // const params = {
        //   ...values,
        //   phoneNumber: `+91${values.phoneNumber}`,
        // };

        // let response = await dispatch(createEmployeeApi(params));
        let response = {};
        response = unwrapResult(response);
        console.log('reponse is', response);
        setSubmitting(false);
        resetForm();
        enqueueSnackbar('Create success. Your employee password is first name in lower caps', { variant: 'success' });
        // navigate(PATH_EMPLOYEE.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values, setFieldValue } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 4, px: 3 }}>
              <Label
                color={values.status !== 'VERIFIED' ? 'error' : 'success'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>

              <Box sx={{ mb: 1 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.avatarUrl}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.avatarUrl && errors.avatarUrl)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.avatarUrl && errors.avatarUrl}
                </FormHelperText>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Stack spacing={3}>
                {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="First name"
                    required
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />

                  <TextField
                    fullWidth
                    label="Last name"
                    required
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>

                <TextField
                  fullWidth
                  autoComplete="email"
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  disabled
                  helperText={touched.email && errors.email}
                />
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                  Update
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
