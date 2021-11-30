import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducer/counterReducer'

// configureStore 内置了 redux-thunk
export default configureStore({
  reducer: {
    counter: counterReducer
  }
})
