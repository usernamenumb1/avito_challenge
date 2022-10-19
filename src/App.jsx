import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav.jsx';
import NewsList from './Components/NewsList.jsx';
import routes from './routes';

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <Nav />
      <Switch>
        <Route path={routes.mainPage()}>
          <NewsList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
