import { Link } from "gatsby";
import parse from "html-react-parser";
import React from "react";
import * as s from "./buttonCta.module.css";

const ButtonCta = ({ block, className, children, onClick, type, style }) => {

  // let blockStructure = {
  //   type: '',
  //   color: '',
  //   hoverColor: '',
  //   textColor: '',
  //   borderColor: '',
  //   link: {
  //     target: '',
  //     title: '',
  //     url: '',
  //   }
  // }
  if (undefined == typeof style) {
    style = {}
  }

  let blockStyles = {
    '--color': block?.color,
    '--color-hover': block?.hoverColor,
    '--color-text': block?.textColor,
    '--border-color': block?.borderColor,
    ...style
  };

  if (undefined != onClick) {
    if (undefined == type) {
      type = 'button';
    }
    return <button type={type} style={blockStyles} className={`${className} ${s.cta} ${block?.type == 'outline' ? s.outline : ''}`} onClick={onClick}>
      {children}
    </button>
  }

  return (
    <>
      {!!block?.link?.url && <Link style={blockStyles} className={`${className} ${s.cta} ${block?.type == 'outline' ? s.outline : ''}`} to={block?.link?.url} target={block?.link?.target}>
        {parse(block?.link?.title ?? block?.link?.url)}
      </Link>}
    </>
  );
};

export default ButtonCta;
