import React from 'react';
import './App.css';
import { Login } from './component/Login';
import { SignUp } from './component/SignUp';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <p> Stream Dashboard by Muxable </p>
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
