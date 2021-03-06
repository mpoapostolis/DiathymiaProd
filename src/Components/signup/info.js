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
class Home extends Component {
  static propTypes = {
    nextStep: React.PropTypes.func
  }
  state={
    nameError:'',
    passwordError:''
  }

  checkIfOk () {
    const { nameError, passwordError } = this.state
    const name = this.refs.name.input.value
    const password = this.refs.Password.input.value
    const repassword = this.refs.rePassword.input.value
    if (!name.length ) {
      this.setState({ nameError: 'the name field cant be empty' })
      return 0
    }
    if (password !== repassword || password.length < 4) {
      this.setState({ passwordError: 'the passwords must be same and over 4 char' })
      return 0
    }
    if (nameError.length ) return
    this.props.storeUsername(name)
    this.props.storePassword(password)
    this.props.nextStep()
  }

  initPass(){
    this.refs.Password.input.value = ''
    this.refs.rePassword.input.value = ''
  }

  render () {
    return (
      <div className='signupContainer'>
        <TextField
          hintStyle={{ color:'rgb(0,135,192)' }}
          style={style}
          ref='name'
          underlineStyle={{ borderColor:'rgb(0,135,172)' }}
          underlineFocusStyle={{ borderColor:'rgb(0,135,192)' }}
          autoFocus
          onBlur = {() => {
             postData('http://104.41.41.47:3001/existUsername', {name: this.refs.name.input.value})
            .then(data => data.found && this.setState({nameError: ` Το Όνομα: ${this.refs.name.input.value} υπάρχει`}))
          }}
          onFocus={() => { this.initPass(); this.setState({ nameError: '' }) }}
          errorText={this.state.nameError}
          hintText='Name'
          fullWidth />
        <TextField
          style={style}
          underlineStyle={{ borderColor:'rgb(0,135,172)' }}
          underlineFocusStyle={{ borderColor:'rgb(0,135,192)' }}
          hintStyle={{ color:'rgb(0,135,192)' }}
          errorText={this.state.passwordError}
          onFocus={() => { this.setState({ passwordError: '' }) }}
          ref='Password'
          hintText='Password'
          type='password'
          fullWidth />
        <TextField
          style={style}
          underlineStyle={{ borderColor:'rgb(0,135,172)' }}
          underlineFocusStyle={{ borderColor:'rgb(0,135,192)' }}
          hintStyle={{ color:'rgb(0,135,192)' }}
          errorText={this.state.passwordError}
          ref='rePassword'
          onKeyPress={(e) => e.key === 'Enter' ? this.checkIfOk() : null}
          hintText='Password'
          type='password'
          fullWidth
          />
        <button className="button" onClick={() => { this.checkIfOk() }}><FontIcon style={{ color:'white' }} className='fa fa-step-forward' /></button>
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

export default connect(null, mapDispatchToProps)(Home)
