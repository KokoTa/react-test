import { Component, createContext, createRef, forwardRef, lazy, PureComponent, Suspense, useContext, useState } from "react";
import ReactDOM from 'react-dom'
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
// 为什么不能用 createContext 代替 redux，因为 createContext 改变会影响所有使用到的组件，造成多余渲染，而 redux 会进行比较渲染

const MyContext = createContext()

/**
 * Fn 模式
 */
export function ContextChild() {
  const context = useContext(MyContext)
  return (
    <h2>{context.count}</h2>
  )
}

/**
 * Class 模式
 */
export class ContextChild2 extends Component {
  static contextType = MyContext
  render() {
    const context = this.context
    return <h2>{context.count}</h2>
  }
}

export function Context() {
  const [count, setCount] = useState(100)
  return (
    <MyContext.Provider value={{ count }}>
      <ContextChild></ContextChild>
      <ContextChild2></ContextChild2>
      <button onClick={() => setCount(count + 1)}>count + 1</button>
    </MyContext.Provider>
  )
}

/* ----------------------------- React.createRef ---------------------------- */
// 只有父组件要传递 ref 这个属性名的时候会用到 forwardRef，比如下面的 <RefBtn ref={ref}...

export const RefBtn = forwardRef((props, ref) => (
  <button ref={ref} onClick={props.handleClick}>
    {props.children}
  </button>
));

export function Ref() {
  const ref = createRef()
  return <RefBtn ref={ref} handleClick={() => console.log(ref)}>Click me</RefBtn>
}

/* -------------------------- shouldComponentUpdate ------------------------- */
// 该钩子返回 true 会重新渲染，返回 false 不会渲染
// 一般来说会使用 PureComponent，而不会使用这个钩子

export class ShouldUpdateChild extends Component {
  shouldComponentUpdate(prevProps, nextState) {
    console.log(prevProps, nextState)
    if (prevProps.count > 105) return false
    else return true
  }

  render() {
    return <h2>{this.props.count}</h2>
  }
}

export function ShouldUpdate() {
  const [count, setCount] = useState(100)

  return (
    <>
      <ShouldUpdateChild count={count}></ShouldUpdateChild>
      <button onClick={() => setCount(count + 1)}>count + 1</button>
    </>
  )
}

/* ---------------------------- PureComponent ---------------------------- */
// PureComponent 是浅比较，不过要是数据都是 immutable 的话，用 PureComponent 没啥问题
// 该例子的数据不是 immutable 的，所以无法触发渲染

export class PureChild extends PureComponent {
  render() {
    return <h2>{this.props.obj.arr.map((item) => <span key={item}>{item}<br/></span>)}</h2>
  }
}

export class Pure extends Component {
  constructor(props) {
    super(props)
    this.state = {
      obj: { arr: [Math.random()] }
    }
  }

  render() {
    return (
      <>
        <PureChild obj={this.state.obj}></PureChild>
        <button onClick={() => {
          const state = this.state
          state.obj.arr.push(Math.random())
          this.setState(this.state)
        }}>push number</button>
      </>
    )
  }
}

/* --------------------------------- Portal -------------------------------- */

export function Portal() {
  return (
    <div onClick={(e) => console.log(e.target)}>
      <h2>Child1</h2>
      {ReactDOM.createPortal(<h2>Child2</h2>, document.querySelector('body'))}
    </div>
  )
}

