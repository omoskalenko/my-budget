import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as accountsReducer, moduleName as accountsModule } from '../containers/accounts'
import { reducer as costsReducer, moduleName as costsModule } from '../containers/costs'
import { reducer as directoriesReducer, moduleName as directoriesModule } from '../containers/directores'

const  createRootReducer = history => combineReducers({
  router: connectRouter(history),
  [accountsModule]: accountsReducer,
  [costsModule]: costsReducer,
  [directoriesModule]: directoriesReducer
})

export default createRootReducer
