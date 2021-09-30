import React from 'react';
import './App.css';
import { Login } from './component/Login';
import { SignUp } from './component/SignUp';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import DataGridDemo from './component/TableView';
import { Analytics } from './screens/Analytics';

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
            <Route path="/analytic">
              <Analytics />
            </Route>
            <Route path="/">
              <p> Stream Dashboard by Muxable </p>
              <DataGridDemo />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
