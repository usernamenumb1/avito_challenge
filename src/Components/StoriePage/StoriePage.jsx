import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { routes } from "../../utils";
import { getComments, deleteComments, setCurrentId } from "../../Store/actions";
import CommentsList from "./CmmentsList";

export default () => {
  const { by, title, url, time, score } = useSelector((state) => state.stories.currentStorie);
  const { kids } = useSelector((state) => state.stories.currentStorie);
  const comments = useSelector((state) => state.comments.storieComments);
  const dispatch = useDispatch();
  useEffect(() => {
    if (kids) dispatch(getComments(kids));
  }, []);
  useEffect(() => () => {
    dispatch(setCurrentId());
    dispatch(deleteComments());
  }, []);
  return (
    <div className="container h-100 my-4">
      <div className="row py-4">
        <div className="col">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="card-title"><a href={url}>{title}</a></div>
              <div className="card-text">
                <div className="row">
                  <div className="col">
                    <b className="p-1">{`${by}`}</b>
                    <span className="">{`posted ${time} ago`}</span>
                    <span className="">{`Comments: ${comments.length}`}</span>
                  </div>
                  <div className="col">
                    <div className="position-absolute end-0"><span>{`score:${score}`}</span></div>
                  </div>
                </div>
              </div>
              <Link to={routes.mainPage()}>
                <button type="button" className="btn btn-outline-maroon">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {kids && <CommentsList />}
    </div>
  );
};
