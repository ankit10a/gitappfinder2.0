import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import GithubContext from "../context/Github/githubContext";
import AlertContext from "../context/alert/AlertContext";

// class Search extends Component {
//   state = {
//     text: ""
//   };
const Search = ({ setAlert }) => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState("");

  Search.propTypes = {
    setAlert: PropTypes.func.isRequired
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim() === "") {
      alertContext.setAlert("Please enter something", "light");
    } else {
      githubContext.SearchUser(text);
      // this.setState({ text: "" });
      setText("");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search User...."
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.ClearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
