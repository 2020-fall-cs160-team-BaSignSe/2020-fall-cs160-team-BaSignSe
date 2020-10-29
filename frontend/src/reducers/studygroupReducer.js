import { GET_STUDYGROUP, ADD_STUDYGROUP, STUDYGROUP_LOADING } from "../actions/types";

const initialState = {
  studyGroups: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STUDYGROUP:
      return {
        ...state,
        studyGroups: action.payload,
        loading: false,
      };
    case ADD_STUDYGROUP:
        return{
            ...state,
            studyGroups:[action.payload, ...state]
        };
    case STUDYGROUP_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}