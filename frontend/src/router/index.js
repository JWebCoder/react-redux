import React, { Component } from 'react';
import { BrowserRouter as Router ,Route, Switch } from 'react-router-dom';
import Home from './Home'
import PostDetail from './PostDetail'
class RouterApp extends Component {
    render() {
        return (
            <Router>
                <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/:category" component={Home} />
                <Route path="/:category/:postId" component={PostDetail} />
                </Switch>
            </Router>
        )
    }
}
export default RouterApp