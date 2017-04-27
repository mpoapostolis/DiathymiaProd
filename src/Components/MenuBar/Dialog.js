import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Avatar from 'material-ui/Avatar';
import './style.css'
import { browserHistory } from 'react-router'
import Divider from 'material-ui/Divider';

class DialogExampleSimple extends React.Component {

  info(){
    const {age, gender, hero, userName, logout} = this.props
    return <div>
      <Avatar
        src={`images/${this.props.hero}.png`}
        size="300"
        style ={{background:'rgba(41, 161, 172, 0.27)', float:'right', cursor: 'pointer'}}
      />
      <Divider/>
      <div className="dialog">
        <span>Όνομα: </span> {userName}
      </div>
      <Divider/>

      <div className="dialog">
        <span>Φύλο: </span> {gender}
      </div>
      <Divider/>

      <div className="dialog">
        <span>Ηλικία: </span> {age}
      </div>
      <Divider/>

      <div className="dialog">
        <div>Ήρωας: {this.props.hero}</div>
      </div>
    </div>
  }

  render() {

    const {age, gender, hero, userName, logout} = this.props
    const actions = [
      <FlatButton
        label="logout"
        style={{color:'rgba(22, 109, 164, 0.88)'}}
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => {toggleDialog(); logout();  browserHistory.push('/')}}
      />,
    ];
    const {dialogOpen, toggleDialog, loggedIn } = this.props
    return (
        <Dialog
          title= {loggedIn ? "Στοίχεια" : 'Ανωνυμος' }
          modal={false}
          actions={loggedIn ? actions : null}
          open={dialogOpen}
          onRequestClose={() => toggleDialog()}
        >
          {loggedIn ? this.info() : null}
        </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    drawerOpen: state.view.drawerOpen,
    dialogOpen: state.view.dialogOpen,
    age: state.account.age,
    gender: state.account.gender,
    hero: state.account.hero,
    userName: state.account.userName,
    loggedIn: state.view.loggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleDrawer: actions.toggleDrawer,
    toggleDialog: actions.toggleDialog,
    logout: actions.logout,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(DialogExampleSimple)
