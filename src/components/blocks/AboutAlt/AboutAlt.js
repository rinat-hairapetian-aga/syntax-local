
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import parse from "html-react-parser";
import React, { useRef, useState } from "react";
import { useInViewport } from 'react-in-viewport';

import * as s from "./AboutAlt.module.css";

const AboutAlt = ({ block }) => {
  const bp = useBreakpoint();
  const blockRef = useRef();
  const {
    inViewport,
    enterCount,
    leaveCount,
  } = useInViewport(
    blockRef,
    {},
    { disconnectOnLeave: false },
    {}
  );
  const image = {
    data: block.image?.localFile?.childImageSharp?.gatsbyImageData,
    src: block.image?.localFile?.publicURL,
    alt: block.image?.altText || ``,
  };


  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} ref={blockRef}>
        {enterCount > 0 && <>
          <div className="container position-relative">
            <div className="row align-items-center">
              {(false == bp.lg && !!image?.src) &&
                <div className="col-12 mb-4">
                  <img src={image.src} alt={image.alt} className={'mw-100'} />
                </div>
              }
              <div className="col-lg-6 col-xxl-5">
                {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
                {!!block?.content && <div className={s.content}>
                  {parse(block?.content)}
                </div>}
              </div>
              {(true == bp.lg && !!image?.src) &&
                <div className="col-lg-6 col-xxl-6 offset-xxl-1">
                  <img src={image.src} alt={image.alt} className={'mw-100'} />
                </div>
              }
            </div>
          </div>
        </>}
      </section>
    </>
  );
};

export default AboutAlt;
