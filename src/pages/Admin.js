import React, { useEffect, useState } from 'react';
import Page from 'components/Page';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Box, Button, Grid } from '@material-ui/core';

import { Formik, Form, Field } from 'formik';
import { TextField, SimpleFileUpload } from 'formik-material-ui';
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

const AdminPage = props => {
  const [logedIn, setLogedIn] = useState(false);

  useEffect(() => {
    appFirebase.auth().onAuthStateChanged(user => {
      if (user) {
        setLogedIn(true);
      } else {
        setLogedIn(false);
      }
    });
  }, []);

  if (!logedIn) {
    return (
      <div
        style={{
          background: 'white',
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Formik
          onSubmit={(values, formikHelpers) => {
            appFirebase
              .auth()
              .signInWithEmailAndPassword(values.email, values.password)
              .then(res => {
                localStorage.setItem('logedUser', JSON.stringify(res.user));
                setLogedIn(true);
              })
              .catch(() => {
                formikHelpers.setErrors({
                  password: 'Email ili password nevalidni',
                  email: 'Email ili password nevalidni',
                });
              })
              .finally(() => {
                formikHelpers.setSubmitting(false);
              });
          }}
          initialValues={{ sifra: '' }}
        >
          {() => (
            <Form style={{ width: '250px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    fullWidth
                    name="email"
                    type="email"
                    label="Email"
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    fullWidth
                    name="password"
                    type="password"
                    label="Sifra"
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    name="1"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Uloguj se
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    );
  }

  return (
    <Page
      className="DashboardPage"
      title=""
      breadcrumbs={[{ name: 'Osnove informacije', active: true }]}
    >
      <Button
        onClick={() => {
          appFirebase.auth().signOut();
        }}
        color="primary"
        variant="contained"
        style={{ marginBottom: '1.6rem' }}
      >
        Logout
      </Button>
      <Tabs defaultActiveKey="Osnovne informacije" transition={false}>
        <Tab eventKey="Osnovne informacije" title="Osnovne informacije">
          <TabContent>
            <Formik
              onSubmit={(values, formikHelpers) => {
                const slikeKeys = [
                  'oblast_slika',
                  'predmet_slika',
                  'rezultat_slika',
                ].filter(key => typeof values[key] === 'object');

                const promises = slikeKeys.map(key => {
                  const ref = appFirebase.storage().ref(key);
                  return ref.put(values[key], { public: true }).then(res => {
                    return ref.getDownloadURL().then(url => {
                      return Promise.resolve({ key, url });
                    });
                  });
                });

                if (promises.length) {
                  return Promise.all((promises = [])).then((res = []) => {
                    res.forEach(({ key, url }) => {
                      values[key] = url;
                    });
                    appFirebase
                      .database()
                      .ref('osnovne')
                      .set({
                        ...values,
                      })
                      .then(() => {
                        const state = store.getState();
                        store.setState({
                          ...state,
                          osnovne: values,
                        });
                      });
                  });
                } else {
                  appFirebase
                    .database()
                    .ref('osnovne')
                    .set({
                      ...values,
                    })
                    .then(() => {
                      const state = store.getState();
                      store.setState({
                        ...state,
                        osnovne: values,
                      });
                      formikHelpers.setSubmitting(false);
                    });
                }
              }}
              enableReinitialize
              initialValues={{ ...props.osnovne }}
            >
              {() => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Field
                        variant="outlined"
                        minRows={3}
                        fullWidth={true}
                        multiline
                        rows={4}
                        name="oblast_text"
                        label="Oblast projekta"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Field
                        name="oblast_slika"
                        label="Slika Oblast Projekta"
                        component={SimpleFileUpload}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Field
                        variant="outlined"
                        minRows={3}
                        fullWidth={true}
                        multiline
                        rows={4}
                        name="predmet_text"
                        label="Predmet projekta"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Field
                        name="predmet_slika"
                        label="Predmet projekta slika"
                        component={SimpleFileUpload}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Field
                        variant="outlined"
                        minRows={3}
                        fullWidth={true}
                        multiline
                        rows={4}
                        name="rezultat_text"
                        label="Rezultat projekta"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Field
                        name="rezultat_slika"
                        label="Rezultat projekta slika"
                        component={SimpleFileUpload}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="svrha"
                        label="Svrha i cilj projekta"
                        component={TextField}
                        minRows={3}
                        fullWidth={true}
                        multiline
                        rows={4}
                      />
                    </Grid>
                  </Grid>
                  <Box mt={3} alignItems="right" textAlign="right">
                    <Button
                      name="1"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Sacuvaj
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </TabContent>
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
              initialValues={{ ...props.pracenje }}
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
                    <Button
                      name="2123"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Sacuvaj
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </TabContent>
        </Tab>
        <Tab eventKey="zasto kibs" title="Zasto Kibs">
          <TabContent>
            <Formik
              onSubmit={(values, formikHelpers) => {
                console.log(values, 'values');
                const slikeKeys = ['kibs_slika'].filter(
                  key => typeof values[key] === 'object',
                );

                const promises = slikeKeys.map(key => {
                  const ref = appFirebase.storage().ref(key);
                  return ref
                    .put(values[key])
                    .then(res => {
                      return ref.getDownloadURL().then(url => {
                        return Promise.resolve({ key, url });
                      });
                    })
                    .catch(e => {
                      console.log(e);
                    });
                });

                if (promises.length) {
                  return Promise.all(promises).then((res = []) => {
                    res.forEach(({ key, url }) => {
                      values[key] = url;
                    });
                    appFirebase
                      .database()
                      .ref('zasto')
                      .set({
                        ...values,
                      })
                      .then(() => {
                        const state = store.getState();
                        store.setState({
                          ...state,
                          zasto: values,
                        });
                      });
                  });
                } else {
                  appFirebase
                    .database()
                    .ref('zasto')
                    .set({
                      ...values,
                    })
                    .then(() => {
                      const state = store.getState();
                      store.setState({
                        ...state,
                        zasto: values,
                      });
                      formikHelpers.setSubmitting(false);
                    });
                }
              }}
              enableReinitialize
              initialValues={{ ...props.zasto }}
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
                        rows={4}
                        name="def"
                        label="Definicija KIBS-a"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        variant="outlined"
                        minRows={3}
                        fullWidth={true}
                        multiline
                        rows={4}
                        name="vaznost"
                        label="Vaznost KIBS-a"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        variant="outlined"
                        minRows={3}
                        fullWidth={true}
                        multiline
                        rows={4}
                        name="ocena"
                        label="Ocena pomocu zvezdica/Star rating"
                        component={TextField}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <Field
                        name="kibs_slika"
                        label="Slika"
                        component={SimpleFileUpload}
                      />
                    </Grid>
                  </Grid>
                  <Box mt={3} alignItems="right" textAlign="right">
                    <Button
                      name="1"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Sacuvaj
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </TabContent>
        </Tab>
        <Tab eventKey="model za proracun" title="Model za proracun kibs-a">
          <TabContent>
            <Formik
              onSubmit={(values, formikHelpers) => {
                const slikeKeys = ['model_slika'].filter(
                  key => typeof values[key] === 'object',
                );

                const promises = slikeKeys.map(key => {
                  const ref = appFirebase.storage().ref(key);
                  return ref
                    .put(values[key])
                    .then(res => {
                      return ref.getDownloadURL().then(url => {
                        return Promise.resolve({ key, url });
                      });
                    })
                    .catch(e => {
                      console.log(e);
                    });
                });

                if (promises.length) {
                  return Promise.all(promises).then((res = []) => {
                    res.forEach(({ key, url }) => {
                      values[key] = url;
                    });
                    appFirebase
                      .database()
                      .ref('model')
                      .set({
                        ...values,
                      })
                      .then(() => {
                        const state = store.getState();
                        store.setState({
                          ...state,
                          model: values,
                        });
                      });
                  });
                } else {
                  appFirebase
                    .database()
                    .ref('model')
                    .set({
                      ...values,
                    })
                    .then(() => {
                      const state = store.getState();
                      store.setState({
                        ...state,
                        model: values,
                      });
                      formikHelpers.setSubmitting(false);
                    });
                }
              }}
              enableReinitialize
              initialValues={{ ...props.model }}
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
                        rows={4}
                        name="metodologija"
                        label="Metodologija"
                        component={TextField}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <Field
                        name="model_slika"
                        label="Slika"
                        component={SimpleFileUpload}
                      />
                    </Grid>
                  </Grid>
                  <Box mt={3} alignItems="right" textAlign="right">
                    <Button
                      name="1"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Sacuvaj
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </TabContent>
        </Tab>
        <Tab eventKey="nosioci" title="Nosioci projekta">
          <TabContent>
            <Formik
              onSubmit={(values, formikHelpers) => {
                const slikeKeys = [
                  'milan_slika',
                  'suzana_slika',
                  'nikola_slika',
                  'luka_slika',
                ].filter(key => typeof values[key] === 'object');

                const promises = slikeKeys.map(key => {
                  const ref = appFirebase.storage().ref(key);
                  return ref
                    .put(values[key])
                    .then(res => {
                      return ref.getDownloadURL().then(url => {
                        return Promise.resolve({ key, url });
                      });
                    })
                    .catch(e => {
                      console.log(e);
                    });
                });

                if (promises.length) {
                  return Promise.all(promises).then((res = []) => {
                    res.forEach(({ key, url }) => {
                      values[key] = url;
                    });
                    appFirebase
                      .database()
                      .ref('nosioci')
                      .set({
                        ...values,
                      })
                      .then(() => {
                        const state = store.getState();
                        store.setState({
                          ...state,
                          nosioci: values,
                        });
                      });
                  });
                } else {
                  appFirebase
                    .database()
                    .ref('nosioci')
                    .set({
                      ...values,
                    })
                    .then(() => {
                      const state = store.getState();
                      store.setState({
                        ...state,
                        nosioci: values,
                      });
                      formikHelpers.setSubmitting(false);
                    });
                }
              }}
              enableReinitialize
              initialValues={{ ...props.nosioci }}
            >
              {() => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        name="milan_slika"
                        label="Milan slika"
                        component={SimpleFileUpload}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="suzana_slika"
                        label="Suzana slika"
                        component={SimpleFileUpload}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="nikola_slika"
                        label="Nikola slika"
                        component={SimpleFileUpload}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="luka_slika"
                        label="Luka slika"
                        component={SimpleFileUpload}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        variant="outlined"
                        minRows={3}
                        fullWidth={true}
                        multiline
                        rows={4}
                        name="publikacije"
                        label="Publikacije"
                        component={TextField}
                      />
                    </Grid>
                  </Grid>
                  <Box mt={3} alignItems="right" textAlign="right">
                    <Button
                      name="1"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Sacuvaj
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </TabContent>
        </Tab>
      </Tabs>
    </Page>
  );
};
export default store.connect(state => state)(AdminPage);
