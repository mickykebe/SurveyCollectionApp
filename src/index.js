import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import indigo from 'material-ui/colors/indigo';
import blueGrey from 'material-ui/colors/blueGrey';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: indigo,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <AppContainer />
      </Router>
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('root'));
registerServiceWorker();
