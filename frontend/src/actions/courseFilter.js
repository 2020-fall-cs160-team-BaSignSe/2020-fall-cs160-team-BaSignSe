import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import {
  GET_COURSES
} from "./types";

export const courseFilter = ({
    courseId,
    courseCode,
  }) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":localStorage.token,
      },
    };
  
    try {

      let data; 

      console.log("In course filter");
      console.log(courseId); 

      if(courseId  && courseCode ) {
        let path = `/api/course/${courseId}/${courseCode}`
        console.log("FIRST PATH");
        console.log(path);
        const res = await axios.get(path, config);
        console.log(res.data.docs);

        data = res.data;
      } else if (courseId) {
        let path = `/api/course/${courseId}`
        console.log("2ND PATH");
        console.log(path);
        const res = await axios.get(path, config);
        console.log(res.data.docs);

        data = res.data;
      }
       

      dispatch({
        type: GET_COURSES,
        payload: data
      });

    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        // look thru the array of errors
        console.log("we got hereeeeeeee");
        errors.forEach((error) => dispatch(setAlert(error.msg), "danger"));
      } else {
          console.log("we got hereeeeeeee");
      }
    }
  };