import React from 'react';
import { Box, TextField, Button, Grid } from '@material-ui/core';
import { mapStaticKeysLabels } from '../../models/statistic';
import { Autocomplete } from 'formik-material-ui-lab';
import { Formik, Form, Field } from 'formik';
import bihgeojson from '../../assets/geo-data/bihgeo.json';
import { humanize } from '../../utils/humanize';
import dataJSON from '../../assets/data.json';

const validate = values => {
  if (!!values && values.godina.value && values.parametar) {
    return true;
  } else {
    return false;
  }
};

const SingleForm = ({ onChange, values }) => {
  return (
    <Formik
      validateOnChange
      validateOnMount
      onSubmit={(values, formikHelpers) => {
        formikHelpers.setSubmitting(false);
        onChange(values);
      }}
      enableReinitialize
      initialValues={values || { godina: {}, parametar: {} }}
    >
      {({ values }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                disablePortal
                name="parametar"
                blurOnSelect
                component={Autocomplete}
                options={Object.keys(mapStaticKeysLabels).map(
                  key => mapStaticKeysLabels[key],
                )}
                renderInput={params => (
                  <TextField {...params} label="Parametar" variant="outlined" />
                )}
                getOptionLabel={option => option.label}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                renderInput={params => (
                  <TextField {...params} label="Godina" variant="outlined" />
                )}
                disablePortal
                options={[
                  { value: 2017, label: '2017' },
                  { value: 2019, label: '2019' },
                ]}
                blurOnSelect
                getOptionLabel={option => option.label}
                name="godina"
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
              Primeni filtere
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export { SingleForm };
