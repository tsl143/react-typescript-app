import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';

import App from "./components/App";
const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Route exact path="/" component={App} />
  </Router>,
  document.getElementById("root")
);
