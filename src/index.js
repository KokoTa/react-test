/*
 * @Author: KokoTa
 * @Date: 2021-06-30 14:14:29
 * @LastEditTime: 2021-06-30 18:00:43
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /react-test/src/index.js
 */
import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { ProvideAuth } from './router/router'

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth></ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
