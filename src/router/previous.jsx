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
