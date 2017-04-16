import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import FontIcon from 'material-ui/FontIcon'
import Info from './info'
import Age from './age'
import Hero from './hero'
import './style.css'

import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper'

class HorizontalNonLinearStepper extends React.Component {

  getStepContent (stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Info />
      case 1:
        return <Age />
      case 2:
        return <Hero />
      default:
        return 'You\'re a long way from home sonny jim!'
    }
  }

  render () {
    const { signUpStep } = this.props
    return (
      <div style={{ width: '90%', marginLeft:'5%', marginTop:'20px' }} className='signupIndex'>
        <Stepper linear={false} activeStep={signUpStep}>
          <Step>
            <StepLabel
              icon={<FontIcon style={{ zIndex:'-2', color: signUpStep === 0 ? 'rgb(0,135,192)' : 'grey' }} className='fa fa-info' />}
              onClick={() => this.setState({ stepIndex: 0 })}>
              Info
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
              icon={<FontIcon style={{ zIndex:'-2', color: signUpStep === 1 ? 'rgb(177, 0, 0)' : 'grey' }} className='fa fa-venus-mars' />}
              onClick={() => this.setState({ stepIndex: 0 })}>
              Gender
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
              icon={<FontIcon style={{ color: signUpStep === 2 ? 'rgb(218, 165, 8)' : 'grey' }} className='fa fa-superpowers' />}
              onClick={() => this.setState({ stepIndex: 1 })}>
              Hero
            </StepLabel>
          </Step>
        </Stepper>
        <p>{this.getStepContent(signUpStep)}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    signUpStep: state.view.signUpStep
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    openDrawer: actions.openDrawer
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalNonLinearStepper)
