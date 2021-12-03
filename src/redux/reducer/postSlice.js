import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  items: [],
  status: 'pending',
  error: ''
}

export const getPostList = createAsyncThunk('post/setPost', async () => {
  const res = await axios.get('http://localhost:9999/api/postList')
  return res.data.data
})

export const addPostAsync = createAsyncThunk('post/addPostAsync', async () => {
  const res = await axios.get('http://localhost:9999/api/addPost')
  return res.data.data
})

const slice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: {
      reducer (state, action) {
        state.items.push(action.payload)
      },
      prepare ({ title, content }) {
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        }
      }
    }
  },
  extraReducers: {
    [getPostList.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getPostList.fulfilled]: (state, action) => {
      state.status = 'success'
      state.items = action.payload
    },
    [getPostList.rejected]: (state, action) => {
      state.status = 'fail'
      state.error = action.error.message
    },
    [addPostAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload)
    }
  }
})

export const { addPost } = slice.actions

export default slice.reducer
