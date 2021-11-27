/* ------------------------------- React.memo ------------------------------- */
// 作用和 PureComponent 同理

import propTypes from 'prop-types'
import React, { Component, memo } from 'react'

export function MemoChild (props) {
  return <h2>{props.obj.arr.map((item) => <span key={item}>{item}<br /></span>)}</h2>
}

MemoChild.propTypes = {
  obj: propTypes.object
}

const MemoChildWrap = memo(MemoChild)

export class MemoFather extends Component {
  constructor (props) {
    super(props)
    this.state = {
      obj: { arr: [Math.random()] }
    }
  }

  render () {
    return (
      <div>
        <MemoChildWrap obj={this.state.obj}></MemoChildWrap>
        <button onClick={() => {
          const state = this.state
          state.obj.arr.push(Math.random())
          this.setState(this.state)
        }}>push number</button>
      </div>
    )
  }
}
