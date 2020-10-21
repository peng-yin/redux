import { compose } from './utils'

export default function applyMiddleware (...middlewares) {
  return store => {
    const chains = middlewares.map(middleware => middleware(store))
    store.dispatch = compose(...chains)(store.dispatch)

    return store
  }
}


/*
  chains是函数f1的数组，通过compose将所欲f1合并成一个函数，暂且称之为F1，
  然后将原始dispatch传入F1，经过f2函数一层一层地改造后，
  得到了一个新的dispatch方法，这个过程和Koa的中间件模型（洋葱模型）原理是一样的。
*/

function middleware (store) {
  return function f1 (dispatch) {
    return function f2 (action) {
      // do something
      dispatch(action)
      // do something
    }
  }
}

function middleware1 (store) {
  return function f1 (dispatch) {
    return function f2 (action) {
      console.log(1)
      dispatch(action)
      console.log(1)
    }
  }
}

function middleware2 (store) {
  return function f1 (dispatch) {
    return function f2 (action) {
      console.log(2)
      dispatch(action)
      console.log(2)
    }
  }
}

// applyMiddleware(middleware1, middleware2)
