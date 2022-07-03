import { combineReducers } from "redux";

import * as actions from "../actions/actions";


function visibilityFilter(state = "", action) {
  switch (action.type) {
    case actions.SET_FILTER:
      return action.value;
    default:
      return state;
  }
}


function movies(state = [], action) {
  switch (action.type) {
    case actions.SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function getAuth() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    return { token: token, user: user };
  }
  return null;
}

function userAuth(state = getAuth(), action) {
  switch (action.type) {
    case actions.SET_AUTH:
      return {
        ...state,
        token: action.value.token,
        user: action.value.user,
      };
    default:
      return state;
  }
}

function user(state = {}, action) {
  switch (action.type) {
    case actions.SET_USER:
      return action.value;
    default:
      return state;
  }
}


const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userAuth,
  user,
});

export default moviesApp;