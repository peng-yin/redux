const INIT = '@@redux/INIT_' + Math.random().toString(36).substring(7)

export default function createStore (reducer, initialState, enhancer) {
  if (typeof initialState === 'function') {
    enhancer = initialState
    initialState = undefined
  }

  let state = initialState
  const listeners = []
  const store = {
    getState () {
      return state
    },
    dispatch (action) {
      if (action && action.type) {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
      }
    },
    subscribe (listener) {
      if (typeof listener === 'function') {
        listeners.push(listener)
      }
    }
  }

  if (typeof initialState === 'undefined') {
    store.dispatch({ type: INIT })
  }

  if (typeof enhancer === 'function') {
    return enhancer(store)
  }

  return store
}