

import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from "html-react-parser";
import React from "react";

import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./AcademyIcons.module.css";

const AcademyIcons = ({ block }) => {
  const bp = useBreakpoint();

  const linesImageLeft = {
    data: block.linesImageLeft?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImageLeft?.altText || ``,
  };

  const linesImageRight = {
    data: block.linesImageRight?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImageRight?.altText || ``,
  };
  const linesImageMobile = {
    data: block.linesImageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImageMobile?.altText || ``,
  };

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId}>
        {true == bp?.lg && <>
          {!!linesImageLeft?.data &&
            <GatsbyImage
              loading="eager"
              placeholder="dominantColor"
              className={s.lines}
              style={{ left: 0 }}
              image={linesImageLeft.data}
              alt={linesImageLeft.alt} />
          }
          {!!linesImageRight?.data &&
            <GatsbyImage
              loading="eager"
              placeholder="dominantColor"
              className={s.lines}
              style={{ right: 0 }}
              image={linesImageRight.data}
              alt={linesImageRight.alt} />
          }
        </>}
        {(false == bp?.lg && linesImageMobile?.data) &&
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={s.lines}
            image={linesImageMobile.data}
            alt={linesImageMobile.alt} />
        }
        <div className="container position-relative">
          <div className="row">
            {!!block?.title && <div className="col-12">
              <h2 className={s.title}>{parse(block?.title)}</h2>
            </div>}
            <div className="col-12">
              {(block?.icons?.length > 0) && <>
                <div className={s.logosWraper}>
                  {block?.icons?.map((l, i) => {
                    let logo = {
                      src: l?.localFile?.publicURL,
                      alt: l?.altText || ``,
                    }
                    if (!!logo?.src) {
                      return <div key={i} className={s.logoWrapper}>
                        <img width={80} height={80} className={`mw-100`} src={logo.src} alt={logo.alt} />
                      </div>
                    }
                    return null
                  })}
                </div>
              </>}
            </div>
            <div className={'col-12 d-flex justify-content-center'}>
              <ButtonCta block={block?.button} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AcademyIcons;
