import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import * as s from "./TableOfContents.module.css";

const TableOfContents = ({ items }) => {

  const [opened, setOpened] = React.useState(false);

  const close = () => {
    setOpened(false);
  }

  const open = () => {
    setOpened(true);
  }

  const toggle = () => {
    setOpened(!opened);
  }

  return (
    <>
      <div className={`${s.tableOfContents}`}>
        <div className={`${s.close} ${opened ? '' : 'd-none' } d-xl-none`} onClick={close} >&times;</div>
        <h5 onClick={toggle}>TABLE OF CONTENTS</h5>
        <div className={`${s.links} ${opened ? '' : 'd-none' } d-xl-flex`}>
          {items?.map((toc, i) => {
            return <a href={toc.anchor} onClick={close} key={`toc-${i}`}>{toc.label}</a>
          })}
        </div>
      </div>
    </>
  );
};

export default TableOfContents;
