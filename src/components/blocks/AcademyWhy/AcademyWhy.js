
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import parse from "html-react-parser";
import React, { useRef, useState } from "react";
import { useInViewport } from 'react-in-viewport';

import * as s from "./AcademyWhy.module.css";
import ButtonCta from '../../buttonCta/buttonCta';
import { GatsbyImage } from 'gatsby-plugin-image';

const AcademyWhy = ({ block }) => {
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
  const linesImage = {
    data: block.linesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImage?.altText || ``,
  };

  const blockStyles = {
    '--bg-color': block?.bgColor,
    '--title-color': block?.titleColor,
  }

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} ref={blockRef} style={blockStyles}>
        {(true == bp?.lg && !!linesImage?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          className={s.lines}
          image={linesImage.data}
          alt={linesImage.alt} />}
        {enterCount > 0 && <>
          <div className={s.wrapper}>
            <div className="container position-relative">
              <div className="row">
                <div className="col-12">
                  {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
                </div>
              </div>
              <div className="row justify-content-center" style={{ rowGap: '16px' }}>
                {block?.items?.length > 0 && <>
                  {block?.items?.map((item, i) => {
                    let img = {
                      src: item?.image?.localFile?.publicURL,
                      alt: item?.image?.altText || ``,
                    }
                    return <div className='col-12 col-lg-6 col-xxl-4' key={i}>
                      <div className={s.item}>
                        {!!img?.src && <img src={img?.src} alt={img?.alt} className='mb-3 mw-100' />}
                        <div className={s.itemInfo}>
                          {!!item?.title && <div className={s.itemTitle}>{parse(item?.title)}</div>}
                          {!!item?.description && <div className={s.itemDescription}>{parse(item?.description)}</div>}
                        </div>
                      </div>
                    </div>
                  })}
                </>}
              </div>
              <div className="row">
                {!!block?.button?.link?.url && <div className="col-12 d-flex justify-content-center mt-5 pt-lg-5">
                  <ButtonCta block={block?.button} />
                </div>}
              </div>
            </div>
          </div>
        </>}
      </section>
    </>
  );
};

export default AcademyWhy;
