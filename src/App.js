import React, { Component } from 'react';
import logo from './logo.svg';
import MenuBar from './Components/MenuBar'
import Drawer from './Components/MenuBar/Drawer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontIcon from 'material-ui/FontIcon'
import * as actions from './redux/actions'
import './App.css'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class App extends Component {
  render() {

    const { toggleDrawer, drawerOpen } = this.props
    return (
      <div className="App">
        <MenuBar
          {...this.props}
        />
        <div className="children">
          <button onClick = {() => fetch('http://localhost:3001').then(res => res.json().then(data => console.log(data)))}> GET </button>

          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hero: state.account.hero,
    drawerOpen: state.view.drawerOpen,
    dialogOpen: state.view.dialogOpen,
    loggedIn: state.account.loggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleDrawer: actions.toggleDrawer,
    toggleDialog: actions.toggleDialog
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
