/* --------------------------------- 测量DOM节点 -------------------------------- */
// 触发流程：
// ref 更新 -> 触发 hook 的函数 -> 保存元素绑定信息 -> 执行赋值 -> 重新渲染 -> ref 更新
// -> 由于使用了 useCallback -> 不会重新生成 hook 函数 -> 发现存在元素绑定信息 -> 不会重复触发 hook 函数

import React from 'react'

import { useClientRect } from '../hooks/clientRect'

export function Rect () {
  const [rect, ref] = useClientRect()
  console.log(1)
  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null &&
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      }
    </>
  )
}
