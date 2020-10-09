import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import RegisterUser from "./components/auth/RegisterUser";
import "./App.css";
const App = () => (
  <Router>
    <Fragment>
      {/* <Navbar /> */}
      <Route exact path="/" />
      <section className="container">
        <Switch>
          <Route exact path="/register-user" component={RegisterUser} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
