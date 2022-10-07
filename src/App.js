import React, { Component } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

import PostDetails from './pages/PostDetails';
import PostList from './pages/PostList';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Routes>
            <Route exact path='/' element={<PostList />} />
            <Route exact path='/search' element={<PostList />} />
            <Route exact path='/posts' element={<PostList />} />
            <Route path='/posts/:id' element={<PostDetails />} />
          </Routes>
        </Router>

      </>
    );
  }
}

export default App;
