import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const PracenjeStanjaKibsa = React.lazy(() =>
  import('pages/PracenjeStanjaKibsa'),
);
const Mape = React.lazy(() => import('pages/Mape'))
const ZastoKibs = React.lazy(() => import('pages/ZastoKibs'));
const OsnovneInformacije = React.lazy(() => import('pages/OsnovneInformacije'));
const InputGroupPage = React.lazy(() => import('pages/InputGroupPage'));
const BazaPodataka = React.lazy(() => import('pages/BazePodataka'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
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
                <Route exact path="/input-groups" component={InputGroupPage} />
                <Route exact path="/zasto_kibs" component={ZastoKibs} />
                <Route exact path="/baza" component={BazaPodataka} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
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
