import  React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import * as actions from '../../redux/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Results extends React.Component {
  state={
    users:[]
  }
  componentDidMount(){
    const { name } = this.props
    fetch('http://localhost:3001/getResults').then(data => data.json()).then(info => this.setState({users: info.result}))
  }

  getMean(arr, key){
    let sum = 0
    arr.map((obj)=> sum += obj[key])
    return (sum/arr.length).toFixed(2)
  }

  renBody(){
    const { users } = this.state
    return users.map((user,i)=> <TableRow key ={i}>
        <TableRowColumn>{user.userName}</TableRowColumn>
        <TableRowColumn>{user.age}</TableRowColumn>
        <TableRowColumn>{this.getMean(user.results, 'alexIde')}</TableRowColumn>
        <TableRowColumn>{this.getMean(user.results, 'alexCom')}</TableRowColumn>
        <TableRowColumn>{this.getMean(user.results, 'alexExt')}</TableRowColumn>
      </TableRow>)
    }

  render () {
    const { users } = this.state
    console.log(users);
    return <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Age</TableHeaderColumn>
          <TableHeaderColumn>alexIde</TableHeaderColumn>
          <TableHeaderColumn>alexCom</TableHeaderColumn>
          <TableHeaderColumn>alexExt</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {this.renBody()}
      </TableBody>
    </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Results)
