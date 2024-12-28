import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from "html-react-parser";
import React, { useRef } from "react";
import { useInViewport } from 'react-in-viewport';

import * as s from "./CareerPath.module.css";

const CareerPath = ({ block, styles, useCentricTitle }) => {

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

  const blockStyles = {
    '--bg-color': !!block?.bgColor ? block?.bgColor : '#0B1B3B',
    '--main-color': !!block?.mainColor ? block?.mainColor : '#00B3FF',
    '--title-color': !!block?.titleColor ? block?.titleColor : '#ffffff',
    '--text-color': !!styles['--title-color'] ? styles['--title-color'] : '#ffffff',
    '--lines-left': 'left' == block?.itemsPosition ? 'unset' : 0,
    '--lines-right': 'right' == block?.itemsPosition ? 'unset' : 0,
  };

  let bgLinesImage = {
    data: block?.bgLinesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.bgLinesImage?.altText || ``,
  }


  let imageMobile = {
    data: block?.imageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.imageMobile?.altText || ``,
  }

  let mobileGraphImage = {
    data: block?.mobileGraphImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.mobileGraphImage?.altText || ``,
  }


  return (
    <>
      <section className={`${s.block} ${('left' == block?.itemsPosition && !!bp?.lg) ? s.reverse : ''}`} id={block?.blockId} style={blockStyles} ref={blockRef}>
        {enterCount > 0 && <>
          {(true == bp?.lg && !!bgLinesImage?.data) && <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={s.lines}
            image={bgLinesImage.data}
            alt={bgLinesImage.alt} />}

          {!!useCentricTitle
            ? <div className={`${s.centricTitle}`}>
              <div className="container position-relative">
                <h2>{parse(block?.title)}</h2>
              </div>
            </div>
            : <div className={`${s.title}`}>
              {true == bp?.lg && <>
                {'left' == block?.itemsPosition ? <RightTitleBgSvg fill={blockStyles['--main-color']} /> : <LeftTitleBgSvg fill={blockStyles['--main-color']} />}
              </>}
              {false == bp?.lg && <MobileTitleBgSvg fill={blockStyles['--main-color']} />}
              <div className="container position-relative">
                <div className='row'>
                  {!!block?.title &&
                    <div className={`col-lg-6 ${'left' == block?.itemsPosition && 'offset-lg-6'}`}>
                      <h2 className={` ${'left' == block?.itemsPosition && 'text-lg-end'}`}>{parse(block?.title)}</h2>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
          <div className="container position-relative">
            <div className='row'>
              {false == bp?.lg && <div className="col-12">
                <div className='d-flex flex-column align-items-center' style={{ rowGap: '13px' }}>
                  {(!!imageMobile?.data) &&
                    <GatsbyImage
                      loading="eager"
                      placeholder="dominantColor"
                      className={'mw-100'}
                      image={imageMobile.data}
                      alt={imageMobile.alt} />
                  }
                  {(!!mobileGraphImage?.data) &&
                    <GatsbyImage
                      loading="eager"
                      placeholder="dominantColor"
                      className={'mw-100'}
                      image={mobileGraphImage.data}
                      alt={mobileGraphImage.alt} />
                  }
                </div>
              </div>}
            </div>
            {true == bp?.lg ? <div className='row align-items-center'>
              {'left' == block?.itemsPosition && <>
                <ItemsColumn block={block} blockStyles={blockStyles} />
                <ImageColumn block={block} />
              </>}

              {'right' == block?.itemsPosition && <>
                <ImageColumn block={block} />
                <ItemsColumn block={block} blockStyles={blockStyles} />
              </>}
            </div>
              : <div className='row mt-4 pt-2'>
                <ItemsColumn block={block} blockStyles={blockStyles} />
              </div>}
          </div>
        </>}
      </section>
    </>
  );
};

export default CareerPath;


const ImageColumn = ({ block }) => {
  const bp = useBreakpoint();

  let imageDesktop = {
    data: block?.imageDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.imageDesktop?.altText || ``,
  }

  return <>
    <div className={`${s.imageCol} col-lg-5 col-xl-4`}>
      {(true == bp?.md && !!imageDesktop?.data) && <GatsbyImage
        loading="eager"
        placeholder="dominantColor"
        className={'mw-100'}
        image={imageDesktop.data}
        alt={imageDesktop.alt} />}
    </div>
  </>
}

const ItemsColumn = ({ block, blockStyles }) => {
  return <>
    <div className={`${s.itemsCol} col-lg-7 col-xl-8`}>
      {block?.items?.length > 0 && <div className={s.sectionItems}>
        {block?.items?.map((item, i) => {
          let position = calculateItemPosition(i, block?.items?.length);
          return <Item item={item} position={position} color={blockStyles['--main-color']} key={i} />
        })}
      </div>}
    </div>
  </>
}

const calculateItemPosition = (index, length) => {
  let center = (length - 1) / 2;
  if (index > center)
    return 'bottom';
  if (index == center)
    return 'center';
  return 'top';
}

const Item = ({ item, position, color }) => {
  const bp = useBreakpoint();
  return <>
    <div className={`${s.itemWrap} ${'center' == position && s.center} ${'bottom' == position && s.bottom}`}>
      {true == bp?.lg && <>
        {'top' == position && <TopLineSvg />}
        {'center' == position && <CenterLineSvg />}
        {'bottom' == position && <BottomLineSvg />}
      </>}
      <div className={s.itemWrapper}>
        {true == bp?.lg && <div className={s.before}></div>}
        <div className={s.background}>
          <ItemBgSvg stroke={color} />
          <div className={s.itemText}>
            {parse(item.name)}
          </div>
        </div>
      </div>
    </div >
  </>
}

const ItemBgSvg = ({ stroke }) => {
  return <svg width="327" className='left' height="50" viewBox="0 0 327 50" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 2C1 1.44772 1.44772 1 2 1H308.658C309.087 1 309.468 1.27342 309.606 1.6797L325.16 47.6797C325.379 48.328 324.897 49 324.212 49H2C1.44772 49 1 48.5523 1 48V2Z" stroke={`${!!stroke ? stroke : '#00B3FF'}`} strokeWidth="2"></path>
    <path d="M1 2C1 1.44772 1.44772 1 2 1H302.96C303.391 1 303.773 1.27604 303.909 1.68497L319.178 47.685C319.393 48.3323 318.911 49 318.229 49H2C1.44772 49 1 48.5523 1 48V2Z" stroke={`${!!stroke ? stroke : '#00B3FF'}`} strokeWidth="2"></path>
    <path d="M1 2C1 1.44772 1.44772 1 2 1H297.262C297.695 1 298.078 1.27861 298.213 1.6903L313.196 47.6903C313.406 48.3365 312.925 49 312.245 49H2C1.44772 49 1 48.5523 1 48V2Z" stroke={`${!!stroke ? stroke : '#00B3FF'}`} strokeWidth="2"></path>
  </svg>
}

const TopLineSvg = ({ stroke }) => {
  return <svg className={s.rowSvg} width="310" height="33" viewBox="0 0 310 33" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M310 0.999973L143.5 0.999987L60.5001 32L3.05176e-05 32" stroke={`${!!stroke ? stroke : '#00B3FF'}`} strokeWidth="2"></path>
  </svg>
}


const CenterLineSvg = ({ stroke }) => {
  return <svg className={s.rowSvg} width="310" height="2" viewBox="0 0 310 2" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M310 1.00024L0 1.00012" stroke={`${!!stroke ? stroke : '#00B3FF'}`} strokeWidth="2"></path>
  </svg>
}

const BottomLineSvg = ({ stroke }) => {
  return <svg className={s.rowSvg} width="310" height="34" viewBox="0 0 308 34" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M310 32.4999L142 32.4999L60.5001 1.00003L0 1.00026" stroke={`${!!stroke ? stroke : '#00B3FF'}`} strokeWidth="2"></path>
  </svg>
}


const LeftTitleBgSvg = ({ fill }) => {
  return <svg className={s.titleBg} width="1437" height="50" viewBox="0 0 1437 50" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path d="M0 2C0 0.895432 0.895431 0 2 0H679.944C680.518 0 681.063 0.246233 681.443 0.676144L722.065 46.6761C723.205 47.9674 722.288 50 720.566 50H2C0.895432 50 0 49.1046 0 48V2Z" fill={`${!!fill ? fill : '#00B3FF'}`} />
    <path d="M1436.5 48C1436.5 49.1046 1435.6 50 1434.5 50L727.902 50C727.328 50 726.783 49.7538 726.403 49.3239L685.781 3.32386C684.641 2.03263 685.558 0 687.28 0H1434.5C1435.6 0 1436.5 0.895432 1436.5 2V48Z" fill="transparent" />
  </svg>
}

const RightTitleBgSvg = ({ fill }) => {
  return <svg className={s.titleBg} width="1437" height="50" viewBox="0 0 1437 50" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path d="M1436.5 2C1436.5 0.895432 1435.6 0 1434.5 0H756.556C755.982 0 755.437 0.246233 755.057 0.676144L714.435 46.6761C713.295 47.9674 714.212 50 715.934 50H1434.5C1435.6 50 1436.5 49.1046 1436.5 48V2Z" fill={`${!!fill ? fill : '#00B3FF'}`} />
    <path d="M0 48C0 49.1046 0.89543 50 2 50L708.598 50C709.172 50 709.717 49.7538 710.097 49.3239L750.719 3.32386C751.859 2.03263 750.942 0 749.22 0H1.99999C0.895416 0 0 0.895432 0 2V48Z" fill="#transparent" />
  </svg>
}


const MobileTitleBgSvg = ({ fill }) => {
  return <svg className={s.titleBg} width="390" height="37" viewBox="0 0 390 37" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path d="M1.64753e-06 2C1.64753e-06 0.895429 0.895433 4.46148e-07 2 9.965e-07L336.429 0.000167625C337.013 0.000167917 337.568 0.255899 337.948 0.700097L366.177 33.6999C367.287 34.9977 366.365 37 364.657 37L1.99999 36.9998C0.895423 36.9998 1.64753e-06 36.1044 1.64753e-06 34.9998V2Z" fill={`${!!fill ? fill : '#00B3FF'}`} />
    <path d="M393 35C393 36.1046 392.105 37 391 37L370.571 36.9998C369.987 36.9998 369.432 36.7441 369.052 36.2999L340.823 3.30008C339.713 2.00233 340.635 7.62939e-06 342.343 1.14441e-05L391 0.000160217C392.105 0.000164032 393 0.895596 393 2.00016V35Z" fill="transparent" />
  </svg>
}
