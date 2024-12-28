

import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";

import ButtonCta from "../../buttonCta/buttonCta";
import * as s from "./HeroAcademy.module.css";

const HeroAcademy = ({ block }) => {
  const bp = useBreakpoint();

  const bgImageDesktop = {
    data: block.bgImageDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgImageDesktop?.altText || ``,
  };
  const bgImageMobile = {
    data: block.bgImageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgImageMobile?.altText || ``,
  };

  let blockStyles = {
    '--bg-color': block?.backgroundColor,
  };

  return (
    <>
      <section className={`${s.block}`} style={blockStyles} id={block?.blockId}>
        <div className='d-none d-lg-block'>
          {(false != bp?.lg && bgImageDesktop?.data) && <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={`hero-image ${s.bg}`}
            image={bgImageDesktop.data}
            alt={bgImageDesktop.alt} />}
        </div>
        <div className='d-lg-none'>
          {(true != bp?.lg && bgImageMobile?.data) && <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={`hero-image ${s.bg}`}
            image={bgImageMobile.data}
            alt={bgImageMobile.alt} />}
        </div>
        <div className="container position-relative">
          <div className="row h-100">
            <div className={`col-lg-6 col-xl-6 h-100`}>
              <div className={s.leftCol}>
                <div>
                  {!!block?.preTitle && <div className={`${s.preTitle}`}>{parse(block?.preTitle)}</div>}
                  <h1 className={s.title}>{parse(block?.title)}</h1>
                  {!!block?.nextBatchDate && <div className={`${s.date}`}>{parse(block?.nextBatchDate)}</div>}
                </div>
                <div className={s.buttonsWrapper}>
                  <ButtonCta block={block?.button} />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default HeroAcademy;
