import React, { Component } from 'react';
import logo from './logo.svg';
import jsLog from './js.jpeg'

import './App.css';
import  LoadImg  from 'rc-lazyload-img'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div style={{background: "red", width:"100%", height: "900px"}}></div>
          <LoadImg src={logo} className="App-logo" alt="logo" />

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <div style={{background: "#456543", width:"100%", height: "900px"}}></div>

          <LoadImg width="20px" height="20px" dataBGImg={jsLog} className="App-logo" alt="logo" />

        </header>
      </div>
    );
  }
}

export default App;
