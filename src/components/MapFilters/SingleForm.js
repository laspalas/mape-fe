import React from 'react';
import { Box, TextField, Button, Grid } from '@material-ui/core';
import { mapStaticKeysLabels } from '../../models/statistic';
import { Autocomplete } from 'formik-material-ui-lab';
import { Formik, Form, Field } from 'formik';
import bihgeojson from '../../assets/geo-data/bihgeo.json';
import { humanize } from '../../utils/humanize';
import dataJSON from '../../assets/data.json';
import { store } from '../../thrd/store';

const validate = (values, mapGodinaParams) => {
  if (
    !mapGodinaParams[
      `results_${values.godina ? values.godina.value : ''}${
        values.sezona ? `_${values.sezona.value}` : ''
      }`
    ]
  ) {
    return false;
  }
  if (!!values && values.parametar && values.parametar.value) {
    return true;
  } else {
    return false;
  }
};

const SingleFormComponent = ({ onChange, values, ...props }) => {
  const keysRes = Object.keys(props).filter(key => key.startsWith('results'));
  const godinaSezona = keysRes.map(key => key.split('_'));
  const mapGodinaSezone = godinaSezona.reduce((acc, gs) => {
    const godina = gs[1];
    const sezona = gs[2];
    const res = acc[godina] ? [...acc[godina], sezona] : [sezona];
    return {
      ...acc,
      [godina]: res.filter(r => !!r),
    };
  }, {});
  const mapGodinaParams = keysRes.reduce((acc, key) => {
    return {
      ...acc,
      [key]: Object.values(props[key].parametersOrder),
    };
  }, {});

  return (
    <Formik
      validateOnChange
      validateOnMount
      onSubmit={(values, formikHelpers) => {
        formikHelpers.setSubmitting(false);
        onChange(values);
      }}
      enableReinitialize
      initialValues={{ godina: {}, parametar: {}, sezona: {} }}
    >
      {({ values, setFieldValue }) => (
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
                onChange={(e, v) => {
                  setFieldValue('godina', v);
                  if (v && !mapGodinaSezone[v.value].length) {
                    setFieldValue('sezona', null);
                  }
                }}
                component={Autocomplete}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                renderInput={params => (
                  <TextField {...params} label="Sezona" variant="outlined" />
                )}
                disablePortal
                options={(
                  mapGodinaSezone[values.godina ? values.godina.value : ''] ||
                  []
                ).map(s => ({
                  value: s,
                  label: s,
                }))}
                blurOnSelect
                getOptionLabel={option => option.label}
                name="sezona"
                component={Autocomplete}
              />
            </Grid>
            <Grid item xs={12}>
              {mapGodinaParams[
                `results_${values.godina ? values.godina.value : ''}${
                  values.sezona ? `_${values.sezona.value}` : ''
                }`
              ] && (
                <Field
                  disablePortal
                  name="parametar"
                  blurOnSelect
                  component={Autocomplete}
                  options={
                    mapGodinaParams[
                      `results_${values.godina ? values.godina.value : ''}${
                        values.sezona ? `_${values.sezona.value}` : ''
                      }`
                    ] || []
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Parametar"
                      variant="outlined"
                    />
                  )}
                  getOptionLabel={option => option.label}
                />
              )}
            </Grid>
          </Grid>
          <Box mt={3} alignItems="right" textAlign="right">
            <Button
              disabled={!validate(values, mapGodinaParams)}
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

const SingleForm = store.connect((state, props) => {
  return { ...state, ...props };
})(SingleFormComponent);

export { SingleForm };
