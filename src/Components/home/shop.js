import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import FontIcon from 'material-ui/FontIcon'
import './style.sass'
import { browserHistory } from 'react-router'
import { postData } from '../../utils'

const heroes = ['Superman1', 'Belle1', 'Cinderella1', 'mikasa1', 'Batman1', 'Snow_White1', 'Spiderman1']

class Hero extends Component {
  static propTypes = {
    nextStep: React.PropTypes.func
  }
  state={
    choose: true
  }

  renderHero () {
    const url = 'http://localhost:3001/addUser'
    const { account, hero, nextStep, login } = this.props
    if (hero === '') return null
    return <div className='mainHeroContainer'>
      {this.state.choose
        ? <button className="button selectHero" onClick={()=> { postData(url, account); browserHistory.push('/') }}>Αγόρασε</button>
        : null
      }
      <p>{this.props.hero}</p>
      <img  className={`mainHero ${this.state.animation ? 'active': ''}`} src={`/images/${hero}.png`} />
    </div>
  }

  render () {
    const { selectHero, loggedIn } = this.props
    // return loggedIn ? (
    //   <div className='signupContainer'>
    //     <div className='chooseHero'>
    //       {this.renderHero()}
    //       <div className='miniHeroContainer'>
    //         {heroes.map((heroe, i) => <img
    //           key={i}
    //           className={'miniHero'}
    //           onClick={() => { selectHero(heroe); this.setState({choose: true}) }}
    //           src={`/images/${heroe}.png`} />)}
    //       </div>
    //     </div>
    //   </div>
    // ) : <div className='noLogin'>
    //   <p className='login'> Για να συνεχίσετε <br/>πρέπει να συνδεθείτε</p>
    // </div>
    return <div className='noLogin'>
      <p className='login'> Σύντομα</p>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.view.loggedIn,
    hero:state.account.hero,
    account: state.account
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    nextStep: actions.nextStep,
    prevStep: actions.prevStep,
    selectHero: actions.selectHero,
    login: actions.login,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Hero)
