import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import { Helmet } from 'react-helmet';
import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./HeroAlt.module.css";

const HeroAlt = ({ block }) => {
  const bp = useBreakpoint();

  const bgImage = {
    data: block.bgImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgImage?.altText || ``,
  };
  const bgImageMobile = {
    data: block.bgImageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgImageMobile?.altText || ``,
  };

  let blockStyles = {
    '--bg-color': block?.backgroundColor,
    '--text-color': block?.textColor,
  };

  let links = [];
  if (!!bgImage?.data) {
    links.push({
      rel: 'preload',
      as: 'image',
      media: "(min-width: 992px)",
      fetchpriority: "high",
      href: bgImage?.data?.images?.fallback?.src,
      imagesrcset: bgImage?.data?.images?.sources[0]?.srcSet,
    });
  }
  if (!!bgImageMobile?.data) {
    links.push({
      rel: 'preload',
      as: 'image',
      media: "(max-width: 992px)",
      fetchpriority: "high",
      href: bgImageMobile?.data?.images?.fallback?.src,
      imagesrcset: bgImageMobile?.data?.images?.sources[0]?.srcSet,
    });
  }

  return (
    <>
      {links?.length > 0 && <Helmet link={[].concat(links)} />}
      <section className={`${s.block}`} style={blockStyles} id={block?.blockId}>
        <div className='d-none d-md-block'>
          {(false != bp?.md && bgImage?.data) && <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={`hero-image ${s.bg}`}
            image={bgImage.data}
            alt={bgImage.alt} />}
        </div>
        <div className='d-md-none'>
          {(true != bp?.md && bgImageMobile?.data) && <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={`hero-image ${s.bg}`}
            image={bgImageMobile.data}
            alt={bgImageMobile.alt} />}
        </div>
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className={`col-12 col-xl-10 col-xxl-8`}>
              <h1 className={s.title}>{parse(block?.title)}</h1>
              {!!block?.subtitle && <div className={`${s.subtitle}`}>{parse(block?.subtitle)}</div>}
              {!!block?.button?.link?.url && <div className='d-flex justify-content-center mt-5'>
                <ButtonCta block={block?.button} />
              </div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroAlt;
