/* -------------------------- shouldComponentUpdate ------------------------- */
// 该钩子返回 true 会重新渲染，返回 false 不会渲染
// 一般来说会使用 PureComponent，而不会使用这个钩子

import propTypes from 'prop-types'
import React, { Component, useState } from 'react'

export class ShouldUpdateChild extends Component {
  shouldComponentUpdate (prevProps, nextState) {
    console.log(prevProps, nextState)
    if (prevProps.count > 105) return false
    else return true
  }

  render () {
    return <h2>{this.props.count}</h2>
  }
}

ShouldUpdateChild.propTypes = {
  count: propTypes.number
}

export function ShouldUpdate () {
  const [count, setCount] = useState(100)

  return (
    <>
      <ShouldUpdateChild count={count}></ShouldUpdateChild>
      <button onClick={() => setCount(count + 1)}>count + 1</button>
    </>
  )
}
