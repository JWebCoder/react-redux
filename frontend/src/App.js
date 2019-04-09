import React, { Component } from 'react';
import './App.css';
import Header from './containers/header'
import { Route, BrowserRouter as Router} from 'react-router-dom'
import PostsPage from './pages/postsPage'
import PostDetailPage from './pages/postDetailPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header></Header>
          <main>
            <Route exact path="/" component={PostsPage}></Route>
            <Route path="/categories/:name" component={PostsPage}></Route>
            <Route path="/post/:id" component={PostDetailPage}></Route>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
