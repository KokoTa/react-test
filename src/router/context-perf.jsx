
/* ----------------------------- useContext 性能优化 ---------------------------- */
// context.jsx 中提到了只要更新 context 的值，所有用到 context 的组件都会更新
// 假如 Father 组件使用了 context，当 context 值改变，则 Father 和 Child 都会重新渲染
// 为了不让 Child 组件也渲染，可以使用 useMemo，React.memo 也可以实现同样的行为
// https://github.com/facebook/react/issues/15156#issuecomment-474590693

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

const contextCacheContent = createContext()

export function ContextCache () {
  const context = useContext(contextCacheContent)
  console.log('父组件渲染了')

  // useCallback 和 useMemo 本质上是一样的，只是写法上有区别
  const callback = useCallback(() => {
    console.log('子函数生成了')
  }, [context.count])

  return useMemo(() => {
    console.log('子组件渲染了')
    callback()
    return <h2>{context.count}</h2>
  }, [context.count, callback])
}

export function ContextPerf () {
  const [obj, setObj] = useState({ count: 1 })
  return (
    <contextCacheContent.Provider value={obj}>
      <ContextCache></ContextCache>
      <button onClick={() => {
        setObj({ count: 1 })
      }}>set 1</button>
    </contextCacheContent.Provider>
  )
}
