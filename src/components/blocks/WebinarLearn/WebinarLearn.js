import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import Slider from "react-slick";
import { isDark } from '../../../utils/brightness';
import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./WebinarLearn.module.css";

const WebinarLearn = ({ block }) => {
  const bp = useBreakpoint();

  const topBorderDesktop = {
    data: block.topBorderDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.topBorderDesktop?.altText || ``,
  };

  const topBorderMobile = {
    data: block.topBorderMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.topBorderMobile?.altText || ``,
  };

  const linesImage = {
    data: block.linesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImage?.altText || ``,
  };


  const imageDesktop = {
    data: block.imageDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.imageDesktop?.altText || ``,
  };

  const imageMobile = {
    data: block.imageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.imageMobile?.altText || ``,
  };

  const styles = {
    '--bg-color': block?.bgColor,
    '--title-color': block?.titleColor,
  }

  const sliderSettings = {
    className: 'mobile-dots mx-lg-3',
    dots: true,
    arrows: false,
    infinite: true,
    swipeToSlide: true,
    lazyLoad: false,
    autoplay: false,
    centerMode: false,
    variableWidth: false,
    slidesToShow: 2,
    dotsClass: `slick-dots ${!isDark(styles['--bg-color'], 128) ? 'dark' : ''}`,
    responsive: [
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} style={styles}>
        {(true == bp.md && !!topBorderDesktop?.data) &&
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={'mw-100'}
            style={{ marginBottom: '-2px' }}
            image={topBorderDesktop.data}
            alt={topBorderDesktop.alt} />
        }
        {(false == bp.md && !!topBorderMobile?.data) &&
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={'mw-100'}
            style={{ marginBottom: '-2px' }}
            image={topBorderMobile.data}
            alt={topBorderMobile.alt} />
        }
        <div className={s.wrapper}>
          {(true == bp.lg && !!linesImage?.data) &&
            <GatsbyImage
              loading="eager"
              placeholder="dominantColor"
              className={s.lines}
              style={{ left: 0 }}
              image={linesImage.data}
              alt={linesImage.alt} />
          }
          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row justify-content-center">
              <div className={`col-lg-12`}>
                {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
              </div>
              {false == bp?.lg && <div className='col-12 mb-3'>
                {block?.items?.length > 0 && <Slider {...sliderSettings}>
                  {block?.items?.map((item, i) => {
                    return <div key={i} className='px-1 h-100'><Item item={item} /></div>
                  })}
                </Slider>}
              </div>}
              <div className={`col-12 col-lg-4`}>
                <div className={`${s.imageWrapper}`}>
                  {(true == bp.md && !!imageDesktop?.data) &&
                    <GatsbyImage
                      loading="eager"
                      placeholder="dominantColor"
                      className={'mw-100'}
                      image={imageDesktop.data}
                      alt={imageDesktop.alt} />
                  }
                  {(false == bp.md && !!imageMobile?.data) &&
                    <GatsbyImage
                      loading="eager"
                      placeholder="dominantColor"
                      className={'mw-100'}
                      image={imageMobile.data}
                      alt={imageMobile.alt} />
                  }
                </div>
              </div>
              {true == bp?.lg && <div className=' col-lg-8 col-xxl-7 position-relative'>
                {block?.items?.length > 0 && <div className={s.itemsWrapperOut}>
                  <div className={s.itemsWrapper}>
                    {block?.items?.map((item, i) => {
                      return <Item item={item} key={i} />
                    })}
                  </div>
                </div>}
                <div className={s.bottomOverlay}></div>
              </div>}
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

export default WebinarLearn;

const Item = ({ item }) => {
  const bp = useBreakpoint();

  const icon = {
    data: item.icon?.localFile?.childImageSharp?.gatsbyImageData,
    alt: item.icon?.altText || ``,
  };


  return <div className={s.item}>
    <div className={s.itemIcon}>
      {(!!icon?.data) && <GatsbyImage
        loading="eager"
        placeholder="dominantColor"
        className={'mw-100'}
        image={icon.data}
        alt={icon.alt} />}
    </div>
    <div className={s.info}>
      <div className={s.itemTitle}>{parse(item?.title ?? '')}</div>
      {!!item?.description && <div className={s.itemDescription}>{parse(item?.description ?? '')}</div>}
    </div>
  </div>
}
