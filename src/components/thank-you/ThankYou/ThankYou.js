
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React, { useState } from "react";

import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./ThankYou.module.css";

const ThankYou = ({ block }) => {
  const bp = useBreakpoint();

  const bgDesktop = {
    data: block.bgDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgDesktop?.altText || ``,
  };
  const bgMobile = {
    data: block.bgMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgMobile?.altText || ``,
  };


  return (
    <>
      <section className={`${s.block}`}>
        <div className='d-none d-lg-block'>
          {(false != bp?.lg && bgDesktop?.data) && <GatsbyImage
            loading="eager"
            objectFit='fill'
            placeholder="dominantColor"
            className={`${s.bg}`}
            image={bgDesktop.data}
            alt={bgDesktop.alt} />}
        </div>
        <div className='d-block d-lg-none'>
          {(true != bp?.lg && bgMobile?.data) && <GatsbyImage
            loading="eager"
            objectFit='fill'
            placeholder="dominantColor"
            className={`${s.bg}`}
            image={bgMobile.data}
            alt={bgMobile.alt} />}
        </div>
        <div className="container position-relative">
          <div className='row'>
            <div className='col-12'>
              <div className={s.content}>
                <h1 className={s.title}>{parse(block?.title)}</h1>
                <div className={s.subtitle}>{parse(block?.subtitle)}</div>
                <div className={s.description}>{parse(block?.description)}</div>
              </div>
            </div>
          </div>
          {block?.buttons?.length > 0 && <div className='d-flex flex-lg-wrap flex-column flex-lg-row justify-content-center' style={{ gap: '24px' }}>
            {block?.buttons?.map((button, i) => {
              if (!button?.link?.url) {
                return null;
              }
              return <ButtonCta block={button} key={i}></ButtonCta>
            })}
          </div>}
        </div>
      </section>
    </>
  );
};

export default ThankYou;
