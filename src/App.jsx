/*
 * @Author: KokoTa
 * @Date: 2021-06-30 14:14:29
 * @LastEditTime: 2021-06-30 18:27:17
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /react-test/src/App.jsx
 */
import { Switch, Route, Link, useHistory } from 'react-router-dom'
import React from 'react'
import { useAuth } from './hooks/auth.js'
import { Father } from './router/father.jsx'
import { Lazy } from './router/lazy.jsx'
import {
  Home,
  About,
  Users,
  Topics,
  Params,
  Query,
  Private,
  Login,
  PrivateRoute
} from './router/router'
import { Context } from './router/context.jsx'
import { Ref } from './router/ref.jsx'
import { ShouldUpdate } from './router/update.jsx'
import { Pure } from './router/pure.jsx'
import { Portal } from './router/portal.jsx'
import { MemoFather } from './router/memo.jsx'
import { Effect } from './router/effect.jsx'
import { AsyncHook } from './router/async.jsx'
import { ContextPerf } from './router/context-perf.jsx'
import { Reducer } from './router/reducer.jsx'
import { Previous } from './router/previous.jsx'
import { Rect } from './router/rect.jsx'
import { Test } from './router/test.jsx'

function App () {
  const auth = useAuth()
  const history = useHistory()

  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
            <li>
              <Link to="/params/1">Params</Link>
            </li>
            <li>
              <Link to="/query?id=1">Query</Link>
            </li>
            <li>
              {auth.user
                ? (
                <div>
                  <span>You are logged.</span>
                  <button
                    onClick={() => {
                      auth.signOut(() => history.push('/'))
                    }}
                  >
                    Sign Out
                  </button>
                </div>
                  )
                : (
                <span>You are not logged.</span>
                  )}
              <Link to="/private">Private</Link>
            </li>
            <li>
              <Link to="/father">Father</Link>
            </li>
            <li>
              <Link to="/lazy">Lazy</Link>
            </li>
            <li>
              <Link to="/context">Context</Link>
            </li>
            <li>
              <Link to="/contextPerf">ContextPerf</Link>
            </li>
            <li>
              <Link to="/ref">Ref</Link>
            </li>
            <li>
              <Link to="/shouldUpdate">ShouldUpdate</Link>
            </li>
            <li>
              <Link to="/pure">Pure</Link>
            </li>
            <li>
              <Link to="/memo">Memo</Link>
            </li>
            <li>
              <Link to="/portal">Portal</Link>
            </li>
            <li>
              <Link to="/effect">Effect</Link>
            </li>
            <li>
              <Link to="/asyncHook">AsyncHook</Link>
            </li>
            <li>
              <Link to="/useReducer">useReducer</Link>
            </li>
            <li>
              <Link to="/previous">Previous</Link>
            </li>
            <li>
              <Link to="/rect">Rect</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/params/:id">
            <Params />
          </Route>
          <Route path="/query">
            <Query />
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/private">
            <Private></Private>
          </PrivateRoute>
          <Route path="/father">
            <Father count={100}></Father>
          </Route>
          <Route path="/lazy">
            <Lazy></Lazy>
          </Route>
          <Route path="/context">
            <Context></Context>
          </Route>
          <Route path="/contextPerf">
            <ContextPerf></ContextPerf>
          </Route>
          <Route path="/ref">
            <Ref></Ref>
          </Route>
          <Route path="/shouldUpdate">
            <ShouldUpdate></ShouldUpdate>
          </Route>
          <Route path="/pure">
            <Pure></Pure>
          </Route>
          <Route path="/memo">
            <MemoFather></MemoFather>
          </Route>
          <Route path="/portal">
            <Portal></Portal>
          </Route>
          <Route path="/effect">
            <Effect></Effect>
          </Route>
          <Route path="/asyncHook">
            <AsyncHook></AsyncHook>
          </Route>
          <Route path="/useReducer">
            <Reducer></Reducer>
          </Route>
          <Route path="/previous">
            <Previous></Previous>
          </Route>
          <Route path="/rect">
            <Rect></Rect>
          </Route>
          <Route path="/test">
            <Test></Test>
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default App
