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
