import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React, { useRef } from "react";
import { useInViewport } from 'react-in-viewport';
import Slider from "react-slick";

import * as s from "./GallerySlider.module.css";

const GallerySlider = ({ block }) => {
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

  const styles = {
    '--text-color': block?.titleColor,
    '--bg-color': block?.bgColor,
  };


  const sliderSettings = {
    className: `bottom-arrows ${s.slider}`,
    dots: false,
    arrows: true,
    nextArrow: <NextArrow styles={styles} />,
    prevArrow: <PrevArrow styles={styles} />,
    infinite: true,
    swipeToSlide: true,
    lazyLoad: false,
    autoplay: false,
    centerMode: true,
    centerPadding: '150px',
    // variableWidth: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: '0',
        },
      },
      {
        breakpoint: 991,
        settings: {
          centerMode: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          centerMode: false,
          slidesToShow: 2,
        },
      },
    ],
  };

  let topBorderDesktop = {
    data: block?.topBorderDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.topBorderDesktop?.altText || ``,
  }

  let topBorderMobile = {
    data: block?.topBorderMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.topBorderMobile?.altText || ``,
  }

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} style={styles} ref={blockRef}>
        {(true == bp?.lg && !!topBorderDesktop.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          className={'mw-100'}
          style={{ marginBottom: '-2px' }}
          image={topBorderDesktop.data}
          alt={topBorderDesktop.alt} />}
        {(false == bp?.lg && !!topBorderMobile.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          className={'mw-100'}
          style={{ marginBottom: '-2px' }}
          image={topBorderMobile.data}
          alt={topBorderMobile.alt} />}

        <div className={s.wrapper}>
          {enterCount > 0 && <>
            <div className="container position-relative">
              <div className="row">
                <div className='col-12'>
                  {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
                </div>
              </div>
            </div>
            <div className={`container-fluid px-0 position-relative`}>
              {block?.images?.length > 0 && <Slider {...sliderSettings}>
                {block?.images?.map((item, i) => {
                  let image = {
                    data: item?.localFile?.childImageSharp?.gatsbyImageData,
                    src: item?.localFile?.publicURL,
                    alt: item?.altText || ``,
                  }
                  if (!!image?.src) {
                    return <div key={i} className='px-2 d-flex flex-column align-items-center justify-content-center'>
                      <img src={image.src} alt={image.alt} className={'mw-100'} />
                    </div>
                  }
                  return null;
                })}
              </Slider>}
            </div>
          </>}
        </div>

      </section>
    </>
  );
};

export default GallerySlider;


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