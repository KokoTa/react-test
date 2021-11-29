/* --------------------------- React.createContext -------------------------- */
// 为什么不能用 createContext 代替 redux，因为 createContext 改变会影响所有使用到的组件，造成多余渲染，而 redux 会进行比较渲染
// 然而对于中小项目来说，redux 已经不是必须的了

import React, { Component, createContext, useContext, useState } from 'react'

const MyContext = createContext()

/**
 * Fn 模式
 */
export function ContextChild () {
  const context = useContext(MyContext)
  return (
    <h2>{context.count}</h2>
  )
}

/**
 * Class 模式
 */
export class ContextChild2 extends Component {
  render () {
    const context = this.context
    return <h2>{context.count}</h2>
  }
}

ContextChild2.contextType = MyContext

export function Context () {
  const [count, setCount] = useState(100)
  return (
    <MyContext.Provider value={{ count }}>
      <ContextChild></ContextChild>
      <ContextChild2></ContextChild2>
      <button onClick={() => setCount(count + 1)}>count + 1</button>
    </MyContext.Provider>
  )
}
