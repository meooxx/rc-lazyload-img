import * as React from "react";
const observerMap = new Map();
interface RefFunc {
  (instance: HTMLImageElement): any;
}
interface CustomProps {
  dataBGImg?: string;
  holder?: string
  //ref: React.ComponentClass;
}

type FwdRProps = CustomProps & React.ImgHTMLAttributes<HTMLImageElement>;
const BGHOLDER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
let GLOBAL_HOLDER = BGHOLDER

type refFun = (node: HTMLImageElement) => void
type reactRef = React.Ref<HTMLImageElement>

function forwardRef(props: FwdRProps, ref: refFun):
    React.ReactHTMLElement<HTMLImageElement> | React.ReactHTMLElement<HTMLElement>;
function forwardRef(props: FwdRProps, ref: reactRef): 
    React.ReactHTMLElement<HTMLImageElement> | React.ReactHTMLElement<HTMLElement>;

function forwardRef(props: any, ref: any) {
  const { src, alt = "", dataBGImg = "", holder = GLOBAL_HOLDER  , ...rest } = props;

  const img = (
    <img
      alt={`image ${alt}`}
      data-src={src}
      {...rest}
      ref={ref}
      src={holder} // 占位图片
    />
  ) as React.ReactHTMLElement<HTMLImageElement>;

  if (dataBGImg) {
    const pps = {
      //style: {...props.style},
      ref,
      "data-bgimg": dataBGImg
    };

    const ele = <div {...rest} {...pps} /> as React.ReactHTMLElement<HTMLElement>;
    return ele;
  }
  return img;
};


interface IntersectionObserverOption {
  root?: Element;
  rootMargin?: string;
  threshold?: number[];
}

export interface Props {
  observerId: string;
  options: IntersectionObserverOption;
  src: string;
  "data-src": string;
  [index: string]: any;
}

export default class LazyLoadImg extends React.Component<Props> {
  comRef: HTMLImageElement;
  // you can define the global holder img
  // inspired by spin element of antd 
  static setGlobalHolder(picUrl:string) {
    GLOBAL_HOLDER = picUrl 
  }
  componentDidMount() {
    const INTERSECTIONRATIO: string = "intersectionRatio";
    const INTERSECTION_OBSERVER = "IntersectionObserver";
    const INTERSECTION_OBSERVER_ENTRY = "IntersectionObserverEntry";

    if (
      !(INTERSECTION_OBSERVER in window) &&
      INTERSECTION_OBSERVER_ENTRY in window &&
      !(
        INTERSECTIONRATIO in (window as any).IntersectionObserverEntry.prototype
      )
    ) {
      // load polyfill now
      require("intersection-observer");
    }

    const {
      observerId,
      options = {
        threshold: [0.1]
      }
    } = this.props;

    const id = this.getId(observerId) as string;
    let observerIntance: IntersectionObserver = observerMap.get(id);

    if (!observerIntance) {
      observerIntance = new IntersectionObserver(this.onVisible, options);
      observerMap.set(id, observerIntance);
    }

    observerIntance.observe(this.comRef);
  }

  componentWillUnmount() {
    const { observerId } = this.props;
    const id = this.getId(observerId);
    const intance = observerMap.get(id);

    if (intance) intance.disconnect();
    observerMap.delete(id);
  }
  getId = (id: string) => {
    return id ? `OBSERVERID_${id}` : `OBSERVERID`;
  };

  onVisible = (
    entries: IntersectionObserverEntry[],
    observe: IntersectionObserver
  ) => {
    entries.forEach(this.setSrc(observe));
  };

  setSrc = (observe: IntersectionObserver) => (
    entry: IntersectionObserverEntry
  ) => {
    if (!entry.isIntersecting) return;

    interface SrcAttr {
      src?: string;
      dataset?: {
        [index: string]: any;
      };
      style?: {
        [index: string]: string;
      };
    }

    const entryTarget: Element & SrcAttr = entry.target;
    const dataset = entryTarget.dataset || {};
    entryTarget.style = entryTarget.style ? entryTarget.style : {};

    if (dataset.bgimg && entryTarget.tagName !== "IMG")
      entryTarget.style.backgroundImage = `url(${dataset.bgimg})`;
    else entryTarget.src = dataset.src;
    observe.unobserve(entry.target);
  };

  saveNode: RefFunc = (node: HTMLImageElement) => {
    this.comRef = node;
  };

  render() {
    
    let Wrapper
    if(!!React.forwardRef)  {
      Wrapper = React.forwardRef<HTMLImageElement, FwdRProps>(forwardRef);
      return <Wrapper {...this.props} ref={this.saveNode}/>
    }else {
      Wrapper = forwardRef(this.props, this.saveNode)  //as React.ComponentType<Props>
      return Wrapper; 
    }

  }
}
