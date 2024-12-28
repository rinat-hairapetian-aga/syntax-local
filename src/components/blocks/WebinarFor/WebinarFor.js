import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React, { useRef } from "react";
import { useInViewport } from 'react-in-viewport';

import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./WebinarFor.module.css";

const WebinarFor = ({ block }) => {
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

  const linesLeftImage = {
    data: block.linesLeftImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesLeftImage?.altText || ``,
  };

  const linesRightImage = {
    data: block.linesRightImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesRightImage?.altText || ``,
  };

  return (
    <section className={`${s.block}`} id={block?.blockId} ref={blockRef}>
      {enterCount > 0 && <>
        {(true == bp.lg && !!linesLeftImage?.data) &&
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={s.lines}
            style={{ left: 0 }}
            image={linesLeftImage.data}
            alt={linesLeftImage.alt} />
        }
        {(true == bp.lg && !!linesRightImage?.data) &&
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={s.lines}
            style={{ right: 0 }}
            image={linesRightImage.data}
            alt={linesRightImage.alt} />
        }
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className={`col-lg-12`}>
              {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
              {!!block?.subtitle && <div className={s.subtitle}>{parse(block?.subtitle)}</div>}
            </div>
            <div className={`col-lg-12 col-xxl-12 px-0`}>
              {block?.items?.length > 0 &&
                <div className='row justify-content-around' style={{ rowGap: '25px' }}>
                  {block?.items?.map((item, i) => {
                    return <div className='col-md-6 col-xl-4' key={i} ><Item item={item} /></div>
                  })}
                </div>
              }
            </div>
            <div className="col-lg-12 pt-4 pt-lg-5 d-flex justify-content-center">
              <ButtonCta block={block?.button} className={``} />
            </div>
          </div>
        </div>
      </>}
    </section>
  );
};

export default WebinarFor;

const Item = ({ item }) => {
  const bp = useBreakpoint();

  const image = {
    data: item.image?.localFile?.childImageSharp?.gatsbyImageData,
    src: item.image?.localFile?.publicURL,
    alt: item.image?.altText || ``,
  };

  const imageMobile = {
    data: item.imageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    src: item.imageMobile?.localFile?.publicURL,
    alt: item.imageMobile?.altText || ``,
  };

  return <div className={s.item}>
    <div className='d-flex justify-content-center align-items-center'>
      {(true == bp?.md && !!image?.src) && <img src={image.src} alt={image.alt} className={'mw-100'} />}
      {(false == bp?.md && !!imageMobile?.src) && <img src={imageMobile.src} alt={imageMobile.alt} className={'mw-100'} />}
    </div>
    <div className={s.info}>
      <div className={s.itemTitle}>{parse(item?.title ?? '')}</div>
      {!!item?.subtitle && <div className={s.itemSubtitle}><span>{parse(item?.subtitle)}</span></div>}
      <div className={s.itemDescription}>{parse(item?.description ?? '')}</div>
    </div>
  </div>
}
