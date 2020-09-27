import { GET_USERS, ADD_USER, USERS_LOADING } from "../actions/types";
import { v4 as uuid } from "uuid";

const initialState = {
  users: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
