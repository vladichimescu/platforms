import { EventEmitter } from "events"

import actionTypes from "../actions/action-types"
import Dispatcher from "../dispatcher"

const CHANGE_EVENT = "change"
let _data = []
let _loading = false

class AxiosStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  retrieveAxiosRequest() {
    return {
      data: _data,
      loading: _loading,
    }
  }
}

const store = new AxiosStore()

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.AXIOS_REQUEST:
      _loading = true

      store.emitChange()

      break
    case actionTypes.AXIOS_SUCCESS:
      _loading = false
      _data = action.payload

      store.emitChange()

      break
    case actionTypes.AXIOS_FAILURE:
      _loading = false

      store.emitChange()

      break
    default:
    // nothing to do here
  }
})

export default store
