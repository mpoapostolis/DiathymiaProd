import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import { browserHistory } from 'react-router'

class DrawerUndockedExample extends React.Component {
  render() {
    const { toggleDrawer, drawerOpen, loggedIn } = this.props
    return (
      <div>
        <Drawer
          docked={false}
          width={200}
          open={drawerOpen}
          onRequestChange={() => toggleDrawer()}
        >
          <MenuItem onTouchTap={() => {toggleDrawer(); browserHistory.push('/')}}>Home</MenuItem>
          <Divider/>
          {!loggedIn ? <MenuItem onTouchTap={() => {toggleDrawer(); browserHistory.push('/signup')}}>Sign up</MenuItem> : null }
          {!loggedIn ? <MenuItem onTouchTap={() => {toggleDrawer(); browserHistory.push('/login')}}>Log in</MenuItem> : null }
          {loggedIn ? <MenuItem onTouchTap={() => {toggleDrawer(); browserHistory.push('/chat')}}>Chat</MenuItem> : null }
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    drawerOpen: state.view.drawerOpen,
    loggedIn: state.account.loggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleDrawer: actions.toggleDrawer
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerUndockedExample)
