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
              <LoadImg src='//meooxx.github.io/rc-lazyload-img/pic1.jpeg'/>
            </li>
            <li>     
              <LoadImg src='//meooxx.github.io/rc-lazyload-img/js.jpeg'/>
            </li>
            <li>     
              <LoadImg src='//meooxx.github.io/rc-lazyload-img/logo.svg'/>
            </li>
            <li>     
              <LoadImg src='//meooxx.github.io/rc-lazyload-img/pic2.jpeg'/>
            </li>
            <li>     
              <LoadImg src='//meooxx.github.io/rc-lazyload-img/pic3.jpeg'/>
            </li>
          </>}
        </ul>

      </div>
    );
  }
}

export default App;
