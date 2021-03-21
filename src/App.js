import './App.css';
import Home from './Components/Home/Home';
import Blog from './Components/Blog/Blog';
import NotFound from './Components/NotFound/NotFond';
import Destination from './Components/Destination/Destination';
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createContext, useState } from 'react';
import PrivateRoute from './PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  console.log(loggedInUser)
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <NavBar></NavBar>
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <PrivateRoute path="/destination/:type">
          <Destination />
        </PrivateRoute>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
