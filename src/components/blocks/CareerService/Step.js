
import parse from "html-react-parser";
import React from "react";

import * as s from "./Step.module.css";

const Step = ({ block }) => {

  const classNames = [
    s.block,
  ];

  if ('hide' != block?.arrowPosition) {
    classNames.push(s.arrow);
    switch (block?.arrowPosition) {
      case 'left':
        classNames.push(s.left);
        break;
      case 'right':
        classNames.push(s.right);
        break;
      case 'bottom':
        classNames.push(s.bottom);
        break;

      default:
        break;
    }
  }

  const styles = {
    '--bg-color': block?.bgColor,
    '--bg-gradient': block?.bgGradient,
    '--text-color': block?.textColor,
    '--arrow-color': block?.arrowColor,
  }

  return <div className={`col-lg-${block?.size} py-3`}>
    <div className={`${classNames?.join(' ')}`} style={styles}>
      {!!block?.title && <span>{parse(block.title)}</span>}
    </div>
  </div>
}

export default Step;