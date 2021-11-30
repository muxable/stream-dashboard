import React from "react";
import "./App.css";
import { Login } from "./component/Login";
import { SignUp } from "./component/SignUp";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { StreamsTableView } from "./component/TableView";
import { Analytics } from "./screens/Analytics";
import { AuthProvider, useAuthState } from "./context/AuthContext";

const AuthenticatedRoute: React.FC<any> = ({ component: C, ...props }) => {
  const { isAuthenticated, email} = useAuthState();
  // console.log('props', {...props})
  console.log("authstate", email, useAuthState());
  console.log(`AuthenticatedRoute: ${isAuthenticated}`);
  return (
    <Route
      {...props}
      render={(routeProps) =>
        isAuthenticated ? <C {...routeProps} /> : <Redirect to="/login" />
      }
    />
  );
};

const UnauthenticatedRoute: React.FC<any> = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState();
  console.log(`UnauthenticatedRoute: ${isAuthenticated}`);
  return (
    <Route
      {...props}
      render={(routeProps) =>
        !isAuthenticated ? <C {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};
async function App() {
  const { email } = useAuthState();
  return (
    <div className="App">
      <header className="App-header">
        <AuthProvider>
          <Router>
            <Switch>
              {/* <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/analytic/:streamId">
                <Analytics />
              </Route>
              <Route path="/">
                <p>Your past streams</p>
                <StreamsTableView userId="rippyae" />
              </Route> */}
              <UnauthenticatedRoute exact path="/signup" component={SignUp} />
              <UnauthenticatedRoute exact path="/login" component={Login} />
              <AuthenticatedRoute
                exact
                path="/"
                component={<StreamsTableView userId={email} />}
                // userId="rippyae"
              />
              <AuthenticatedRoute
                exact
                path="/analytic/:streamId"
                component={Analytics}
              />
            </Switch>
          </Router>
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;
