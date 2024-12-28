import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import * as s from "./SyntaxInNumbers.module.css";

const SyntaxInNumbers = ({ block }) => {
  const bp = useBreakpoint();

  const linesImageLeft = {
    data: block.linesImageLeft?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImageLeft?.altText || ``,
  };

  const linesImageRight = {
    data: block.linesImageRight?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImageRight?.altText || ``,
  };

  const imageDesktop = {
    data: block.imageDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.imageDesktop?.altText || ``,
  };

  const imageMobile = {
    data: block.imageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.imageMobile?.altText || ``,
  };

  const bottomImageDesktop = {
    data: block.bottomImageDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottomImageDesktop?.altText || ``,
  };

  const bottomImageMobile = {
    data: block.bottomImageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottomImageMobile?.altText || ``,
  };

  let blockStyles = {
    '--bg-color': block?.bgColor,
    '--text-color': block?.textColor,
  };

  return (
    <>
      <section className={`${s.block}`} style={blockStyles} id={block?.blockId}>
        {(true == bp?.md && linesImageLeft?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          className={s.lines}
          style={{ left: 0 }}
          image={linesImageLeft.data}
          alt={linesImageLeft.alt} />}
        {(true == bp?.md && linesImageRight?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          className={s.lines}
          style={{ right: 0 }}
          image={linesImageRight.data}
          alt={linesImageRight.alt} />}
        <div className={s.wrapper}>
          <div className="container position-relative">
            <div className='row justify-content-center'>
              <div className='col-12 col-md-11 col-xl-10 col-xxl-8'>
                <div className="row justify-content-center">
                  <div className={`col-12`}>
                    <h2 className={s.title}>{parse(block?.title)}</h2>
                    {!!block?.description && <div className={`${s.description}`}>{parse(block?.description)}</div>}
                  </div>
                  <div className={`col-12`}>
                    <div className={`d-flex justify-content-center`}>
                      {(true == bp?.md && imageDesktop?.data) && <GatsbyImage
                        loading="eager"
                        placeholder="dominantColor"
                        className={`mw-100`}
                        image={imageDesktop.data}
                        alt={imageDesktop.alt} />}
                      {(false == bp?.md && imageMobile?.data) && <GatsbyImage
                        loading="eager"
                        placeholder="dominantColor"
                        className={`mw-100`}
                        image={imageMobile.data}
                        alt={imageMobile.alt} />}
                    </div>
                  </div>
                  {block?.stats?.length > 0 && <div className="col-12">
                    <div className={s.statsWrapper}>
                      {block?.stats?.map((st, i) => {
                        return <div key={i} className={s.stat}>
                          <div className={s.statValue}>{parse(st.value)}</div>
                          <div className={s.statLabel}>{parse(st.title)}</div>
                        </div>
                      })}
                    </div>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
        {(true == bp?.md && bottomImageDesktop?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          objectFit='fill'
          className={'w-100'}
          style={{ marginTop: '-2px' }}
          image={bottomImageDesktop.data}
          alt={bottomImageDesktop.alt} />}
        {(false == bp?.md && bottomImageMobile?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          objectFit='fill'
          className={'w-100'}
          style={{ marginTop: '-2px' }}
          image={bottomImageMobile.data}
          alt={bottomImageMobile.alt} />}
      </section>
    </>
  );
};

export default SyntaxInNumbers;
