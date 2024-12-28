import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import parse from "html-react-parser";
import React from "react";
import Slider from "react-slick";

import { isDark } from '../../../utils/brightness';
import CareerPath from "./CareerPath";
import * as s from "./CareerPaths.module.css";

const CareerPaths = ({ block }) => {
  const bp = useBreakpoint();

  const blockStyles = {
    '--bg-color': block?.bgColor,
    '--title-color': block?.titleColor,
  };

  const sliderSettings = {
    className: 'mobile-dots',
    infinite: true,
    swipeToSlide: true,
    lazyLoad: false,
    autoplay: false,
    centerMode: false,
    slidesToShow: 1,
    dots: true,
    arrows: false,
    variableWidth: false,
    dotsClass: `slick-dots ${!isDark(blockStyles['--bg-color'], 128) ? 'dark' : ''}`,
  };

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} style={blockStyles}>
        <div className="container position-relative">
          {!!block?.title && <div className='row'>
            <div className='col-12'>
              <h2 className={s.title}>{parse(block?.title)}</h2>
            </div>
          </div>}
        </div>
        {block?.paths?.length > 0 && <>
          {false == bp.lg && <Slider {...sliderSettings}>
            {block?.paths?.map((path, i) => {
              return <div key={i}>
                <CareerPath block={{...path, bgColor:block?.bgColor}} styles={blockStyles} />
              </div>
            })}
          </Slider>}
          {true == bp.lg && <>
            {block?.paths?.map((path, i) => {
              return <div key={i}>
                <CareerPath block={{...path, bgColor:block?.bgColor}} styles={blockStyles} />
              </div>
            })}
          </>}
        </>}
      </section>
    </>
  );
};

export default CareerPaths;
