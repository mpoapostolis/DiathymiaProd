import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import FontIcon from 'material-ui/FontIcon'
import './style.sass'
import { browserHistory } from 'react-router'

const heroes = ['Superman', 'Belle', 'Cinderella', 'mikasa', 'Batman', 'Snow_White', 'Spiderman']

class Hero extends Component {
  static propTypes = {
    nextStep: React.PropTypes.func
  }
  state={
    choose: false
  }

  renderHero () {
    const { hero, nextStep, login } = this.props
    if (hero === '') return null
    return <div className='mainHeroContainer'>
      {this.state.choose
        ? <button className="button selectHero" onClick={()=> { login(); browserHistory.push('/') }}>end</button>
        : null
      }
      <p>{this.props.hero}</p>
      <img  className={`mainHero ${this.state.animation ? 'active': ''}`} src={`/images/${hero}.png`} />
    </div>
  }

  render () {
    const { selectHero } = this.props
    return (
      <div className='signupContainer'>
        <div className='chooseHero'>
          {this.renderHero()}
          <div className='miniHeroContainer'>
            {heroes.map((heroe, i) => <img
              key={i}
              className={'miniHero'}
              onClick={() => { selectHero(heroe); this.setState({choose: true}) }}
              src={`/images/${heroe}.png`} />)}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hero:state.account.hero
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
