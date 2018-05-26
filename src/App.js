import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NetworkContainer from './components/NetworkContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NetworkContainer />
      </div>
    );
  }
}

export default App;
