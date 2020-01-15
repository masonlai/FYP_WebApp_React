
import React from "react";

// reactstrap components

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

// index sections
import SectionButtons from "views/index-sections/SectionButtons.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });

  return (
    <>
      <Router>
      <IndexNavbar />
      <div className="main">
        <Switch>
          <Route exact path="/index">
            <IndexHeader />
          </Route>
          <Route path="/about">
            <SectionButtons />
          </Route>
        </Switch>
        <DemoFooter/>
      </div>
      </Router>
    </>
  );
}

export default Index;
