import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import FontIcon from 'material-ui/FontIcon'
import Avatar from 'material-ui/Avatar';
import { browserHistory } from 'react-router'
import Chip from 'material-ui/Chip';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import './style.css'
const style = {
  chat: {
    borderRadius: '20px',
  },
  heroAvatar: {
    background: 'rgba(38, 121, 208, 0.23)',
  },
  userAvatar: {
    background: 'rgba(84, 134, 184, 0.35)',
  },
  chip: (isHero) => {
    return {
      borderRadius: '30px',
      width: '300px',
      paddingLeft: '5px',
      margin: '0 15px 0 15px',
      background: isHero ? 'rgba(38, 121, 208, 0.12)' : 'rgba(84, 134, 184, 0.35)',
    }
  }
}

class Chat extends React.Component {
  renHero(hero){
    const { chatArr, num, calcRes, name } = this.props
    const isEnd = num > 19
    const revArr = [3, 4, 9, 17, 18]
    const isReverse = (key) =>  revArr.indexOf(key) + 1
    const canAnswer = chatArr.length % 2 !== 0
    const answers = isEnd ? [{text: 'τελος'}] : [ {text: 'ποτε', value: isReverse(num) ? 2 : 0 }, { text: 'συχνα', value: 1 }, {text: 'συνέχεια', value: isReverse(num) ? 0 : 2 }]
    return <div className='mainHero'>
      <div className={`answers`}>
        {answers.map( (obj, key) => <div onClick = {()=> {
          if (isEnd) {
            calcRes(name)
            return browserHistory.push('/')
          }
          canAnswer &&  this.props.answer({ text: obj.text, value: obj.value });
          setTimeout(()=>{
            canAnswer && this.props.nextQ()
          }, 0)
        }}
        key = {key} className={`answer ${canAnswer ? '': 'locked'}`}> {obj.text} </div> )}
      </div>
      <div className = 'hero'>
        <img  className={`hero`} src={`/images/${hero}.png`} />
      </div>
    </div>
  }

  renChat(answ, hero, key){
    const isHero = key % 2 === 0
    return <div key={key} className={`message ${isHero ? 'hero' : 'user' }`}>
      {isHero ? <Avatar size={50} style ={style.heroAvatar} src={`/images/${hero}.png`} /> : null}
      <Chip style ={style.chip(isHero)}>
        <div style={{ fontWeight:'bold', color: isHero ? 'rgba(0, 0, 0, 0.68)' : 'white', whiteSpace:'normal', padding:'10px' }}>
          {answ}
        </div>
      </Chip>
      {!isHero ? <Avatar size={50} style ={style.userAvatar} icon={<FontIcon  style={{textAlign:'center', color:'rgba(84, 134, 184, 0.45)'}} className='fa fa-user' />} /> : null}
    </div>
  }
  componentDidMount(){
    this.props.initChat()
  }

  render () {
    const { hero, chatArr } = this.props
    return <div className='chatContainer'>
        {this.renHero(hero)}
        <div className='chatBox'>
          <div>{ chatArr.map((answ, key) => this.renChat(answ, hero, key)) }</div>
        </div>
      </div>
  }
}

const mapStateToProps = (state) => {
  return {
    hero: state.account.hero,
    num: state.chat.num,
    name: state.account.userName,
    chatArr: state.chat.chatArr,
    chat: state.chat
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    answer: actions.answer,
    nextQ: actions.nextQ,
    initChat: actions.initChat,
    calcRes: actions.calcRes
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
