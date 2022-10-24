import React from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

export default () => {
  const id = useSelector((state) => state.comments.currentStorieId);
  const comments = useSelector((state) => state.comments.storieComments);
  const filtredComments = comments.filter((comment) => comment.parent === id);
  return (
    <div className="row">
      <div className="col px-5">
        <h4>Comments</h4>
        {filtredComments.map((comment) => (<Comment key={comment.id} id={comment.id} author={comment.by} text={comment.text} />))}
      </div>
    </div>
  );
};
