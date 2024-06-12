import React, {
  createContext,
  useContext as useReactContext,
  useReducer,
} from "react"

import reducers from "./reducers"

const Context = createContext()

function StateProvider(props) {
  const [state, dispatch] = useReducer(...reducers)

  return <Context.Provider value={{ state, dispatch }} {...props} />
}

export const ContextProvider = StateProvider
export const useContext = () => useReactContext(Context)
