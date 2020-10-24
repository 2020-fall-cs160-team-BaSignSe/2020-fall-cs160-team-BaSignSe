import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth'; 
import "./myStyles.css";

export const Login = ({login, isAuthenticated}) => {
  // useState always retruns an array w/ 2 values. first val is your state
  // the second value is a function that allows you to update your state.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  }); // hook

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); // [e.target.name] makes it so we can use this for every feild dynamically

  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log("SUCCESS");
    login(email, password);
  };

  // redir if logged in
  if(isAuthenticated) {
    return <Redirect to="/dashboard" />;
   }

  return (
    <Fragment>
       <div className="auth-sign-up-form">
        <h1>Sign In</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            type="email"
            className="auth-input-box"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type="password"
            className="auth-input-box"
            name="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <p> </p>
          <p>
            <Link to="/register-user" className="auth-primary">
              Don't have an account?
            </Link>
          </p>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
      </div>
    </Fragment>
  );
};


Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
