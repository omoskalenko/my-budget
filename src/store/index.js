import { createStore, applyMiddleware, compose } from 'redux'
import createRootReducer from './reducer'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose

const store = createStore(
  createRootReducer(history),
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history),
    )
  ),
)

window.store = store

sagaMiddleware.run(rootSaga)

export default store
