import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import NosiociProjekta from './pages/NosiociProjekta';
import ModelKibs from './pages/ModelKibs';
import Mape  from 'pages/Mape';

const PracenjeStanjaKibsa = React.lazy(() =>
  import('pages/PracenjeStanjaKibsa'),
);
const ZastoKibs = React.lazy(() => import('pages/ZastoKibs'));
const OsnovneInformacije = React.lazy(() => import('pages/OsnovneInformacije'));
const InputGroupPage = React.lazy(() => import('pages/InputGroupPage'));
const BazaPodataka = React.lazy(() => import('pages/BazePodataka'));
const AdminPage = React.lazy(() => import('pages/Admin'));

// const getBasename = () => {
//   return `/${process.env.PUBLIC_URL.split('/').pop()}`;
// };

class App extends React.Component {
  render() {
    return (
      <HashRouter base={'/'}>
        <Switch>
          <MainLayout breakpoint={this.props.breakpoint}>
            <React.Suspense fallback={<PageSpinner />}>
              <Route exact path="/" component={OsnovneInformacije} />
              <Route
                exact
                path="/kibspracenje"
                component={PracenjeStanjaKibsa}
              />
              <Route exact path="/mape" component={Mape} />
              <Route exact path="/model_kibs" component={ModelKibs} />
              <Route exact path="/zasto_kibs" component={ZastoKibs} />
              <Route exact path="/baza" component={BazaPodataka} />
              <Route
                exact
                path="/nosioci_aktivnosti"
                component={NosiociProjekta}
              />
              <Route exact path="/admin" component={AdminPage} />
            </React.Suspense>
          </MainLayout>
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
