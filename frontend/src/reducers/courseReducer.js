import {
    GET_COURSES
  } from "../actions/types";


  const initialState = {
    // fetch the token from local storage, get token
    // token: localStorage.getItem("token"),
    // isAuthenticated: null,
    // loading: true,
    // user: null,
    courses: []
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_COURSES:
        console.log("i'm in the reduceer");
        console.log(payload);
        return {
          ...state,
          courses: [payload]
        };
      default:
        return state;
    }
  }
  