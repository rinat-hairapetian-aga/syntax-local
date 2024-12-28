
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import Slider from "react-slick";
import React from "react";

import * as s from "./AboutCareer.module.css";

const AboutCareer = ({ block }) => {
  const bp = useBreakpoint();

  const lines = {
    data: block.lines?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.lines?.altText || ``,
  };

  const imageDesktop = {
    data: block.imageDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.imageDesktop?.altText || ``,
  };

  const imageMobile = {
    data: block.imageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.imageMobile?.altText || ``,
  };

  const sliderSettings = {
    className: 'mobile-dots',
    dots: true,
    arrows: false,
    infinite: true,
    swipeToSlide: true,
    lazyLoad: false,
    autoplay: false,
    centerMode: false,
    dotsClass: 'slick-dots dark',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1.5,
          dots: true,
          arrows: false,
          variableWidth: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
          variableWidth: false,
        },
      },
    ],
  };


  return (
    <>
      <section className={`${s.block}`} id={block?.blockId}>
        {(true == bp.lg && !!lines?.data) &&
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={s.lines}
            image={lines.data}
            alt={lines.alt} />
        }
        <div className="container position-relative">
          <div className="row align-items-center">
            {(true == bp.md && !!imageDesktop?.data) && <>
              <div className="col-lg-6 col-xxl-6">
                <div className="d-flex justify-content-center justify-content-lg-start mb-4 mb-lg-0">
                  <GatsbyImage
                    loading="eager"
                    placeholder="dominantColor"
                    className={`mw-100`}
                    image={imageDesktop.data}
                    alt={imageDesktop.alt} />
                </div>
              </div>
              {(true == bp.lg && block?.contentItems?.length > 0) &&
                <div className="col-lg-6 col-xxl-5 offset-xxl-1">
                  <div className='h-100 d-flex flex-column' style={{ gap: '28px' }}>
                    {block?.contentItems?.map((item, i) => {
                      return <Item item={item} key={i} />
                    })}
                  </div>
                </div>
              }
            </>}
          </div>
        </div>
        {(false == bp.lg && block?.contentItems?.length > 0) &&
          <Slider {...sliderSettings}>
            {block?.contentItems?.map((item, i) => {
              return <Item item={item} key={i} />
            })}
          </Slider>
        }
        {(false == bp.md && !!imageMobile?.data) &&
          <div className="d-flex justify-content-center">
            <GatsbyImage
              loading="eager"
              placeholder="dominantColor"
              className={`mw-100`}
              image={imageMobile.data}
              alt={imageMobile.alt} />
          </div>
        }

      </section>
    </>
  );
};

export default AboutCareer;

const Item = ({ item }) => {
  return <div className={s.item}>
    {!!item?.title && <div className={s.title}>{parse(item?.title)}</div>}
    {!!item?.content && <div className={s.content}>{parse(item?.content)}</div>}
  </div>
}