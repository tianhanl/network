import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import './App.css';
import NetworkContainer from './components/NetworkContainer';

class App extends Component {
  render() {
    return (
      <div
        className="App"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <div
          style={{
            border: '2px #F07883 solid'
          }}
        >
          <NetworkContainer />
        </div>

        <DevTools />
      </div>
    );
  }
}

export default App;
