/* ------------------------------- useReducer ------------------------------- */
// useReducer 是 useState 的升级版，有类似于 redux 的写法

import React, { createContext, useContext, useReducer } from 'react'

const reducerContext = createContext()

function reducer (state, action) {
  switch (action.type) {
    case '+':
      return { count: state.count + 1 }
    case '-':
      return { count: state.count - 1 }
    default:
      // 注意这里不会触发 context 改变，因为是同一个对象引用
      state.count = Math.random()
      return state
  }
}

function ReducerChild () {
  const context = useContext(reducerContext)
  return <h2>{context.count}</h2>
}

export function Reducer () {
  const [state, dispatch] = useReducer(reducer, { count: 1 })

  return (
    <>
      <reducerContext.Provider value={state}>
        <ReducerChild></ReducerChild>
      </reducerContext.Provider>
      <button onClick={() => dispatch({ type: '+' })}>count + 1</button>
      <button onClick={() => dispatch({ type: '-' })}>count - 1</button>
      <button onClick={() => dispatch({ type: '*' })}>set math random</button>
    </>
  )
}
