import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import FontIcon from 'material-ui/FontIcon'
import TextField from 'material-ui/TextField'
import './style.css'
import { postData } from '../../utils'
import { browserHistory } from 'react-router'


class Home extends Component {
  render () {
    const { hero, loggedIn } = this.props
    return (
      <div className='home'>
        <div className='imageContainer'>
          <img  src={`/images/${loggedIn ? hero : 'saitama'}.png`}></img>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hero: state.account.hero,
    loggedIn: state.view.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    nextStep: actions.nextStep,
    login: actions.login,
    selectHero: actions.selectHero,
    storeUsername: actions.storeUsername,
    storePassword: actions.storePassword,
    userLogin: actions.userLogin,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
