react lazy load(preview!!)

feature

 * it leverages intersetion-observer Api  [w3c](https://github.com/w3c/IntersectionObserver)
 * ligthweigth and flexible script 
 * jsx 
 * outbox
 * client & server 

pr welcome !!

install 

```sh
npm i rc-lazyload-img
# or yarn add -D rc-lazyload-img

```

usage 
| props    |      type     |  default                         | des
|----------|:-------------:|---------------------------------:|------: |
| src      |    string     |   1*1 image(base64)              | as small as possible
| dataBGImg|    string     |  '' |                            |
| holder   |    string     |   1*1 image(base64) img element  | placeholder of imgElement(as small as possible)
|...ImgHTMLAttributes|      |                                 |any(same as <img {...ImgHTMLAttributes}/>)|



```js
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


