import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as accountsReducer, moduleName as accountsModule } from '../containers/balance'
import { reducer as costsReducer, moduleName as costsModule } from '../containers/costs'
import { reducer as incomesReducer, moduleName as incomesModule } from '../containers/incomes'
import { reducer as directoriesReducer, moduleName as directoriesModule } from '../containers/directores'
import { reducer as parametersReducer, moduleName as  parametersModule } from '../containers/parameters'
import { reducer as actionsReducer, moduleName as  actionsModule } from '../containers/actions'

const  createRootReducer = history => combineReducers({
  router: connectRouter(history),
  [accountsModule]: accountsReducer,
  [costsModule]: costsReducer,
  [incomesModule]: incomesReducer,
  [directoriesModule]: directoriesReducer,
  [parametersModule]: parametersReducer,
  [actionsModule]: actionsReducer,
})

export default createRootReducer
