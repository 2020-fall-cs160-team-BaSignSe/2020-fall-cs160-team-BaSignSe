import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link , Redirect} from "react-router-dom";
import "./myStyles.css";

// connect this compnent to redux using connect
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

export const RegisterUser = ({ setAlert, register, isAuthenticated }) => {
  // useState always retruns an array w/ 2 values. first val is your state
  // the second value is a function that allows you to update your state.
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  }); // hook

  const { firstName, lastName, username, email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); // [e.target.name] makes it so we can use this for every feild dynamically

  const onSubmit = async (e) => {
    e.preventDefault();
    register({ firstName, lastName, username, email, password });
    // NO LONGER NEED THIS COODE, this is how request was made before redux :

    // console.log(formData);
    // //   // add code to send things to backend by calling post request
    // const newUser = {
    //   firstName,
    //   lastName,
    //   username,
    //   email,
    //   password,
    // };
    // try {
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   const body = JSON.stringify(newUser);
    //   const res = await axios.post("/api/usersFindNStudy", body, config);
    //   console.log(res.data); // token
    // } catch (err) {
    //   console.log(err.response.data);
    // }
  };

  if(isAuthenticated) {
    return <Redirect to ="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="sign-up-form">
        <h1>Sign Up</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            className="input-box-first-name"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => onChange(e)}
            required
          />

          <input
            type="text"
            className="input-box-last-name"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type="text"
            className="input-box"
            name="username"
            placeholder="Your Username"
            value={username}
            onChange={(e) => onChange(e)}
          />
          <input
            type="email"
            className="input-box"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type="password"
            className="input-box"
            name="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
          <p> </p>
          <p>
            <Link to="/login" className="primary">
              Already have an account?
            </Link>
          </p>

          {/* <button type="submit" className="signup-btn" value="RegisterUser">
            Sign up
          </button> */}
          <input type="submit" className="btn btn-primary" value="Sign Up" />
        </form>
      </div>
    </Fragment>
  );
};

RegisterUser.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(RegisterUser);
