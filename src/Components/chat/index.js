import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import FontIcon from 'material-ui/FontIcon'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import './style.css'
const style = {
  chat: {
    borderRadius: '20px',
  },
  heroAvatar:{
    background: 'rgba(38, 121, 208, 0.23)',
  },
  chip:{
    borderRadius: '10px',
    maxWidth: '300px',
    margin: '0 15px 0 15px',
    background: 'rgba(38, 121, 208, 0.12)',
  }
}

class Chat extends React.Component {
  state ={
    arr: []
  }
  renHero(hero){
    const { arr } = this.state
    const tmpArr = arr
    const answers = ['ποτε', 'συχνα', 'συνέχεια']
    return <div className='mainHero'>
      <div className='answers'>
        {answers.map( (answ, key) => <div onClick = {()=> {tmpArr.push(answ); this.setState({arr: tmpArr})}} key = {key} className ='answer'>{answ}</div> )}
      </div>
      <div className = 'hero'>
        <img  className={`hero`} src={`/images/${hero}.png`} />
      </div>
    </div>
  }

  renChat(answ, hero, key){
    return <div className='message hero'>
      <Avatar style ={style.heroAvatar} src={`/images/${hero}.png`} />
      <Chip style ={style.chip}>
        <div style={{whiteSpace:'normal', padding:'10px'}}>
          {answ}
        </div>
      </Chip>
    </div>
  }

  render () {
    console.log(this.state.arr);
    const { hero } = this.props
    return (
      <div className='chatContainer'>
        {this.renHero(hero)}
        <div className='chatBox'>
          {
            this.state.arr.reverse().map((answ, key) => this.renChat(answ, hero, key)
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hero: state.account.hero,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
