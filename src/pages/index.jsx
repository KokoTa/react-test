import { BrowserRouter, Link, Redirect, Route, Switch, useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";
import App from "../App.jsx";
import { authContext, useAuth, useProvideAuth } from "./auth";

/*
 * @Author: KokoTa
 * @Date: 2021-06-30 14:18:57
 * @LastEditTime: 2021-06-30 18:31:31
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /react-test/src/pages/index.jsx
 */
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
  // const params = useParams()
  // console.log(params);
  return <h2>Params</h2>;
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
      {auth.user ? children : <Redirect to={{ pathname: '/login', state: { from: location }}}></Redirect>}
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