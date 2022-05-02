import {BrowserRouter as Router} from 'react-router-dom';
import React, { Component } from 'react'
import Routes from './router/index';
import 'antd/dist/antd.min.css'
class App extends Component  {
  render() {
    return (
      <Router>
        <Routes></Routes>
      </Router>
    );
  }
}
export default App;
