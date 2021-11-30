/* --------------------------------- 存储上一轮的值 -------------------------------- */
// value 传进来的时候并不会马上赋值，而是在 mounted 或者 updated 之后进行赋值，即在渲染之后赋值
// 因此返回值是上一次的值，

import React, { useState } from 'react'

import { usePrevious } from '../hooks/previous'

export function Previous () {
  const [count, setCount] = useState(1)

  const previous = usePrevious(count)

  return (
    <>
      <h2>current: {count}, previous: {previous}</h2>
      <button onClick={() => setCount(count + 1)}>count + 1</button>
    </>
  )
}
