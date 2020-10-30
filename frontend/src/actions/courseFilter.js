import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";


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
      //const res = await axios.post("/api/studyGroup", body, config);
      
    //   if(courseCode) {
    //     console.log("djdujdhdhdhdhhdd PATH");
    //     console.log(courseId);
    //     console.log(courseCode);
    //   }


      if(courseId  && courseCode ) {
        let path = `/api/course/${courseId}/${courseCode}`
        console.log("FIRST PATH");
        console.log(path);
        const res = await axios.get(path, config);
        console.log(res.data.docs);
      } else if (courseId) {
        let path = `/api/course/${courseId}`
        console.log("2ND PATH");
        console.log(path);
        const res = await axios.get(path, config);
        console.log(res.data.docs);
      }
       

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