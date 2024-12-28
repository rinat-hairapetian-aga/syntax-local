import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import Slider from "react-slick";
import { isDark } from '../../../utils/brightness';
import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./GradsInfo.module.css";

const GradsInfo = ({ block }) => {
  const bp = useBreakpoint();

  const topBorderDesktop = {
    data: block.topBorderDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.topBorderDesktop?.altText || ``,
  };

  const topBorderMobile = {
    data: block.topBorderMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.topBorderMobile?.altText || ``,
  };


  const image = {
    data: block.image?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.image?.altText || ``,
  };

  const imageMobile = {
    data: block.imageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.imageMobile?.altText || ``,
  };

  const styles = {
    '--bg-color': block?.bgColor,
    '--text-color': block?.textColor,
  }

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} style={styles}>
        {(true == bp.md && !!topBorderDesktop?.data) &&
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            objectFit='fill'
            className={'w-100'}
            style={{ marginBottom: '-2px' }}
            image={topBorderDesktop.data}
            alt={topBorderDesktop.alt} />
        }
        {(false == bp.md && !!topBorderMobile?.data) &&
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            objectFit='fill'
            className={'w-100'}
            style={{ marginBottom: '-2px' }}
            image={topBorderMobile.data}
            alt={topBorderMobile.alt} />
        }
        <div className={s.wrapper}>
          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row justify-content-center">
              <div className={`col-lg-12 text-center`}>
                {(false == bp.lg && !!imageMobile?.data) &&
                  <GatsbyImage
                    loading="eager"
                    placeholder="dominantColor"
                    className={'mw-100'}
                    image={imageMobile.data}
                    alt={imageMobile.alt} />
                }
                {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
              </div>
              {true == bp.lg && <div className={`col-12 col-lg-6 col-xxl-6`}>
                <div className={`${s.imageWrapper}`}>
                  {(!!image?.data) &&
                    <GatsbyImage
                      loading="eager"
                      placeholder="dominantColor"
                      className={'mw-100'}
                      image={image.data}
                      alt={image.alt} />
                  }
                </div>
              </div>}
              {<div className='col-lg-6 col-xxl-5 position-relative'>
                {block?.rightContent?.length > 0 && <div className={s.itemsWrapper}>
                  {block?.rightContent?.map((item, i) => {
                    return <Item item={item} key={i} />
                  })}
                </div>}
              </div>}
              <div className="col-lg-12 pt-4 mt-2 mt-lg-0 pt-lg-5 d-flex justify-content-center">
                <ButtonCta block={block?.button} className={``} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GradsInfo;

const Item = ({ item }) => {
  return <div className={s.item}>
    <div className={s.info}>
      <div className={s.itemTitle}>{parse(item?.title ?? '')}</div>
      {!!item?.description && <div className={s.itemDescription}>{parse(item?.description ?? '')}</div>}
    </div>
  </div>
}
