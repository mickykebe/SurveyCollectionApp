import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import pink from 'material-ui/colors/pink';
import indigo from 'material-ui/colors/indigo';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
  palette: createPalette({
    primary: indigo,
    accent: pink,
  }),
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('root'));
registerServiceWorker();
