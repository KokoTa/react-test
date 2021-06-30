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
  useHistory} from 'react-router-dom';
import { useAuth } from './pages/auth.js';
import { About, Home, Login, Params, Private, PrivateRoute, Topics, Users } from './pages/index.jsx';

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
              {auth.user ? (
                <div>
                  <span>You are logged.</span>
                  <button onClick={() => {
                    auth.signOut(() => history.push('/'))
                  }}>Sign Out</button>
                </div>
              ): (
                <span>You are not logged.</span>
              )}
              <Link to="/private">Private</Link>
            </li>
          </ul>
        </nav>
        <Switch>
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
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/private">
            <Private></Private>
          </PrivateRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
