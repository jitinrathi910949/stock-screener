import * as Yup from 'yup';
import { useRef } from 'react';
import _ from 'lodash';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { OutlinedInput, FormHelperText, Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';

// routes

// ----------------------------------------------------------------------

export default function VerifyCodeForm(props) {
  const codeInputRef = useRef([null, null, null, null]);

  const onBtPress = (event, i) => {
    if (event.keyCode === 8) {
      if (i > 0 && _.isEmpty(event.target.value)) codeInputRef.current[i - 1].focus();
    }
  };

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.number().required('Code is required'),
    code2: Yup.number().required('Code is required'),
    code3: Yup.number().required('Code is required'),
    code4: Yup.number().required('Code is required')
    // code5: Yup.number().required('Code is required'),
    // code6: Yup.number().required('Code is required')
  });

  const formik = useFormik({
    initialValues: {
      code1: '',
      code2: '',
      code3: '',
      code4: ''
      // code5: '',
      // code6: ''
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: async (values, formikProps) => {
      const code = `${values.code1}${values.code2}${values.code3}${values.code4}`;
      await props.onVerifyCode(code, formikProps);
    }
  });

  const maxLength = (object, i) => {
    if (i <= 2 && !_.isEmpty(object.target.value)) codeInputRef.current[i + 1].focus();
    if (i > 0 && _.isEmpty(object.target.value)) codeInputRef.current[i - 1].focus();
    if (object.target.value.length === 4) {
      const code = object.target.value;
      codeInputRef.current[i].value = code.charAt(i);
      formik.setFieldValue('code1', code.charAt(0));
      formik.setFieldValue('code2', code.charAt(1));
      formik.setFieldValue('code3', code.charAt(2));
      formik.setFieldValue('code4', code.charAt(3));
    } else if (object.target.value.length > object.target.maxLength) {
      return (object.target.value = object.target.value.slice(0, object.target.maxLength));
    }
    return null;
  };

  const { values, errors, isValid, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <Stack direction="row" spacing={2} justifyContent="center">
            {Object.keys(values).map((item, i) => (
              <OutlinedInput
                key={item}
                {...getFieldProps(item)}
                type="number"
                inputRef={(el) => (codeInputRef.current[i] = el)}
                placeholder="-"
                onInput={(event) => maxLength(event, i)}
                onKeyUp={(event) => onBtPress(event, i)}
                error={Boolean(touched[item] && errors[item])}
                inputProps={{
                  maxLength: 1,
                  pattern: '[0-9]*',
                  sx: {
                    p: 0,
                    textAlign: 'center',
                    width: { xs: 36, sm: 56 },
                    height: { xs: 36, sm: 56 }
                  }
                }}
              />
            ))}
          </Stack>

          <FormHelperText error={!isValid} style={{ textAlign: 'right' }}>
            {!isValid && 'Code is required'}
          </FormHelperText>
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 3 }}>
          Verify
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
VerifyCodeForm.propTypes = {
  onVerifyCode: PropTypes.func
};
