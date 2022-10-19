import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white rounded-1">
    <div className="container">
      <Link className="navbar-brand text-dark text-decoration-none pacifico" to="/">Hacker News</Link>
    </div>
  </nav>
);
