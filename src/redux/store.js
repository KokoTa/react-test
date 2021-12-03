import { configureStore } from '@reduxjs/toolkit'
import loggerMiddleware from './middleware/logger'
import thunkMiddleware from 'redux-thunk'
import counterReducer from './reducer/counterSlice'
import postReducer from './reducer/postSlice'

// configureStore 内置了 redux-thunk
export default configureStore({
  reducer: {
    counter: counterReducer,
    post: postReducer
  },
  middleware: [loggerMiddleware, thunkMiddleware]
})
