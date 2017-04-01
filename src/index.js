import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import store from './redux'
import Signup from './Components/signup'
import Chat from './Components/chat'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path='/' component={App}>
        {/* <IndexRoute component={App} /> */}
          <Route path='/signup' component={Signup} />
          <Route path='/chat' component={Chat} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
