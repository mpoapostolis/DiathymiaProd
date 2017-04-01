import { createStore } from 'redux'
import rootReducer from './reducers'
import { loadState, saveState } from './localStorage'

const persistedData = loadState()
const store = createStore(
  rootReducer,
  persistedData
)

store.subscribe(() => {
  saveState(store.getState())
})

export default store
