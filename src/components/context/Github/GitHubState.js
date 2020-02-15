import React, { useReducer } from "react";
import Axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./gitReducer";
import {
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  CLEAR_USERS,
  SET_LOADING
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const SearchUser = async text => {
    setloading();
    const res = await Axios.get(`https://api.github.com/search/users?q=${text}&client_id=
  ${githubClientId}
  &client_secret=${githubClientSecret} `);
    // this.setState({ users: res.data.items, loading: false });
    // setusers(res.data.items);
    // setloading(false);
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  const setloading = () => {
    dispatch({ type: SET_LOADING });
  };
  const ClearUsers = () => {
    dispatch({
      type: CLEAR_USERS
    });
  };
  const getUser = async username => {
    setloading();
    const res = await Axios.get(`https://api.github.com/users/${username}?client_id=
  ${githubClientId}
  &client_secret=${githubClientSecret} `);
    // this.setState({ user: { ...res.data }, loading: false });
    // setuser(res.data);
    // setloading(false);
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };
  const getUserRepos = async username => {
    setloading();
    const res = await Axios.get(`https://api.github.com/users/${username}/repos?per_page=5&
  sort=created:asc&client_id=${githubClientId}
  &client_secret=${githubClientSecret} `);
    // this.setState({ repos: res.data, loading: false });
    // setrepos(res.data);
    // setloading(false);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        SearchUser,
        ClearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};
export default GithubState;
