
import { graphql, useStaticQuery } from "gatsby";
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React, { useRef } from "react";
import { useInViewport } from 'react-in-viewport';
import Slider from "react-slick";

import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./ImagesSlider.module.css";

const ImagesSlider = ({ block }) => {

  const { wp: { acfOptionsReviewImages: { reviewImagesSlider: { reviewImagesSlider } } } } = useStaticQuery(graphql`
    query ReviewImagesSliderQuery {
      wp {
        acfOptionsReviewImages {
          reviewImagesSlider {
            reviewImagesSlider {
              blockId
              bgColor
              bgImage {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              bgImageMobile {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              title
              titleColor
              slides {
                label
                image {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData(quality: 100)
                    }
                  }
                }
              }
              button {
                color
                hoverColor
                textColor
                link {
                  target
                  title
                  url
                }
              }
            }
          }
        }
      }
    }
  `)

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

  let data;
  if (true == block.useLocal) {
    data = block;
  } else {
    data = reviewImagesSlider;
  }

  let button = block?.button;
  if (!button?.link?.url) {
    button = data?.button;
  }

  const styles = {
    '--text-color': data?.titleColor,
    '--bg-color': data?.bgColor,
  };


  const sliderSettings = {
    className: 'bottom-arrows',
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
    ],
  };

  let bgImage = {
    data: data?.bgImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: data?.bgImage?.altText || ``,
  }

  let bgImageMobile = {
    data: data?.bgImageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: data?.bgImageMobile?.altText || ``,
  }

  return (
    <>
      <div className={`${s.block}`} id={data?.blockId} style={styles} ref={blockRef}>
        {enterCount > 0 && <>
          {(true == bp?.lg && !!bgImage.data) && <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={s.bg}
            image={bgImage.data}
            alt={bgImage.alt} />}
          {(false == bp?.lg && !!bgImageMobile.data) && <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={s.bg}
            image={bgImageMobile.data}
            alt={bgImageMobile.alt} />}

          <div className="container position-relative">
            <div className="row">
              <div className='col-12'>
                {!!data?.title && <h2 className={s.title}>{parse(data?.title)}</h2>}
              </div>
            </div>
          </div>

          <div className={`container-fluid px-0 position-relative`}>
            {data?.slides?.length > 0 && <Slider {...sliderSettings}>
              {data?.slides?.map((item, i) => {
                let image = {
                  data: item?.image?.localFile?.childImageSharp?.gatsbyImageData,
                  alt: item?.image?.altText || ``,
                }
                if (!!image?.data) {
                  return <div key={i} className='px-3 px-md-2 d-flex flex-column align-items-center justify-content-center'>
                    <GatsbyImage
                      loading="eager"
                      placeholder="dominantColor"
                      className={`mw-100`}
                      image={image.data}
                      alt={image.alt} />
                    {!!item?.label && <div className={s.slideLabel}>{parse(item?.label)}</div>}
                  </div>
                }
                return null;
              })}
            </Slider>}
            <div className='d-flex justify-content-center'>
              <ButtonCta block={button} />
            </div>
          </div>
        </>}
      </div>
    </>
  );
};

export default ImagesSlider;


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