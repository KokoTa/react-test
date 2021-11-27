/* ----------------------------- React.createRef ---------------------------- */
// 只有父组件要传递 ref 这个属性名的时候会用到 forwardRef，比如下面的 <RefBtn ref={ref}...

import propTypes from 'prop-types'
import React, { createRef, forwardRef } from 'react'

export const RefBtn = forwardRef((props, ref) => (
  <button ref={ref} onClick={props.handleClick}>
    {props.children}
  </button>
))

RefBtn.displayName = 'RefBtn'
RefBtn.propTypes = {
  handleClick: propTypes.func,
  children: propTypes.node
}

export function Ref () {
  const ref = createRef()
  return <RefBtn ref={ref} handleClick={() => console.log(ref)}>Click me</RefBtn>
}
