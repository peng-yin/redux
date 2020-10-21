import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from './common/redux'
import logger from './common/redux-logger'
import thunk from './common/redux-thunk'

import reducers from './reducers'
import Counter from './components/Counter'

const store = createStore(reducers, { counter: 0 }, applyMiddleware(thunk, logger))


const renderWithStore = () => render(
  <Counter
    data={store.getState()}
    dispatch={store.dispatch}
  />,
  document.getElementById('root')
)

renderWithStore()
store.subscribe(renderWithStore)


store.subscribe(() => {
  console.info('test') // dispatch触发时，除了视图重新渲染，还会再控制台打印出test。
})