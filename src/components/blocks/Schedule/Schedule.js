
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React, { useRef } from "react";
import { useInViewport } from 'react-in-viewport';

import * as s from "./Schedule.module.css";

const Schedule = ({ block }) => {
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

  const bgDesktop = {
    data: block.bgDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgDesktop?.altText || ``,
  };
  const bottomDesktop = {
    data: block.bottomDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottomDesktop?.altText || ``,
  };

  const bgMobile = {
    data: block.bgMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgMobile?.altText || ``,
  };
  const bottomMobile = {
    data: block.bottomMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottomMobile?.altText || ``,
  };

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} ref={blockRef}>
        <div className={s.wrapper}>
          {enterCount > 0 && <>
            {(true == bp.md && !!bgDesktop?.data) && <GatsbyImage
              loading="eager"
              placeholder="dominantColor"
              className={s.bg}
              image={bgDesktop.data}
              alt={bgDesktop.alt} />}
            {(false == bp.md && !!bgMobile?.data) && <GatsbyImage
              loading="eager"
              placeholder="dominantColor"
              className={s.bg}
              image={bgMobile.data}
              alt={bgMobile.alt} />}
            <div className="container position-relative">
              <div className="row">
                <div className="col-12">
                  {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
                  {!!block?.subtitle && <div className={s.subtitle}>{parse(block?.subtitle)}</div>}
                </div>
                <div className="col-12">
                  {block?.items?.length > 0 && <div className={s.itemsWraper}>
                    {block?.items?.map((item, i) => {
                      let icon = {
                        src: item?.icon?.localFile?.publicURL,
                        alt: item?.icon?.altText || ``,
                      }
                      return <div className={s.item} key={i}>
                        {!!icon.src && <img src={icon.src} alt={icon.alt} />}
                        <div className={s.description}>{parse(item.description)}</div>
                      </div>
                    })}
                  </div>}
                </div>
              </div>
            </div>
          </>}
        </div>
        {(true == bp.md && !!bottomDesktop?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          objectFit='fill'
          className={s.bottomImage}
          image={bottomDesktop.data}
          alt={bottomDesktop.alt} />}

        {(false == bp.md && !!bottomMobile?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          objectFit='fill'
          className={s.bottomImage}
          image={bottomMobile.data}
          alt={bottomMobile.alt} />}
      </section>
    </>
  );
};

export default Schedule;
