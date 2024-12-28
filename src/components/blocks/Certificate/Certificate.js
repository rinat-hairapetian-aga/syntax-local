
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";

import * as s from "./Certificate.module.css";

const Certificate = ({ block }) => {
  const bp = useBreakpoint();

  const image = {
    data: block.image?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.image?.altText || ``,
  };

  const imageMobile = {
    data: block.imageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.imageMobile?.altText || ``,
  };

  const blockStyles = {
    '--bg-color': block?.blockBgColor,
  }

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} style={blockStyles}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
            </div>
            <div className="col-lg-12 col-xl-11 col-xxl-10">
              {(true == bp.lg && !!image?.data) &&
                <GatsbyImage
                  loading="eager"
                  placeholder="dominantColor"
                  className={`mw-100`}
                  image={image.data}
                  alt={image.alt} />
              }
              {(false == bp.lg && !!imageMobile?.data) &&
                <GatsbyImage
                  loading="eager"
                  placeholder="dominantColor"
                  className={`mw-100`}
                  image={imageMobile.data}
                  alt={imageMobile.alt} />
              }
            </div>


          </div>
        </div>
      </section>
    </>
  );
};

export default Certificate;
