import { applyMiddleware, compose, createStore } from "redux"
import createSagaMiddleware from "redux-saga"

import reducers from "./reducers"
import sagas from "./sagas"

const sagaMiddleware = createSagaMiddleware()

let middleware = applyMiddleware(sagaMiddleware)
if (process.env.NODE_ENV !== "production") {
  const composeEnhancers =
    window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  middleware = composeEnhancers(middleware)
}

const store = createStore(reducers, middleware)

sagaMiddleware.run(sagas)

export default store
