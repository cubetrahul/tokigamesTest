import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import store from './redux/store'
import theme from './theme';
import FlightSearch from './containers/FlightSearch/Loadable';
import ShowFlights from './containers/ListFlights/Loadable';

import NotFound from './containers/NotFound/Loadable';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Switch>
            <Route path="/flights">
              <ShowFlights />
            </Route>
            <Route exact path="/">
              <FlightSearch />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
