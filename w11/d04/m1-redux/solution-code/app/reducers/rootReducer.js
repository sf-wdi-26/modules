import { createStore, combineReducers } from 'redux'
import foods from './foods'
import likes from './likes'

const app = combineReducers({foods,likes})
const store = createStore(app)

export default store
