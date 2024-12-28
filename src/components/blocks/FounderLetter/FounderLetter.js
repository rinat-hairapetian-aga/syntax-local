import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";

import * as s from "./FounderLetter.module.css";

const FounderLetter = ({ block }) => {
  const bp = useBreakpoint();


  let bgImageDesktop = {
    data: block?.bgImageDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.bgImageDesktop?.altText || ``,
  }

  let bgImageMobile = {
    data: block?.bgImageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.bgImageMobile?.altText || ``,
  }

  let founderImage = {
    data: block?.founderImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.founderImage?.altText || ``,
  }

  let founderSignImage = {
    data: block?.founderSignImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.founderSignImage?.altText || ``,
  }



  return (
    <>
      <div className={`${s.block}`} id={block?.blockId} >
        {(true == bp?.md && !!bgImageDesktop.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          className={s.bg}
          image={bgImageDesktop.data}
          alt={bgImageDesktop.alt} />}
        {(false == bp?.md && !!bgImageMobile.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          className={s.bg}
          image={bgImageMobile.data}
          alt={bgImageMobile.alt} />}

        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className='col-12 col-lg-9'>
              <div className={s.wrapper}>
                <div className="row mb-3 pb-1 mb-lg-4 align-items-center">
                  {!!founderImage?.data && <div className='col-6 col-lg-3'>
                    <GatsbyImage
                      loading="eager"
                      placeholder="dominantColor"
                      className={`mw-100`}
                      image={founderImage.data}
                      alt={founderImage.alt} />
                  </div>}
                  <div className='col-12 col-lg-9'>
                    <h2 className={s.title}>{parse(block?.title)}</h2>
                  </div>
                </div>
                {!!block?.letterText && <div className={s.content}>{parse(block?.letterText)}</div>}
                {!!founderSignImage?.data && <div className='d-flex justify-content-center justify-content-lg-end mt-3 pt-lg-1 mt-lg-4'>
                  <GatsbyImage
                    loading="eager"
                    placeholder="dominantColor"
                    className={`mw-100`}
                    image={founderSignImage.data}
                    alt={founderSignImage.alt} />
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FounderLetter;


const NextArrow = (props) => {
  const { className, style, onClick, styles } = props;
  return (
    <button
      className={`${className} custom-button`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="37" height="8" viewBox="0 0 37 8" fill="none">
        <path d="M36.5816 4.66069C36.7768 4.46542 36.7768 4.14884 36.5816 3.95358L33.3996 0.771598C33.2043 0.576336 32.8878 0.576336 32.6925 0.771598C32.4972 0.96686 32.4972 1.28344 32.6925 1.4787L35.5209 4.30713L32.6925 7.13556C32.4972 7.33082 32.4972 7.6474 32.6925 7.84267C32.8878 8.03793 33.2043 8.03793 33.3996 7.84267L36.5816 4.66069ZM0.228027 4.80713L36.228 4.80713L36.228 3.80713L0.228027 3.80713L0.228027 4.80713Z" fill={styles['--text-color']} />
      </svg>
    </button>
  );
}

const PrevArrow = (props) => {
  const { className, style, onClick, styles } = props;
  return (
    <button
      className={`${className} custom-button`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="8" viewBox="0 0 38 8" fill="none">
        <path d="M0.874474 4.66069C0.679211 4.46542 0.679211 4.14884 0.874474 3.95358L4.05645 0.771598C4.25172 0.576336 4.5683 0.576336 4.76356 0.771598C4.95882 0.96686 4.95882 1.28344 4.76356 1.4787L1.93513 4.30713L4.76356 7.13556C4.95882 7.33082 4.95882 7.6474 4.76356 7.84267C4.5683 8.03793 4.25172 8.03793 4.05645 7.84267L0.874474 4.66069ZM37.228 4.80713L1.22803 4.80713L1.22803 3.80713L37.228 3.80713L37.228 4.80713Z" fill={styles['--text-color']} />
      </svg>
    </button>
  );
}