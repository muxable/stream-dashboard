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
              {/* "Streamer's" could either be replaced with regular or twitch username*/}
              <p>Streamer's past streams</p>
              <DataGridDemo />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
