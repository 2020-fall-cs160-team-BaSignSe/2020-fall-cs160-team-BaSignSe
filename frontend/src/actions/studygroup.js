import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import { GET_STUDYGROUP, ADD_STUDYGROUP, STUDYGROUP_LOADING } from "./types";
//console.log("holaa");

export const getStudyGroups = (courseId,courseCode) => async (dispatch) => {
  dispatch(setStudyGroupLoading());
  try {
    console.log("working");
    let path = `/api/studyGroup/${courseId}/${courseCode}`
    const res = await axios.get(path);
    console.log(res);
    dispatch({
      type: GET_STUDYGROUP,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setStudyGroupLoading = () => {
  return {
    type: STUDYGROUP_LOADING,
  };
};

export const createStudyGroup = ({
    groupName,
    startDate,
    endDate,
    repeating,
    description,
    courseId,
    courseCode,
  }) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":localStorage.token,
      },
    };
    //console.log("hola");

    const body = JSON.stringify({
        groupName,
        startDate,
        endDate,
        repeating,
        description,
        courseId,
        courseCode,
    });
    console.log(config.headers);
    console.log(body);
    try {
      const res = await axios.post("/api/studyGroup", body, config);
  
      dispatch({
        type: ADD_STUDYGROUP,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        // look thru the array of errors
        console.log("hola2");
        errors.forEach((error) => dispatch(setAlert(error.msg), "danger"));
      } else {
          console.log("hola3");
      }
    }
  };