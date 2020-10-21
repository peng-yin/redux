export function increment () {
  return {
    type: 'INCREMENT'
  }
}

export function decrement () {
  return {
    type: 'DECREMENT'
  }
}

export function incrementAsync () {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment())
    }, 1000)
  }
}

export function incrementBy (count = 0) {
  return {
    type: 'INCREMENT_BY',
    count
  }
}