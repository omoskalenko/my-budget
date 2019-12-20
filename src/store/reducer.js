import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as mainReducer, moduleName as mainModule } from '../containers/main/main'

const  createRootReducer = history => combineReducers({
  router: connectRouter(history),
  [mainModule]: mainReducer
})
export default createRootReducer
