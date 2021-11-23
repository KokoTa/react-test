/*
 * @Author: KokoTa
 * @Date: 2021-06-30 14:14:29
 * @LastEditTime: 2021-06-30 18:27:17
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /react-test/src/App.jsx
 */
import {
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';
import { useAuth } from './hooks/auth.js';
import { About, Context, Father, Home, Lazy, Login, Params, Private, PrivateRoute, Query, Topics, Users } from './pages/index.jsx';

function App() {
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
              {auth.user ? (
                <div>
                  <span>You are logged.</span>
                  <button onClick={() => {
                    auth.signOut(() => history.push('/'))
                  }}>Sign Out</button>
                </div>
              ) : (
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
        </Switch>
      </div>
    </>
  );
}

export default App;
