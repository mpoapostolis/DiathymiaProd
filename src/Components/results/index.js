import  React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import * as actions from '../../redux/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
var Chart = require('react-d3-core').Chart;
import { LineChart, Line, CartesianGrid, YAxis, XAxis } from 'recharts';
import './style.css'
import { browserHistory } from 'react-router'

class Results extends React.Component {
  state={
    users:[],
    current: [],
    user: '',
  }
  componentDidMount(){
    const { name } = this.props
    fetch('http://104.41.41.47:3001/getResults').then(data => data.json()).then(info => this.setState({users: info.result}))
  }

  getMean(arr, key){
    let sum = 0
    arr.map((obj)=> sum += obj[key])
    return isNaN((sum/arr.length).toFixed(2)) ? 0 : (sum/arr.length).toFixed(2)
  }

  renTable(){
    const { users } = this.state
    return <Table>
      <TableHeader displaySelectAll={false} deselectOnClickaway={false}>
        <TableRow >
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Age</TableHeaderColumn>
          <TableHeaderColumn>alexIde</TableHeaderColumn>
          <TableHeaderColumn>alexCom</TableHeaderColumn>
          <TableHeaderColumn>alexExt</TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody >
        { users.map((user,i)=>
          <TableRow key ={i} >
            <TableRowColumn>{user.userName}</TableRowColumn>
            <TableRowColumn>{user.age}</TableRowColumn>
            <TableRowColumn>{this.getMean(user.results, 'alexIde')}</TableRowColumn>
            <TableRowColumn>{this.getMean(user.results, 'alexCom')}</TableRowColumn>
            <TableRowColumn>{this.getMean(user.results, 'alexExt')}</TableRowColumn>
            <TableRowColumn>    <RaisedButton label="show more" onClick = {() => this.setState({user: user.userName, current: user.results})} primary style={{margin:'12px'}} /> </TableRowColumn>
          </TableRow>)}
      </TableBody>
    </Table>
    }

  chart(){
    const { current, user } = this.state
    current.map((obj) => obj.date = new Date(obj.date).toLocaleDateString())
    let data = [{name:'alex identification', key:'alexIde'}, {name:'alex communication', key: 'alexCom'}, {name:'alexExt', key:'alexExt'}]
    return <div className = 'graphContainer'>
        <h1> user: {user}</h1>
        <div className = 'graph'>
          {data.map((obj, i)=> <div key = {i}>
            <h1>{obj.name}</h1>
            <LineChart key = {i} width={600} height={300} data={current}>
              <Line type="monotone" dataKey={obj.key} stroke="#2b00ff" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis dataKey={obj.key} />
            </LineChart>
          </div>)}
        </div>
    </div>
  }

  render (){
    const { current } = this.state
    const { isAdmin } = this.props
    !isAdmin ? browserHistory.push('/') : null
    return current.length ? this.chart() : this.renTable()
  }
}

const mapStateToProps = (state) => {
  return {
    hero: state.account.hero,
    num: state.chat.num,
    name: state.account.userName,
    isAdmin: state.account.isAdmin,
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

export default connect(mapStateToProps, mapDispatchToProps)(Results)
