import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import FontIcon from 'material-ui/FontIcon'
import TextField from 'material-ui/TextField'
import './style.css'
import { postData } from '../../utils'
import { browserHistory } from 'react-router'

const style = {
  paddingTop: '25px'
}
class Login extends Component {
  state = {
    error: ''
  }
  login(){
    const { login,userLogin } = this.props
    const name = this.refs.name.input.value
    const password = this.refs.pass.input.value
    fetch('http://localhost:3001/login', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        name: name,
        password: password
      })
    }).then(data => data.json()).then(dat => {
         const success = dat.result.length
         if (success) {
           userLogin(dat.result[0])
           login();
           this.setState({error: ''});
           browserHistory.push('/')
         } else{
           this.setState({error: 'Λάθος'})
         }
    })
  }

  render () {
    const { error } = this.state
    return (
      <div className='signupContainer'>
        <div style={{display:'flex', justifyContent:'center'}}>
          {error.length ? <h1 style = {{color: 'rgba(164, 22, 22, 0.88)'}} >{error}</h1> :<h1 style = {{color: 'rgba(22, 109, 164, 0.88)'}}>login</h1>}
        </div>
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
          ref='pass'
          underlineStyle={{ borderColor:'rgb(0,135,172)' }}
          underlineFocusStyle={{ borderColor:'rgb(0,135,192)' }}
          hintStyle={{ color:'rgb(0,135,192)' }}
          onFocus={() => { this.setState({ passwordError: '' }) }}
          hintText='Password'
          type='password'
          fullWidth />
        <button className="button" onClick={() => this.login() }>
        <FontIcon style={{ color:'white' }} className='fa fa-sign-in' /></button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    nextStep: actions.nextStep,
    login: actions.login,
    storeUsername: actions.storeUsername,
    storePassword: actions.storePassword,
    userLogin: actions.userLogin,
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)
