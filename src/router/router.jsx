/* ---------------------------------- 路由测试 ---------------------------------- */

import propTypes from 'prop-types'
import React, { useMemo } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Redirect, Route, Switch, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import App from '../App'
import { authContext, useAuth, useProvideAuth } from '../hooks/auth'

export function Home () {
  return <h2>Home</h2>
}

export function About () {
  return <h2>About</h2>
}

export function Users () {
  return <h2>Users</h2>
}

export function Topics () {
  const match = useRouteMatch()

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  )
}

export function Topic () {
  const { topicId } = useParams()
  return <h3>Requested topic ID: {topicId}</h3>
}

export function Params () {
  const params = useParams()
  return <h2>Params: {JSON.stringify(params)}</h2>
}

export function Query () {
  const location = useLocation()
  console.log(location)
  const query = useMemo(() => new URLSearchParams(location.search), [location.search])
  return <h2>Query: {query.get('id')}</h2>
}

// 提供用户信息和登入登出方法给整个 APP
export function ProvideAuth () {
  const auth = useProvideAuth()
  return (
    <authContext.Provider value={auth}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </authContext.Provider>
  )
}

export function PrivateRoute ({ children, ...rest }) {
  const auth = useAuth()
  const location = useLocation()
  return (
    <Route {...rest}>
      {auth.user ? children : <Redirect to={{ pathname: '/login', state: { from: location } }}></Redirect>}
    </Route>
  )
}

PrivateRoute.propTypes = {
  children: propTypes.node
}

export function Private () {
  return <h2>Private</h2>
}

export function Login () {
  const history = useHistory()
  const location = useLocation()
  const auth = useAuth()

  const { from } = location.state || { from: { pathname: '/' } }
  const login = () => {
    auth.signIn(() => {
      history.replace(from)
    })
  }

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  )
}
