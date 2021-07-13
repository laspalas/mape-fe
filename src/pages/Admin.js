import React, { useEffect, useState } from 'react';
import Page from 'components/Page';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Box, Button, Grid } from '@material-ui/core';
import { getMeta, getData, fetchData } from './adminFileUtils';

import { Formik, Form, Field } from 'formik';
import { TextField, SimpleFileUpload } from 'formik-material-ui';
import { appFirebase } from '../thrd/firbase';
import { store } from '../thrd/store';
import ExcelJS from 'exceljs';
import RichEditor from '../components/RichTextEditor/RichText';
import {
  EditorState,
  convertFromHTML,
  convertToRaw,
  ContentState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

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

const editorState = new EditorState.createWithContent(
  ContentState.createFromText('Hello'),
);

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

  const fromHtml = (textHtml = '') => {
    const blocksFromHTML = convertFromHTML(textHtml || '');
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
    return EditorState.createWithContent(state);
  };

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
                debugger;
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
                        oblast_text: draftToHtml(
                          convertToRaw(values.oblast_text.getCurrentContent()),
                        ),
                        predmet_text: draftToHtml(
                          convertToRaw(values.predmet_text.getCurrentContent()),
                        ),
                        rezultat_text: draftToHtml(
                          convertToRaw(
                            values.rezultat_text.getCurrentContent(),
                          ),
                        ),
                        svrha: draftToHtml(
                          convertToRaw(values.svrha.getCurrentContent()),
                        ),
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
                      oblast_text: draftToHtml(
                        convertToRaw(values.oblast_text.getCurrentContent()),
                      ),
                      predmet_text: draftToHtml(
                        convertToRaw(values.predmet_text.getCurrentContent()),
                      ),
                      rezultat_text: draftToHtml(
                        convertToRaw(values.rezultat_text.getCurrentContent()),
                      ),
                      svrha: draftToHtml(
                        convertToRaw(values.svrha.getCurrentContent()),
                      ),
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
              initialValues={{
                ...props.osnovne,
                oblast_text: fromHtml(props.osnovne.oblast_text),
                predmet_text: fromHtml(props.osnovne.predmet_text),
                rezultat_text: fromHtml(props.osnovne.rezultat_text),
                svrha: fromHtml(props.osnovne.svrha),
              }}
            >
              {({ handleBlur, setFieldValue, values }) => (
                <Form>
                  <Grid container spacing={2}>
                    {console.log(
                      draftToHtml(
                        convertToRaw(values.oblast_text.getCurrentContent()),
                      ),
                    )}
                    <Grid item xs={8}>
                      <RichEditor
                        onChange={setFieldValue}
                        onBlur={handleBlur}
                        editorState={values.oblast_text}
                        name="oblast_text"
                        label="Oblast projekta"
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
                      <RichEditor
                        onChange={setFieldValue}
                        onBlur={handleBlur}
                        editorState={values.predmet_text}
                        name="predmet_text"
                        label="Predmet projekta"
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
                      <RichEditor
                        onChange={setFieldValue}
                        onBlur={handleBlur}
                        editorState={values.rezultat_text}
                        name="rezultat_text"
                        label="Rezultat projekta"
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
                      <RichEditor
                        onChange={setFieldValue}
                        onBlur={handleBlur}
                        editorState={values.svrha}
                        name="svrha"
                        label="Svrha i cilj projekta"
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
                    .catch(e => {});
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
                    .catch(e => {});
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
                    .catch(e => {});
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
        <Tab eventKey="import" title="Import">
          <TabContent>
            <Formik
              onSubmit={values => {
                const wb = new ExcelJS.Workbook();
                const reader = new FileReader();
                const godina = +values.godina;
                const interval_limit = [
                  +values.levi_limit,
                  +values.desni_limit,
                ];
                const sezona = values.sezona;

                reader.readAsArrayBuffer(values.tabela_import);
                reader.onload = () => {
                  const buffer = reader.result;
                  wb.xlsx.load(buffer).then(workbook => {
                    const worksheet = workbook.getWorksheet(1);
                    const meta = getMeta(worksheet);
                    const data = getData(worksheet);
                    const req = {
                      data,
                      upper_limit: meta.upper_limit,
                      lower_limit: meta.lower_limit,
                      interval_limit,
                    };

                    fetchData(req).then(res => {
                      appFirebase
                        .database()
                        .ref(`results_${godina}${sezona ? `_${sezona}` : ''}`)
                        .set({
                          data: res,
                          godina: godina,
                          ...meta,
                          request: req,
                          sezona: sezona || null,
                          timestamp: new Date().getTime(),
                        });

                      appFirebase
                        .database()
                        .ref('godine')
                        .get()
                        .then(res => {
                          const godine = Object.values(res.toJSON() || {});
                          appFirebase
                            .database()
                            .ref('godine')
                            .set(Array.from(new Set([...godine, godina])));
                        });

                      appFirebase
                        .database()
                        .ref('sezone')
                        .get()
                        .then(res => {
                          const sezone = Object.values(res.toJSON() || {});
                          appFirebase
                            .database()
                            .ref('sezone')
                            .set(
                              Array.from(new Set([...sezone, sezona])).filter(
                                s => !!s,
                              ),
                            );
                        });
                    });
                  });
                };
                return true;
              }}
              enableReinitialize
              initialValues={{}}
              validateOnChange={false}
              validate={values => {
                const errors = {};

                if (!values.tabela_import) {
                  errors.tabela_import = 'Obavezno polje';
                }
                if (!values.godina) {
                  errors.godina = 'Obavezno polje';
                }
                if (!values.levi_limit) {
                  errors.levi_limit = 'Obavezno polje';
                }
                if (!values.desni_limit) {
                  errors.desni_limit = 'Obavezno polje';
                }

                return errors;
              }}
            >
              {({ errors }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        name="tabela_import"
                        label="Tabela import"
                        component={SimpleFileUpload}
                        error={errors.tabela_import}
                        helperText={errors.tabela_import}
                      />
                      <a href="/template.xlsx" download="template.xlsx">
                        Skini template
                      </a>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="godina"
                        label="Godina"
                        error={errors.godina}
                        helperText={errors.godina}
                        component={TextField}
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="sezona"
                        label="Sezona"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Field
                        name="levi_limit"
                        label="Levi limit"
                        error={errors.levi_limit}
                        helperText={errors.levi_limit}
                        component={TextField}
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Field
                        name="desni_limit"
                        label="Desni limit"
                        error={errors.desni_limit}
                        helperText={errors.desni_limit}
                        component={TextField}
                        type="number"
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
