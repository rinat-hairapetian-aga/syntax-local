
import { Link } from "gatsby";
import React from "react";

const AnchorLink = ({ to, className, actievClassName, children, topOffset }) => {

  const [isActive, setIsActive] = React.useState(false)

  if (!!topOffset) {
    topOffset = 0;
  }

  const isElementInViewport = (id) => {

    let el = document.getElementById(id);
    if (el) {
      let rect = el.getBoundingClientRect();
      let wheight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top <= (90) && rect.bottom >= (wheight)) {
        return true;
      }
      if (rect.top >= (90) && rect.bottom <= (wheight)) {
        return true;
      }

      let visibleHeight = 0;
      if (rect.y > 90 && rect.y <= (wheight)) {
        visibleHeight = Math.min((wheight - rect.y), rect.height);
      }

      if (rect.y < 90 && rect.bottom > 90 && rect.bottom <= (wheight)) {
        visibleHeight = rect.height - 90 + rect.y;
      }
      if (Math.max((visibleHeight / rect.height), (visibleHeight / wheight)) > 0.5) {
        return true;
      }
    }

    return false
  }

  React.useEffect(() => {
    document.addEventListener('scroll', (e) => {
      if (isElementInViewport(to)) {
        setIsActive(true)
      } else {
        setIsActive(false)
      }
    })
  }, [])

  let href = to;

  if ('#' != href[0]) {
    href = '#' + href;
  }
  return (
    <>
      <Link to={href} className={`${className} ${!!isActive ? actievClassName : ''}`} >{children}</Link>
    </>
  );
};

export default AnchorLink;
