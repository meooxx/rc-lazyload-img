react lazy load(preview!!)

feature

 * it leverages intersetion-observer Api  [w3c](https://github.com/w3c/IntersectionObserver)
 * ligthweigth and flexible script 
 * jsx 
 * outbox
 * client & server 
 * background-img

pr welcome !!

install 

```sh
npm i rc-lazyload-img
# or yarn add -D rc-lazyload-img
# react 15/16 required
```

usage    

| props    |      type     |  default                         | des|
|----------|-------------:|----------------------------------:|------: |
| src      |    string     |   1*1 image(base64)              | as small as possible|
| dataBGImg|    string     |  ' '                             | style.background-img = dataBGImg  |
| holder   |    string     |   1*1 image(base64) img element  | placeholder of img(as small as possible)|
|...ImgHTMLAttributes|   any   |                              |any other &lt;img / &gt;'s propterty   |



```js
   ...
  import LoadImg from 'rc-lazyload-img' 
  ...
  <LoadImg src='www.example.com/pic1.png' />
  <LoadImg dataBGImg="www.example.com/pic2.png" />
  <LoadImg 
    style={{styles}}
    dataBGImg="www.example.com/pic2.png" />
  <LoadImg 
    onError={handleOnError}
    dataBGImg="www.example.com/pic2.png" />
  ...

```


