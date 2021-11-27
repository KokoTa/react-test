/* ------------------------------- Custom Hook ------------------------------ */
// 异步请求的示例

import React, { useState } from 'react'
import { useAsyncData } from '../hooks/async'

export function AsyncHook () {
  const [id, setId] = useState(1)
  const res = useAsyncData(id)

  return (
    <>
      <h2>{id}</h2>
      <h2>{res && res.msg}</h2>
      <button onClick={() => setId((prevId) => prevId + 1)}>add id</button>
    </>
  )
}
