import React from "react";
import {Paths} from "../../utils/urlHelper";
import Root from "../Root";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const MainRouter = () => {
  return <Router>
    <Switch>
      <Route exact path={Paths.root} component={Root}/>
    </Switch>
  </Router>
}

export default MainRouter;