import React from 'react';
import Page from 'components/Page';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Box, Button, Grid } from '@material-ui/core';

import { getColor } from 'utils/colors';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { appFirebase } from '../thrd/firbase';
import { store } from '../thrd/store';

const TabContent = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '1000px',
        padding: '1rem',
        border: '1px solid #dee2e6',
        background: 'white',
        borderTop: 'none',
      }}
    >
      {children}
    </div>
  );
};

class AdminPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page
        className="DashboardPage"
        title=""
        breadcrumbs={[{ name: 'Osnove informacije', active: true }]}
      >
        <Tabs defaultActiveKey="Osnovne informacije" transition={false}>
          <Tab eventKey="Osnovne informacije" title="Osnovne informacije">
            <TabContent></TabContent>
          </Tab>
          <Tab
            eventKey="Pracenje stanja bezbednosti kibsa"
            title="Pracenje stanja bezbednosti kibsa"
          >
            <TabContent>
              <Formik
                onSubmit={values => {
                  return appFirebase
                    .database()
                    .ref('pracenje')
                    .set(values)
                    .then(() => {
                      const state = store.getState();
                      store.setState({
                        ...state,
                        pracenje: values,
                      });
                    });
                }}
                enableReinitialize
                initialValues={{...this.props.pracenje}}
              >
                {() => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          variant="outlined"
                          minRows={3}
                          fullWidth={true}
                          multiline
                          type="area"
                          rows={4}
                          name="troskovi"
                          label="Troskovi saobracajnih nezgoda"
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          variant="outlined"
                          rows={4}
                          multiline
                          fullWidth={true}
                          name="nezgode"
                          label="Saobracajne nezgode i njihove posledice"
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          variant="outlined"
                          rows={4}
                          multiline
                          fullWidth={true}
                          name="indikatori"
                          label="Indikatori bezbednosti saobracaja"
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          variant="outlined"
                          rows={4}
                          fullWidth={true}
                          multiline
                          name="stavovi"
                          label="Stavovi ucesnika u saobracaju"
                          component={TextField}
                        />
                      </Grid>
                    </Grid>
                    <Box mt={3} alignItems="right" textAlign="right">
                      <Button type="submit" variant="contained" color="primary">
                        Sacuvaj
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </TabContent>
          </Tab>
          <Tab eventKey="zasto kibs" title="Zasto Kibs">
            <TabContent></TabContent>
          </Tab>
        </Tabs>
      </Page>
    );
  }
}
export default store.connect(state => state)(AdminPage);
