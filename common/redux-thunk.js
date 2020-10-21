export default function thunk ({ getState }) {
  return next => action => {
    if (typeof action === 'function') {
      action(next, getState)
    } else {
      next(action)
    }
  }
}