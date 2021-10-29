import React from "react";
import "./App.css";
import { Login } from "./component/Login";
import { SignUp } from "./component/SignUp";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StreamsTableView } from "./component/TableView";
import { Analytics } from "./screens/Analytics";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthProvider>
          <Router>
            <Switch>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/analytic/:streamId">
                <Analytics />
              </Route>
              <Route path="/">
                {/* "Your past streams" could be replaced with {regular or twitch username}'s past streams */}
                <p>Your past streams</p>
                <StreamsTableView userId="rippyae" />
              </Route>
            </Switch>
          </Router>
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;
