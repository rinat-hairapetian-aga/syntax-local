import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import Slider from "react-slick";
import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./IndustryInsights.module.css";

const IndustryInsights = ({ block }) => {
  const bp = useBreakpoint();

  let blockStyles = {
    '--bg-color': block?.backgroundColor,
  };


  const sliderSettings = {
    className: 'mobile-dots mx-lg-3',
    infinite: true,
    swipeToSlide: true,
    lazyLoad: false,
    autoplay: false,
    centerMode: false,
    slidesToShow: 1,
    variableWidth: false,
    dots: true,
    arrows: false,
    dotsClass: 'slick-dots dark'
  };

  return (
    <>
      <section className={`${s.block}`} style={blockStyles} id={block?.blockId}>

        <div className={s.wrapper}>
          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row justify-content-center">
              <div className={`col-lg-12`}>
                {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
              </div>
              <div className={`col-lg-12 col-xxl-10 px-0`}>
                {block?.items?.length > 0 && <>
                  {true == bp?.lg && <div className='row justify-content-center' style={{ rowGap: '25px' }}>
                    {block?.items?.map((item, i) => {
                      return <div className='col-lg-4' key={i} ><Item item={item} /></div>
                    })}
                  </div>}
                  {false == bp?.lg && <Slider {...sliderSettings}>
                    {block?.items?.map((item, i) => {
                      return <div key={i} className='h-100 px-2'><Item item={item} /></div>
                    })}
                  </Slider>}
                </>
                }
              </div>
              <div className="col-lg-12 pt-4 pt-lg-5 d-flex justify-content-center">
                <ButtonCta block={block?.button} className={``} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IndustryInsights;

const Item = ({ item }) => {
  const image = {
    data: item.image?.localFile?.childImageSharp?.gatsbyImageData,
    alt: item.image?.altText || ``,
  };
  return <div className={s.item}>
    <div className='d-flex justify-content-center'>
      {(!!image?.data) && <GatsbyImage
        loading="eager"
        placeholder="dominantColor"
        className={'mw-100'}
        image={image.data}
        alt={image.alt} />}
    </div>
    <div className={s.info}>
      <div className={s.itemTitle}>{parse(item?.title ?? '')}</div>
      <div className={s.itemDescription}>{parse(item?.description ?? '')}</div>
    </div>
  </div>
}
