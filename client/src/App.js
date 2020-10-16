import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import RegisterUser from "./components/auth/RegisterUser";
import "./App.css";

// redux stuff
import { Provider } from "react-redux";
import store from "./store";

// more components
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); // second parm is [], b/c we only want this to run once
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register-user" component={RegisterUser} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
