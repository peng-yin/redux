import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from '@/common/redux'
import { counterCreator } from '../actions'

export default class Counter extends Component {
  constructor (props) {
    super(props)

    this.boundActionCreators = bindActionCreators(counterCreator, props.dispatch)
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  increment () {
    this.boundActionCreators.increment()
  }

  decrement () {
    this.boundActionCreators.decrement()
  }

  incrementAsync () {
    this.boundActionCreators.incrementAsync()
  }

  incrementBy () {
    this.boundActionCreators.incrementBy(10)
  }

  incrementIfOdd () {
    if (this.props.data.value1 % 2 !== 0) {
      this.boundActionCreators.increment()
    }
  }

  render () {
    const { data } = this.props

    return (
      <div>
        <p>
          Counter: {data.counter} times
          {' '}
          <button onClick={this.increment.bind(this)}>
            +
          </button>
          {' '}
          <button onClick={this.decrement.bind(this)}>
            -
          </button>
          {' '}
          <button onClick={this.incrementIfOdd.bind(this)}>
            Increment if odd
          </button>
          {' '}
          <button onClick={this.incrementAsync.bind(this)}>
            Increment async
          </button>
          {' '}
          <button onClick={this.incrementBy.bind(this)}>
            Increment by
          </button>
        </p>
      </div>
    )
  }
}