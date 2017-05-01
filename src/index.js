import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import store from './redux'
import Signup from './Components/signup'
import Results from './Components/results'
import Login from './Components/login'
import Home from './Components/home'
import Chat from './Components/chat'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path='/' component={App}>
        <IndexRoute component={Home} />
          <Route path='/signup' component={Signup} />
          <Route path='/chat' component={Chat} />
          <Route path='/results' component={Results} />
          <Route path='/login' component={Login} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
