/* -------------------------------- useEffect ------------------------------- */

import React, { useEffect, useState } from 'react'

export function Effect () {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(Math.random())

  useEffect(() => {
    console.log('我每次渲染都触发')
  })

  useEffect(() => {
    console.log('我只有初次渲染的时候触发')
  }, [])

  useEffect(() => {
    console.log('我只有 count 发生改变的时候触发')
  }, [count])

  return (
    <>
      <h2>{count}</h2>
      <h2>{num}</h2>
      <button onClick={() => setCount(count + 1)}>count + 1</button>
      <button onClick={() => setNum(Math.random())}>change name</button>
    </>
  )
}
