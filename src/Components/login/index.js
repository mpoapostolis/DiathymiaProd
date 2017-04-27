import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import FontIcon from 'material-ui/FontIcon'
import TextField from 'material-ui/TextField'
import './style.css'
import { postData } from '../../utils'

const style = {
  paddingTop: '25px'
}
class Login extends Component {
  static propTypes = {
    nextStep: React.PropTypes.func
  }
  render () {
    return (
      <div className='signupContainer'>
        <h1 style = {{color: 'rgba(22, 109, 164, 0.88)'}}>login</h1>
        <TextField
          hintStyle={{ color:'rgb(0,135,192)' }}
          style={style}
          ref='name'
          underlineStyle={{ borderColor:'rgb(0,135,172)' }}
          underlineFocusStyle={{ borderColor:'rgb(0,135,192)' }}
          autoFocus
          hintText='Name'
          fullWidth />
        <TextField
          style={style}
          underlineStyle={{ borderColor:'rgb(0,135,172)' }}
          underlineFocusStyle={{ borderColor:'rgb(0,135,192)' }}
          hintStyle={{ color:'rgb(0,135,192)' }}
          onFocus={() => { this.setState({ passwordError: '' }) }}
          hintText='Password'
          type='password'
          fullWidth />
        <button className="button" onClick={() => { this.checkIfOk() }}><FontIcon style={{ color:'white' }} className='fa fa-sign-in' /></button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    nextStep: actions.nextStep,
    storeUsername: actions.storeUsername,
    storePassword: actions.storePassword
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)
