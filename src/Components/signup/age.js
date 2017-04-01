import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import SelectField from 'material-ui/SelectField'
import FontIcon from 'material-ui/FontIcon'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import './style.sass'

const style = {
  paddingTop: '25px'
}
class Home extends Component {
  static propTypes = {
    nextStep: React.PropTypes.func
  }

  render () {
    return (
      <div className='signupContainer'>
        <SelectField
          underlineStyle={{ borderColor:'rgb(0,135,172)' }}
          fullWidth value={this.props.age} hiddenText='age' style={style} onChange={(event, index, value) => this.props.storeAge(value)}>
          <MenuItem value={8} primaryText='8' />
          <MenuItem value={9} primaryText='9' />
          <MenuItem value={10} primaryText='10' />
          <MenuItem value={11} primaryText='11' />
          <MenuItem value={12} primaryText='12' />
          <MenuItem value={13} primaryText='13' />
        </SelectField>
        <SelectField
          underlineStyle={{ borderColor:'rgb(0,135,172)' }}
          fullWidth value={this.props.gender} hiddenText='Gener' style={style} onChange={(event, index, value) => this.props.storeGender(value)}>
          <MenuItem value='Male' primaryText='Male' />
          <MenuItem value='Female' primaryText='Female'
            onKeyPress={(e) => e.key === 'Enter' ? this.props.nextStep() : null} />
        </SelectField>
        <div>
          <button className='button' onClick={() => this.props.nextStep()}><FontIcon style={{ color:'white' }} className='fa fa-step-forward' /></button>
          <button className='button' onClick={() => this.props.prevStep()}><FontIcon style={{ color:'white' }} className='fa fa-step-backward' /></button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    drawerOpen: state.view.Drawer,
    age: state.account.age,
    gender: state.account.gender
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    nextStep: actions.nextStep,
    prevStep: actions.prevStep,
    storeAge: actions.storeAge,
    storeGender: actions.storeGender
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
