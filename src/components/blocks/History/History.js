import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";

import * as s from "./History.module.css";

const History = ({ block }) => {
  const bp = useBreakpoint();

  const styles = {
    '--title-color': block?.titleColor,
    '--bg-color': block?.bgColor,
    '--dots-gradient': block?.itemDotsGradient,
  };


  let topImageDesktop = {
    data: block?.topImageDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.topImageDesktop?.altText || ``,
  }

  let topImageMobile = {
    data: block?.topImageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.topImageMobile?.altText || ``,
  }

  let linesImage = {
    data: block?.linesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.linesImage?.altText || ``,
  }

  return (
    <>
      <div className={`${s.block}`} id={block?.blockId} style={styles}>

        {(true == bp?.lg && !!topImageDesktop.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          className={'mw-100'}
          style={{ marginBottom: '-2px' }}
          image={topImageDesktop.data}
          alt={topImageDesktop.alt} />}
        {(false == bp?.lg && !!topImageMobile.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          className={'mw-100'}
          style={{ marginBottom: '-2px' }}
          image={topImageMobile.data}
          alt={topImageMobile.alt} />}
        <div className={s.wrapper}>
          {(true == bp?.lg && !!linesImage.data) && <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={s.lines}
            image={linesImage.data}
            alt={linesImage.alt} />}
          <div className="container position-relative">
            <div className="row justify-content-center">
              <div className='col-12'>
                {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
              </div>
              <div className='col-12 col-xxl-10'>
                {block?.items?.length > 0 && <div className={s.itemsWrapper}>
                  {block?.items?.map((item, i) => {
                    return <Item key={i} item={item} />
                  })}
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;

const Item = ({ item }) => {
  const bp = useBreakpoint();

  let icon = {
    src: item?.icon?.localFile?.publicURL,
    height: item?.icon?.height,
    alt: item?.icon?.altText || ``,
  }

  let iconStyles = {};
  if (!!icon?.height) {
    iconStyles.marginTop = `-${icon?.height}px`
  }

  return <>
    <div className={s.item} >
      <div className='d-flex flex-column'>
        {(true == bp?.lg && !!icon?.src) && <div style={iconStyles}>
          <img src={icon?.src} alt={icon.alt} className={'mw-100'} />
        </div>}
        <div className={s.itemYear}>
          {parse(item.year)}
          <div className={s.itemLine}>
            <div className={s.whiteDot}></div>
            <div className={s.coloredDot}></div>
          </div>
        </div>
        {!!item.title && <div className={s.itemTitle}>{parse(item.title)}</div>}
        {!!item.text && <div className={s.itemText}>{parse(item.text)}</div>}
      </div>
    </div>
    <div className={s.space}></div>
  </>
}

