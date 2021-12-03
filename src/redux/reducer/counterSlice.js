import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => { // createSlice 内置了 immutable 优化，不用再返回一个 immutable 对象了
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

// 使用 createSlice 后不用再手动写 reducerCreator 了，这里帮我们自动生成了
// 其中函数的返回值格式为 { type: 'counter/increment', payload: 'xxx' }
// 代替 mapActionsToProps 的写法
export const { increment, decrement, incrementByAmount } = slice.actions

export const incrementAsync = value => async (dispatch, getState) => {
  const stateBefore = getState()
  console.log(`Counter before: ${stateBefore.counter.value}`)
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  dispatch(incrementByAmount(value))
  const stateAfter = getState()
  console.log(`Counter after: ${stateAfter.counter.value}`)
}

// 代替 mapStatesToProps 的写法
export const selectCount = state => state.counter.value

export default slice.reducer
