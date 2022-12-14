import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { getNews } from "../../Store/actions";
import type from "../../Store/types";
import NewsItem from "./NewsItem";

export default () => {
  const dispatch = useDispatch();
  const newsIds = useSelector((store) => store.stories.newsIds);
  const news = useSelector((store) => store.stories.news);
  const isLoaded = useSelector((store) => store.stories.loadingStatus);

  useEffect(() => {
    dispatch(getNews(newsIds));
  }, [newsIds]);

  return (
    <div className="container h-100 my-3">
      {(isLoaded === type.DATA_LOADING) && <div className="row justify-content-center align-items-center h-100 mt-3"><Spinner animation="border" variant="dark" /></div>}
      {news.map((item) => (
        <NewsItem
          key={item.id}
          id={item.id}
          title={item.title}
          author={item.by}
          time={item.time}
          rank={item.score}
        />
      ))}
    </div>
  );
};
