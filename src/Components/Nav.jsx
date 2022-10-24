import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getNewsIds, refreshComments, deleteComments } from "../Store/actions";

export default () => {
  const dispatch = useDispatch();
  const currentStorie = useSelector((state) => state.stories.currentStorie);
  const handleNewsClick = () => {
    dispatch(getNewsIds());
  };
  const handleCommentsClick = () => {
    const { id } = currentStorie;
    dispatch(deleteComments());
    dispatch(refreshComments(id));
  };
  return (
    <nav className="shadow-lg navbar navbar-expand-lg navbar-light bg-white rounded-5">
      <div className="container">
        <Link className="navbar-brand text-dark text-decoration-none px-4" to="/">Hacker News</Link>
        { !currentStorie ? <button type="button" className="btn btn-outline-maroon rounded-5" onClick={handleNewsClick}>Refresh news</button> : <button type="button" className="btn btn-outline-maroon rounded-5" onClick={handleCommentsClick}>Refresh comments</button>}
      </div>
    </nav>
  );
};
