import React from 'react';
import { Box, TextField, Button, Grid } from '@material-ui/core';
import { mapStaticKeysLabels } from '../../models/statistic';
import { Autocomplete } from 'formik-material-ui-lab';
import { Formik, Form, Field } from 'formik';
import { store } from '../../thrd/store';

const validate = values => {
  if (!!values && values.godina && values.godina.value) {
    return true;
  } else {
    return false;
  }
};

const KibsFormComponent = ({ onChange, values, ...props }) => {
  return (
    <Formik
      validateOnChange
      validateOnMount
      onSubmit={(values, formikHelpers) => {
        formikHelpers.setSubmitting(false);
        onChange(values);
      }}
      enableReinitialize
      initialValues={values || { godina: {} }}
    >
      {({ values }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                renderInput={params => (
                  <TextField {...params} label="Godina" variant="outlined" />
                )}
                disablePortal
                options={Object.values(props.godine).map(g => ({
                  value: +g,
                  label: `${g}`,
                }))}
                blurOnSelect
                getOptionLabel={option => option.label}
                name="godina"
                component={Autocomplete}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                renderInput={params => (
                  <TextField {...params} label="Sezona" variant="outlined" />
                )}
                disablePortal
                options={Object.values(props.sezone).map(s => ({
                  value: s,
                  label: `${s.toUpperCase()}`,
                }))}
                blurOnSelect
                getOptionLabel={option => option.label}
                name="sezona"
                component={Autocomplete}
              />
            </Grid>
          </Grid>
          <Box mt={3} alignItems="right" textAlign="right">
            <Button
              disabled={!validate(values)}
              type="submit"
              variant="contained"
              color="primary"
            >
              Prikazi KIBS
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

const KibsForm = store.connect((state, props) => {
  return { ...state, ...props };
})(KibsFormComponent);

export { KibsForm };
