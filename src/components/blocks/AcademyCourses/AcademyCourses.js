import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React, { useRef } from "react";
import { useInViewport } from 'react-in-viewport';
import Slider from "react-slick";

import { AcademyCoursesBottomDesktopSvg, AcademyCoursesBottomMobileSvg, AcademyCoursesTopDesktopSvg, AcademyCoursesTopMobileSvg, AcademyCoursesDurationSvg, AcademyCoursesDurationBgSvg } from '../../../utils/svgs';
import * as s from "./AcademyCourses.module.css";
import ButtonCta from '../../buttonCta/buttonCta';

const AcademyCourses = ({ block }) => {


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

  let blockStyles = {
    '--bg-color': block?.bgColor,
    '--text-color': '#ffffff',
  };

  const linesImage = {
    data: block.linesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImage?.altText || ``,
  };

  const desktopSliderSettings = {
    className: `bottom-arrows ${s.slider}`,
    dots: false,
    arrows: true,
    nextArrow: <NextArrow styles={blockStyles} />,
    prevArrow: <PrevArrow styles={blockStyles} />,
    infinite: false,
    swipeToSlide: true,
    lazyLoad: false,
    autoplay: false,
    centerMode: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          centerMode: false,
          arrows: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          centerMode: false,
          arrows: true,
          slidesToShow: 2,
        },
      },
    ],
  };


  const mobileSliderSettings = {
    className: `ps-container bottom-arrows ${s.slider}`,
    dots: false,
    arrows: true,
    nextArrow: <NextArrow styles={blockStyles} />,
    prevArrow: <PrevArrow styles={blockStyles} />,
    infinite: false,
    swipeToSlide: true,
    lazyLoad: false,
    autoplay: false,
    centerMode: false,
    slidesToShow: 1.2,
  };


  return (
    <>
      <section className={`${s.block}`} style={blockStyles} id={block?.blockId} ref={blockRef}>
        <div className='w-100 d-none d-md-block position-relative' style={{ zIndex: 0, bottom: '-1px' }}>
          <AcademyCoursesTopDesktopSvg bgColor={block?.bgColor} bgColor2={''}
            rect1StartColor={block?.topBorderColors?.rectangle1GradientStartColor}
            rect1StopColor={block?.topBorderColors?.rectangle1GradientStopColor}
            rect2StartColor={block?.topBorderColors?.rectangle2GradientStartColor}
            rect2StopColor={block?.topBorderColors?.rectangle2GradientStopColor} />
        </div>
        <div className='w-100 d-md-none position-relative' style={{ zIndex: 0, bottom: '-1px' }}>
          <AcademyCoursesTopMobileSvg bgColor={block?.bgColor} bgColor2={''}
            rect1StartColor={block?.topBorderColors?.rectangle1GradientStartColor}
            rect1StopColor={block?.topBorderColors?.rectangle1GradientStopColor}
            rect2StartColor={block?.topBorderColors?.rectangle2GradientStartColor}
            rect2StopColor={block?.topBorderColors?.rectangle2GradientStopColor} />
        </div>
        <div className={s.wrapper}>
          {!!linesImage?.data &&
            <GatsbyImage
              loading="eager"
              placeholder="dominantColor"
              className={s.lines}
              image={linesImage.data}
              alt={linesImage.alt} />
          }
          {enterCount > 0 && <>
            <div className="container position-relative">
              <div className="row">
                <div className="col-12">
                  {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
                </div>
              </div>
            </div>
            {true == bp?.lg && <div className="container position-relative">
              {block?.items?.length > 0 && <Slider {...desktopSliderSettings}>
                {block?.items?.map((item, i) => {
                  return <div key={i} className=' h-100 d-flex flex-column align-items-center justify-content-center'>
                    <div className='h-100 px-2 mx-1'>
                      <Item item={item} />
                    </div>
                  </div>
                })}
              </Slider>}
            </div>}
            {false == bp?.lg && <div className=" position-relative">
              {block?.items?.length > 0 && <Slider {...mobileSliderSettings}>
                {block?.items?.map((item, i) => {
                  return <div key={i} className='pe-3 h-100 d-flex flex-column align-items-center justify-content-center'>
                    <Item item={item} />
                  </div>
                })}
              </Slider>}
            </div>}
          </>}
        </div>
        <div className='w-100 d-none d-md-block position-relative' style={{ zIndex: 0, top: '-1px' }}>
          <AcademyCoursesBottomDesktopSvg bgColor={'#0B1B3B'} bgColor2={'white'} />
        </div>
        <div className='w-100 d-md-none position-relative' style={{ zIndex: 0, top: '-1px' }}>
          <AcademyCoursesBottomMobileSvg bgColor={'#0B1B3B'} bgColor2={'white'} />
        </div>
      </section>
    </>
  );
};

export default AcademyCourses;

const Item = ({ item }) => {
  let image = {
    src: item?.image?.localFile?.publicURL,
    alt: item?.image?.altText || ``,
  }

  return <div className={s.item}>
    <div className='d-flex flex-column'>
      <div className={s.itemImageWrapper}>
        <img src={image.src} alt={image.alt} className={'w-100'} />
        {!!item?.estimateTime && <div className={s.itemDuation}>
          <div className={s.bg}>
            <AcademyCoursesDurationBgSvg />
          </div>
          <div className='position-relative d-flex align-items-center' style={{ gap: '10px' }}>
            <AcademyCoursesDurationSvg />
            <span>{parse(item?.estimateTime)}</span>
          </div>
        </div>}
      </div>
      <div className={s.itemTitle}>{parse(item.title)}</div>
      {!!item.description && <div className={s.itemDescription}>{parse(item.description)}</div>}
    </div>
    <div className='mt-3 mt-lg-4'>
      <ButtonCta style={{ minWidth: '140px' }} block={{
        color: '#fff',
        hoverColor: '#fff',
        textColor: '#040D1D',
        borderColor: '#0B1B3B',
        link: item?.link
      }} />
    </div>
  </div>
}



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