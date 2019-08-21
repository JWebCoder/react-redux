import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


// import './index.scss';

import LandingPage from "./Pages/LandingPage";
import NavBarTop from "./NavBarTop";
import CreatePost from "./CreatePost"

function App() {
  return (
    <Router>
      <NavBarTop/>
      <CreatePost/>
      <hr className="container"></hr>
      <Switch>
        <Route path="/" exact component={LandingPage} />
       
      </Switch>
    </Router>
  );
}

export default App;

