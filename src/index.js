/*!
* Github page:

* This script is using for import necessary dependency including bootstrap and paper-kit, which are css library

*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "../node_modules/video-react/dist/video-react.css";
import Index from "views/Index.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={props => <Index {...props} />} />
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
