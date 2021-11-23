import { createContext, lazy, Suspense, useContext, useState } from "react";
import { BrowserRouter, Link, Redirect, Route, Switch, useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";
import App from "../App.jsx";
import { authContext, useAuth, useProvideAuth } from "../hooks/auth";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

/*
 * @Author: KokoTa
 * @Date: 2021-06-30 14:18:57
 * @LastEditTime: 2021-06-30 18:31:31
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /react-test/src/pages/index.jsx
 */

/* ---------------------------------- 路由测试 ---------------------------------- */

export function Home() {
  return <h2>Home</h2>;
}

export function About() {
  return <h2>About</h2>;
}

export function Users() {
  return <h2>Users</h2>;
}

export function Topics() {
  let match = useRouteMatch()

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

export function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

export function Params() {
  const params = useParams()
  return <h2>Params: {JSON.stringify(params)}</h2>;
}

export function Query() {
  const location = useLocation()
  console.log(location);
  return <h2>Query</h2>
}

// 提供用户信息和登入登出方法给整个 APP
export function ProvideAuth() {
  const auth = useProvideAuth()
  return (
    <authContext.Provider value={auth}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </authContext.Provider>
  )
}

export function PrivateRoute({ children, ...rest }) {
  const auth = useAuth()
  const location = useLocation()
  return (
    <Route {...rest}>
      {auth.user ? children : <Redirect to={{ pathname: '/login', state: { from: location } }}></Redirect>}
    </Route>
  )
}

export function Private() {
  return <h2>Private</h2>;
}

export function Login() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signIn(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

/* ---------------------------------- 父子组件测试 ---------------------------------- */

export function Father(props) {
  const [count, setCount] = useState(props.count)
  const countFn = (v) => {
    setCount(count + v)
  }
  return (
    <div className="father">
      Father: {count}
      <Child countFn={countFn}></Child>
    </div>
  )
}

export function Child(props) {
  return (
    <div className="child">
      Child: <button onClick={() => props.countFn(10)}>Click</button>
    </div>
  )
}

/* ------------------------------- React.lazy ------------------------------- */

export function Lazy() {
  const Lazy = lazy(() => import(/* webpackChunkName: "Lazy" */'./components/Lazy'))
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Lazy></Lazy>
      </Suspense>
    </ErrorBoundary>
  )
}

/* --------------------------- React.createContext -------------------------- */

const MyContext = createContext()

export function ContextChild() {
  const context = useContext(MyContext)
  return (
    <h2>{context.count}</h2>
  )
}

export function Context() {
  const [count, setCount] = useState(100)
  return (
    <MyContext.Provider value={{ count }}>
      <ContextChild></ContextChild>
      <button onClick={() => setCount(count + 1)}>count + 1</button>
    </MyContext.Provider>
  )
}