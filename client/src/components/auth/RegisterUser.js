import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./myStyles.css";

export const RegisterUser = () => {
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

    console.log(formData);
    //   // add code to send things to backend by calling post request
    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(newUser);
      const res = await axios.post("/api/usersFindNStudy", body, config);
      console.log(res.data); // token
    } catch (err) {
      console.log(err.response.data);
    }
  };

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
            <Link to="#!" className="primary">
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

export default RegisterUser;
