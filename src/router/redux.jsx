import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementAsync, incrementByAmount, selectCount } from '../redux/reducer/counterSlice'
import { addPost, addPostAsync, getPostList } from '../redux/reducer/postSlice'
import store from '../redux/store'

/* ---------------------------------- 计数器示例 --------------------------------- */

export function Counter () {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Counter</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <p>{count}</p>
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

/* ---------------------------------- 帖子示例 ---------------------------------- */

const postItemStyle = {
  border: '1px solid gray',
  margin: '20px'
}

export function PostList () {
  const posts = useSelector((state) => state.post.items)
  const status = useSelector((state) => state.post.status)
  const error = useSelector((state) => state.post.error)

  const postList = posts.map((post) => (
    <div style={postItemStyle} key={post.id}>
      <p>{post.title}</p>
      <p>{post.content}</p>
    </div>
  ))

  let content = null

  if (status === 'loading') {
    content = <h2>Loading</h2>
  }
  if (status === 'pending' || status === 'success') {
    content = postList
  }
  if (status === 'fail') {
    content = <p>{error}</p>
  }

  return (
    <section>
      <h2>Post List</h2>
      {content}
    </section>
  )
}

export function PostForm () {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleAddPostAsync = async () => {
    try {
      const res = await dispatch(addPostAsync())
      unwrapResult(res) // try catch 无法捕获 dispatch 的错误，因为 dispatch 内部处理了错误，但是可以对 dispatch 的结果包一层，它会抛出错误
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div>
      <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="content" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={() => dispatch(addPost({ title, content }))}>add post</button>
      <button onClick={() => dispatch(getPostList())}>get post list</button>
      <button onClick={handleAddPostAsync}>add post async</button>
    </div>
  )
}

export function PostListWrap () {
  return (
    <Provider store={store}>
      <PostForm></PostForm>
      <PostList></PostList>
    </Provider>
  )
}
