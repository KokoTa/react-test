/* ---------------------------- PureComponent ---------------------------- */
// PureComponent 是浅比较，不过要是数据都是 immutable 的话，用 PureComponent 没啥问题
// 该例子的数据不是 immutable 的，所以无法触发渲染

import propTypes from 'prop-types'
import React, { Component, PureComponent } from 'react'

export class PureChild extends PureComponent {
  render () {
    return <h2>{this.props.obj.arr.map((item) => <span key={item}>{item}<br /></span>)}</h2>
  }
}

PureChild.propTypes = {
  obj: propTypes.object
}

export class Pure extends Component {
  constructor (props) {
    super(props)
    this.state = {
      obj: { arr: [Math.random()] }
    }
  }

  render () {
    return (
      <>
        <PureChild obj={this.state.obj}></PureChild>
        <button onClick={() => {
          const state = this.state
          state.obj.arr.push(Math.random())
          this.setState(this.state)
        }}>push number</button>
      </>
    )
  }
}
