import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";

import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./WhySyntax.module.css";

const WhySyntax = ({ block }) => {
  const bp = useBreakpoint();

  let leftLinesImage = {
    data: block?.leftLinesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.leftLinesImage?.altText || ``,
  }

  let rightLinesImage = {
    data: block?.rightLinesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.rightLinesImage?.altText || ``,
  }

  const styles = {
    '--bg-color': block?.bgColor,
  }

  return (
    <>
      <div className={`${s.block}`} id={block?.blockId} style={styles}>
        {(true == bp?.lg && !!leftLinesImage.data) && <GatsbyImage
          loading="lazy"
          placeholder="dominantColor"
          className={s.leftLine}
          image={leftLinesImage.data}
          alt={leftLinesImage.alt} />}
        {(true == bp?.lg && !!rightLinesImage.data) && <GatsbyImage
          loading="lazy"
          placeholder="dominantColor"
          className={s.rightLine}
          image={rightLinesImage.data}
          alt={rightLinesImage.alt} />}
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className='col-12'>
              {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
              {!!block?.subtitle && <div className={s.subtitle}>{parse(block?.subtitle)}</div>}
            </div>
            <div className='col-12 col-lg-11'>
              {block?.items?.length > 0 && <div className={s.itemsWrapper}>
                {block?.items?.map((item, i) => {
                  return <Item key={i} item={item} isEven={i % 2} />
                })}
              </div>}
            </div>
            {!!block?.button?.link?.url && <div className='col-12 d-flex justify-content-center mt-5 pt-lg-5'>
              <ButtonCta block={block?.button} />
            </div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default WhySyntax;

const Item = ({ item, isEven }) => {

  let image = {
    data: item?.image?.localFile?.childImageSharp?.gatsbyImageData,
    alt: item?.image?.altText || ``,
  }

  return <>
    <div className={s.item} >
      <div className='row justify-content-around align-items-center' style={{ rowGap: '30px' }}>
        <div className={`${isEven && 'order-lg-2'} col-lg-6 col-xxl-5`}>
          {!!image?.data &&
            <GatsbyImage
              loading="lazy"
              placeholder="dominantColor"
              className={'mw-100'}
              image={image.data}
              alt={image.alt} />}
        </div>
        <div className={`${isEven && 'order-lg-1'} col-lg-6 col-xxl-5`}>
          {item?.content?.length > 0 && <div className={s.contentItemsWrapper}>
            {item?.content?.map((c, i) => {
              return <div className={s.contentItem} key={i}>
                {!!c.title && <div className={s.contentItemTitle}>{parse(c.title)}</div>}
                {!!c.text && <div className={s.contentItemText}>{parse(c.text)}</div>}
              </div>
            })}
          </div>}
        </div>
      </div>
    </div>
  </>
}

