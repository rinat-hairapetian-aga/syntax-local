
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";

import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./FooterBanner.module.css";

const FooterBanner = ({ block }) => {
  const bp = useBreakpoint();


  const bgImage = {
    data: block.bgImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgImage?.altText || ``,
  };

  const blockStyles = {
    '--bg-color': block?.bgColor,
    '--title-color': block?.titleColor,
  }
  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} style={blockStyles}>
        {(true == bp.md && !!bgImage?.data) &&
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={s.bg}
            image={bgImage.data}
            alt={bgImage.alt} />
        }
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-12">
              {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
              {!!block?.description && <div className={s.description}>{parse(block?.description)}</div>}
            </div>
            <div className="col-lg-12">
              <div className='d-flex justify-content-center'>
                {!!block?.button
                  ? <ButtonCta block={block?.button} />
                  : <ButtonCta block={{
                    color: '#FFF',
                    hoverColor: '#00B3FF',
                    textColor: '#040D1D',
                    link: block?.link,
                  }} />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterBanner;
