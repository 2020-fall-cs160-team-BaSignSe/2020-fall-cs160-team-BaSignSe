import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
console.log("holaa");

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
    console.log("hola");

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