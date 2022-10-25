import React from "react";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentId } from "../../Store/actions";

const NewsItem = ({ id, title, author, time, rank }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentId(id));
  };
  return (
    <div className="card my-3 shadow border-0 rounded-5">
      <div className="card-body px-5">
        <h5 className="card-title"><Link to={`/news/${id}`} onClick={handleClick}>{title}</Link></h5>
        <div className="card-text">
          <div className="row">
            <div className="col">
              <span className="p-1">
                <b>{`${author}`}</b>
              </span>
              <span className="p-1 border-end-2">{`posted ${time} ago`}</span>
              <span className="p-1">{`score:${rank}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NewsItem.defaultProps = {
  id: 0,
  author: 'John',
  title: 'Some text',
  time: 'some time',
  rank: 0,
};

NewsItem.propTypes = {
  id: PropTypes.number,
  author: PropTypes.string,
  title: PropTypes.string,
  time: PropTypes.string,
  rank: PropTypes.number,
};

export default NewsItem;
