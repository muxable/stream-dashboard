import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { AuthenticatedRoute } from "./component/AuthenticatedRoute";
import { ForgotPassword } from "./component/ForgotPassword";
import { GlobalHeatMap } from "./component/GlobalHeatMap";
import { Login } from "./component/Login";
import { SignUp } from "./component/SignUp";
import { StreamsTableView } from "./component/TableView";
import { UnauthenticatedRoute } from "./component/UnauthenticatedRoute";
import { useAuthState } from "./context/AuthContext";
import { Analytics } from "./screens/Analytics";
import { Setting } from "./component/setting/Setting";


function App() {
  const { email } = useAuthState();

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <UnauthenticatedRoute
              exact
              path="/global"
              component={GlobalHeatMap}
            />
            <UnauthenticatedRoute exact path="/signup" component={SignUp} />
            <UnauthenticatedRoute exact path="/login" component={Login} />
            <UnauthenticatedRoute
              exact
              path="/forgotpassword"
              component={ForgotPassword}
            />
            <AuthenticatedRoute exact path="/">
              <StreamsTableView userId={email ?? ""} />
            </AuthenticatedRoute>
            <AuthenticatedRoute
              exact
              path="/analytic/:streamId"
              component={Analytics}
            />
            <AuthenticatedRoute exact path="/settings" component={Setting} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
