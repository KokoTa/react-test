import React from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementAsync, incrementByAmount, selectCount } from '../redux/reducer/counterReducer'
import store from '../redux/store'

export function Counter () {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <h2>{count}</h2>
      <button onClick={() => dispatch(incrementByAmount(100))}>add amount sync</button>
      <button onClick={() => dispatch(incrementAsync(100))}>add amount async</button>
    </div>
  )
}

export function CounterWrap () {
  return (
    <Provider store={store}>
      <Counter></Counter>
    </Provider>
  )
}
