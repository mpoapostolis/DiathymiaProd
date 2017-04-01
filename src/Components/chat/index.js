import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import FontIcon from 'material-ui/FontIcon'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import './style.css'
const style = {
  chat: {
    borderRadius: '20px',
  },
}

class Chat extends React.Component {

  render () {
    const { hero } = this.props
    return (
      <div className='chatContainer'>
        <div className={`mainHero`}>
          <img  className={`hero`} src={`/images/${hero}.png`} />
        </div>
        <Card
          className="chatBox"
          style={style.chat}>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>
              <h1>test</h1>

          <CardMedia
            overlayContainerStyle	={{color:'white'}}
            overlayContentStyle	={{background:'rgba(195, 209, 29, 0.54)'}}
            overlay={<h1>test</h1>}/>
          </Card>
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
