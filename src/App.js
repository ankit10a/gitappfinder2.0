import React, { Component, Fragment, useState } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/User";
import Search from "./components/users/Search";
import Axios from "axios";
import Alert from "./components/layout/Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/pages/About";
import SingleUser from "./components/users/SingleUser";
import Notfound from "./components/pages/Notfound";
import GithubState from "./components/context/Github/GitHubState";
import AlertState from "./components/context/alert/AlertState";

const App = () => {
  // const [alert, setAlert] = useState(null);

  // class App extends Component {

  //   state = {
  //     users: [],
  //     user: {},
  //     loading: false,
  //     alert: null,
  //     repos: []
  //   };
  // async componentDidMount() {
  //   setloading(true);
  //   const res = await Axios.get(`https://api.github.com/users?client_id=
  //   ${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //   &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET} `);
  //   this.setState({ users: res.data, loading: false });
  //   console.log(res.data);
  // }

  // const getUserRepos = async username => {
  //   setloading(true);
  //   const res = await Axios.get(`https://api.github.com/users/${username}/repos?per_page=5&
  //   sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //   &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET} `);
  //   // this.setState({ repos: res.data, loading: false });
  //   setrepos(res.data);
  //   setloading(false);
  // };

  // const showAlert = (msg, type) => {
  //   this.setState({ alert: { msg: msg, type: type } });
  //   setTimeout(
  //     () => setAlert(null),
  //     // this.setState({ alert: null })
  //     3000
  //   );
  // };

  // render() {
  //   const { loading, users, alert, user, repos } = this.state;
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Fragment>
                      <Search />
                      <Users />
                    </Fragment>
                  )}
                />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={SingleUser} />
                <Route component={Notfound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};
// }

export default App;
