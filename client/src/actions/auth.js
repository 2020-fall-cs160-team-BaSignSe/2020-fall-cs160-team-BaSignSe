import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// LOAD user for authenticaiton
// we run loadUser inside of src/App.js
export const loadUser = () => async (dispatch) => {
  // check to see if there is token
  // if there is, then put it in global header
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/authFindNStudy");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({
  firstName,
  lastName,
  username,
  email,
  password,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    firstName,
    lastName,
    username,
    email,
    password,
  });

  try {
    const res = await axios.post("/api/usersFindNStudy", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      // look thru the array of errors
      errors.forEach((error) => dispatch(setAlert(error.msg), "danger"));
    }

    // we do not need a payload. look in reducers/auth.js we don't take in a payload for case REGISTER_FAIL
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
