import React, { Component } from 'react';


import './App.css';
import  LoadImg  from 'rc-lazyload-img'
import holderImg from './pic1.jpeg'

class App extends Component {
  render() {

    return (
      <div className="App">
        <ul>
          {<>
            <li>     
              <LoadImg 
                src='//meooxx.github.io/rc-lazyload-img/pic1.jpeg'/>
            </li>
            <li>     
              <LoadImg 
                style={{width: '500px'}}
                src='//meooxx.github.io/rc-lazyload-img/js.jpeg'/>
            </li>
            <li>     
              <LoadImg 
                dataBGImg={'//meooxx.github.io/rc-lazyload-img/logo.svg'}
              />
            </li>
            <li>     
              <LoadImg src='//meooxx.github.io/rc-lazyload-img/pic2.jpeg'/>
            </li>
            <li>     
              <LoadImg 
                holder={holderImg}
                src='//meooxx.github.io/rc-lazyload-img/pic3.jpeg'/>
            </li>
          </>}
        </ul>

      </div>
    );
  }
}

export default App;
