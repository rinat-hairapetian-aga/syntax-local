import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React, { useRef } from "react";
import { useInViewport } from 'react-in-viewport';

import * as s from "./JobHelp.module.css";
import ButtonCta from '../../buttonCta/buttonCta';

const JobHelp = ({ block }) => {
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

  const topBorder = {
    data: block.topBorder?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.topBorder?.altText || ``,
  };

  const image = {
    data: block.image?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.image?.altText || ``,
  };

  let blockStyles = {
    '--bg-color': block?.blockBgColor,
    '--title-color': block?.titleColor,
    '--items-color': block?.itemsColor,
    '--card-bg-color': block?.cardBgColor,
  };

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} style={blockStyles} ref={blockRef}>
        {(true == bp.md && !!topBorder?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          style={{ marginBottom: '-2px' }}
          objectFit='fill'
          className={`w-100`}
          image={topBorder.data}
          alt={topBorder.alt} />}
        <div className={s.wrapper} >
          {enterCount > 0 && <>
            <div className="container position-relative">
              <div className="row">
                <div className="col-12">
                  {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
                  {!!block?.subtitle && <div className={s.subtitle}>{parse(block?.subtitle)}</div>}
                </div>
                <div className="col-12">
                  <div className={s.content}>
                    {(true == bp.lg && !!image?.data) && <GatsbyImage
                      loading="eager"
                      placeholder="dominantColor"
                      className={`mw-100`}
                      image={image.data}
                      alt={image.alt} />}
                    {block?.items?.length > 0 && <div className={s.stepsWraper}>
                      {block?.items?.map((item, i) => {
                        return <div className={s.step} key={i}>
                          <div className={s.titleWrapper}>
                            <div className={s.number}>{parse(item.stepLabel ?? '')}</div>
                            <div className={s.value}>{parse(item.title ?? '')}</div>
                          </div>
                          <div className={s.description}>{parse(item?.description ?? '')}</div>
                        </div>
                      })}
                    </div>}
                  </div>
                  {!!block?.button?.link?.url && <div className='d-flex justify-content-center mt-3'>
                    <ButtonCta block={block?.button} />
                  </div>}
                </div>
              </div>
            </div>
          </>}
        </div>
      </section>
    </>
  );
};

export default JobHelp;
