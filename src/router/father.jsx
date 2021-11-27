/* ---------------------------------- 父子组件测试 ---------------------------------- */

import React, { useState } from 'react'
import propTypes from 'prop-types'

export function Father (props) {
  const [count, setCount] = useState(props.count)
  const countFn = (v) => {
    setCount(count + v)
  }
  return (
    <div className="father">
      Father: {count}
      <Child countFn={countFn}></Child>
    </div>
  )
}

Father.propTypes = {
  count: propTypes.number
}

export function Child (props) {
  return (
    <div className="child">
      Child: <button onClick={() => props.countFn(10)}>Click</button>
    </div>
  )
}

Child.propTypes = {
  countFn: propTypes.func
}
