/* --------------------------------- Portal -------------------------------- */

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

export function Portal () {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div onClick={(e) => console.log(e.target)}>
      <h2>Child1</h2>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Child2</button>
      {isOpen ? ReactDOM.createPortal(<h2>Child2</h2>, document.querySelector('body')) : null}
    </div>
  )
}
