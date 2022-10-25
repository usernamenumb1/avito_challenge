import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

const CommentComponent = ({ id, author, text }) => {
  const [showComments, setShowComments] = useState(false);
  const comments = useSelector((state) => state.comments.storieComments);
  const currentComment = comments.find((comment) => comment.id === id);
  const kidCommentsIds = currentComment.kids ? currentComment.kids : null;
  const kidComments = kidCommentsIds ? comments.filter((comment) => kidCommentsIds.includes(comment.id)) : null;
  const handleClick = () => {
    setShowComments(!showComments);
  };
  return (
    <div className="row pb-3 ps-3">
      <div className="card border-0 shadow">
        <div className="card-body">
          <div className="card-text">
            <div className="row"><b>{author}</b></div>
            <div className="row"><div dangerouslySetInnerHTML={{ __html: text }} /></div>
          </div>
          {kidComments && <button type="button" className="btn btn-outline-maroon" onClick={handleClick}>{`${showComments ? 'Hide' : 'Show'} comments`}</button>}
        </div>
      </div>
      {showComments && kidComments.map((comment) => <CommentComponent key={comment.id} id={comment.id} author={comment.by} text={comment.text} />)}
    </div>
  );
};

CommentComponent.defaultProps = {
  id: 0,
  author: 'John',
  text: 'Some text'
};

CommentComponent.propTypes = {
  id: PropTypes.number,
  author: PropTypes.string,
  text: PropTypes.string,
};

export default CommentComponent;
