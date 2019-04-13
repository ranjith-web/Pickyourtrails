import { combineReducers } from 'redux'
import travels from './reducer'

const rootReducers = combineReducers({
    "travels":travels
});
export default rootReducers;