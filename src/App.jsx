import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import Nav from './Components/Nav.jsx';
import NewsList from './Components/News/NewsList.jsx';
import StoriePage from './Components/StoriePage/StoriePage.jsx';
import { routes } from './utils.js';
import { getNewsIds } from './Store/actions.js';

function App() {
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.comments.currentStorieId);
  useEffect(() => {
    dispatch(getNewsIds());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getNewsIds());
    }, 60000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="d-flex flex-column h-100">
      <Nav />
      <Route exact path={routes.mainPage()}>
        <NewsList />
      </Route>
      <Route path={routes.newsItemPage(currentId)}>
        <StoriePage />
      </Route>
    </div>
  );
}

export default App;
