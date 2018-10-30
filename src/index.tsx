import * as React from "react";
const observerMap = new Map();

interface RefFunc {
  (instance: HTMLImageElement): any;
}
interface CustomProps {
  dataBGImg?: string;
  ref: React.ComponentClass;
}

type FwdRProps = CustomProps & React.ImgHTMLAttributes<HTMLImageElement>;

const forwardRef = (props: FwdRProps, ref: React.Ref<HTMLImageElement>) => {
  const { src, alt = "", dataBGImg = "", ...rest } = props;

  const img = (
    <img
      alt={`image ${alt}`}
      data-src={src}
      {...rest}
      ref={ref}
      src={
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      }
    />
  ) as React.ReactHTMLElement<HTMLElement>;

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

const Wrapper = React.forwardRef<HTMLImageElement, FwdRProps>(forwardRef);

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
  comRef: HTMLImageElement

  componentDidMount() {
    //TODO: detect the intersection-observer api
    require("intersection-observer");
    const {
      observerId,
      options = {
        threshold: [0.1]
      }
    } = this.props;

    const id = this.getId(observerId);
    let observerIntance = observerMap.get(id);

    if (!observerIntance) {
      observerIntance = new IntersectionObserver(this.onVisible, options);
      observerMap.set(id, observerIntance);
    }

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

  onVisible = (entries, observe) => {
    entries.forEach(this.setSrc(observe));
  };

  setSrc = observe => entry => {
    if (!entry.isIntersecting) return;
    const entryTarget = entry.target;
    if (entryTarget.dataset.bgimg && entryTarget.tageName !== "IMG")
      entryTarget.style.backgroundImage = `url(${entryTarget.dataset.bgimg})`;
    else entryTarget.src = entryTarget.dataset.src;
    observe.unobserve(entry.target);
  };

  saveNode:RefFunc= (node:HTMLImageElement) => {
    this.comRef = node;
  };

  render() {
    return <Wrapper {...this.props} ref={this.saveNode} />;
  }
}
