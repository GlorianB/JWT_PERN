import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

//components
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';

toast.configure();

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:8000/is_verify", {
        method : 'GET',
        mode : 'cors',
        headers: {
          jwt : localStorage.jwt
        }
      });

      const auth = await response.json();

      auth === true ? setAuthenticated(true) : setAuthenticated(false);

    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    isAuth();
  })

  return (
    <Fragment>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path='/login'
              render={(props) => !isAuthenticated ? <Login { ...props } setAuth={setAuth} /> : <Redirect to='/dashboard' />} />
            <Route exact path='/register'
              render={(props) => !isAuthenticated ? <Register { ...props } setAuth={setAuth} /> : <Redirect to='/dashboard' />} />
            <Route exact path='/dashboard'
              render={(props) => isAuthenticated ? <Dashboard { ...props } setAuth={setAuth} /> : <Redirect to='/login' />} />
          </Switch>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;
