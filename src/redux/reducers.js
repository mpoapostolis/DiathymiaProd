import { combineReducers } from 'redux'
import R from 'ramda'
const userInit = {
  userName: '',
  age: '',
  doctor: '',
  hero: ''
}
const tas20 = require('../../public/tas20');

const initialStateView = {
  drawerOpen: false,
  dialogOpen: false,
  signUpStep: 0,
  loggedIn: false,
  whatDialog: ''
}

const initialStateAccount = {
  hero: 'mikasa',
  userName: '',
  password: '',
  gender: 'Male',
  age:8,
  results:[],
}

const initialStateChat = {
  chatArr: [tas20[0]],
  answers: [],
  alexIde: 0,
  alexCom: 0,
  alexExt: 0,
  num: 0,
}

const view = (state = initialStateView, action) => {
  switch (action.type) {
    case 'TOGGLE_DRAWER':
      return R.assoc('drawerOpen', R.not(state.drawerOpen), state)
    case 'TOGGLE_DIALOG':
      state = R.assoc('dialogOpen', R.not(state.dialogOpen), state)
      state = R.assoc('whatDialog', action.payload, state)
      return state
    case 'NEXTSTEP':
      if (state.signUpStep > 1) return R.assoc('signUpStep', 0, state)
      return R.assoc('signUpStep', R.inc(state.signUpStep), state)
    case 'PREVSTEP':
      return R.assoc('signUpStep', R.dec(state.signUpStep), state)
    case 'LOGIN':
      return R.assoc('loggedIn', true, state)
    case 'LOGOUT':
      return R.always(state)()
    default:
      return R.always(state)()
  }
}

const chat = (state = initialStateChat, action) => {
  switch (action.type) {
    case 'ANSWER':
      state = R.assoc('chatArr', [...state.chatArr, action.payload.text], state)
      state.answers= [...state.answers, action.payload.value]
      return state
      break;
    case 'NEXTQ':
      state = R.assoc('num', state.num + 1, state)
      const whatPush = state.num > 19 ? 'this is it' : tas20[state.num]
      state.chatArr = [...state.chatArr, whatPush]
      return state
      break;
    case 'INIT_CHAT':
      return R.always(initialStateChat)()
    case 'RESULTS':
      const alexIde = R.sum([state.answers[0], state.answers[2], state.answers[5], state.answers[6], state.answers[8], state.answers[12], state.answers[13]]) / 7
      const alexCom = R.sum([state.answers[1], state.answers[3], state.answers[10], state.answers[11], state.answers[16]]) / 5
      const alexExt = R.sum([state.answers[4], state.answers[7], state.answers[9], state.answers[14], state.answers[15], state.answers[17], state.answers[18], state.answers[19]]) / 8
      state.alexCom = alexCom
      state.alexExt = alexExt
      fetch('http://localhost:3001/addResult', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({data: {alexIde, alexCom, answers: state.answers, alexExt}, name: action.payload})
      })
      state = R.assoc('alexIde', alexIde, state)
      return state
    default:
      return R.always(state)()
  }
}


const account = (state = initialStateAccount, action) => {
  switch (action.type) {
    case 'SELECTHERO':
      return R.assoc('hero', action.payload, state)
    case 'STOREUSERNAME':
      return R.assoc('userName', action.payload, state)
    case 'STOREPASSWORD':
      return R.assoc('password', action.payload, state)
    case 'STOREAGE':
      return R.assoc('age', action.payload, state)
    case 'STOREGENDER':
      return R.assoc('gender', action.payload, state)
    default:
      return R.always(state)()
  }
}
const appReducer = combineReducers({
  view,
  account,
  chat
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') state = undefined
  // if (action.type === 'USER_LOGIN') {
    // state = action.payload
  // }
  return appReducer(state, action)
}

export default rootReducer
