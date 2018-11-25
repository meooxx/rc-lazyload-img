import React, { Component } from 'react';


import './App.css';
import  LoadImg  from 'rc-lazyload-img'

console.log(LoadImg)

class App extends Component {
  render() {

    return (
      <div className="App">
        <ul>
          {<>
            <li>     
              <LoadImg src='./js.jpeg'/>
            </li>
            <li>     
              <LoadImg src='./pic1.jpeg'/>
            </li>
          </>}
        </ul>

      </div>
    );
  }
}

export default App;
