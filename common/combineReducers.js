export default function combineReducers (reducers) {
  const availableKeys = []
  const availableReducers = {}

  Object.keys(reducers).forEach(key => {
    if (typeof reducers[key] === 'function') {
      availableKeys.push(key)
      availableReducers[key] = reducers[key]
    }
  })

  return (state = {}, action) => {
    const nextState = {}
    let hasChanged = false

    availableKeys.forEach(key => {
      nextState[key] = availableReducers[key](state[key], action)

      if (!hasChanged) {
        hasChanged = state[key] !== nextState[key]
      }
    })

    return hasChanged ? nextState : state
  }
}
