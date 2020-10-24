import axios from "axios";
import { setAlert } from "../actions/alert";

// not making a request just adding a global header

const setAuthToken = (token) => {
  if (token) {
    // token comes from global storage
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    // not a token, so delete. we don;t wanna have a token that isn't vaild in local storage
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
