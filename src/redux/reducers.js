import { combineReducers } from 'redux'
import R from 'ramda'
const userInit = {
  userName: '',
  age: '',
  doctor: '',
  hero: ''
}

const initialStateView = {
  drawerOpen: false,
  dialogOpen: false,
  signUpStep: 0,
  whatDialog: ''
}

const initialStateAccount = {
  hero: 'mikasa',
  loggedIn: false,
  userName: '',
  password: '',
  gender: 'Male',
  age:8
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
    case 'LOGIN':
      return R.assoc('loggedIn', true, state)
    case 'LOGOUT':
      return R.always(state)()
    default:
      return R.always(state)()
  }
}
const appReducer = combineReducers({
  view,
  account
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') state = undefined
  // if (action.type === 'USER_LOGIN') {
    // state = action.payload
  // }
  return appReducer(state, action)
}

export default rootReducer
