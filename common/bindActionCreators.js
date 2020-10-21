function bindActionCreator (actionCreator, dispatch) {
  return function () {
    dispatch(actionCreator.apply(this, arguments))
  }
}

export default function bindActionCreators (actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  const boundActionCreators = {}

  Object.keys(actionCreators).forEach(key => {
    let actionCreator = actionCreators[key]

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  })

  return boundActionCreators
}