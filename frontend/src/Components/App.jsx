import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


// import './index.scss';

import LandingPage from "./Pages/LandingPage";
import NavBarTop from "./NavBarTop";

function App() {
  return (
    <Router>
      <NavBarTop/>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        {/* <Route path="/edit-post/:postId" component={EditPostPageContainer} />
        <Route path="/new-post" component={NewPostPageContainer} />
        <Route path="/:categoryPath/:postId" component={PostPageContainer} />
        <Route path="/:categoryPath" component={CategoryPageContainer} />
        <Route component={RouteNotFound} /> */}
      </Switch>
    </Router>
  );
}

export default App;

