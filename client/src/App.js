import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import RegisterUser from "./components/auth/RegisterUser";

import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      {/* <Navbar /> */}
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/register-user" component={RegisterUser} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
      {/* <Landing /> */}
    </Fragment>
  </Router>
);

export default App;
