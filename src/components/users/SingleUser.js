import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";
import GithubContext from "../context/Github/githubContext";

// class SingleUser extends Component {
//   componentDidMount() {
//     this.props.getUser(this.props.match.params.login);
//     this.props.getUserRepos(this.props.match.params.login);
//   }
const SingleUser = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { getUser, loading, user, getUserRepos, repos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
  }, []);

  // render() {
  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    company,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user;

  if (loading) return <Spinner />;

  return (
    <div>
      <Link to="/" className="btn btn-light">
        Back to search
      </Link>
      {name}
      Hireable:
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt=""
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location:{location}</p>
        </div>
        <div>
          {bio && (
            <>
              <h3>Bio</h3>
              <p>{bio}</p>
            </>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <>
                  <strong>Username:</strong>
                  {login}
                </>
              )}
            </li>
            <li>
              {company && (
                <>
                  <strong>Company:</strong>
                  {company}
                </>
              )}
            </li>
            <li>
              {blog && (
                <>
                  <strong>Website:</strong>
                  {blog}
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers:{followers}</div>
        <div className="badge badge-success">Following:{following}</div>
        <div className="badge badge-light">Public Repos:{public_repos}</div>
        <div className="badge badge-dark">Public Gists:{public_gists}</div>
      </div>
      <Repos repos={repos} />
    </div>
  );
};
// }

export default SingleUser;
