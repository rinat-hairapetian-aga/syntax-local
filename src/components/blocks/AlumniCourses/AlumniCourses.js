import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React, { useRef } from "react";
import { useInViewport } from 'react-in-viewport';

import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./AlumniCourses.module.css";

const AlumniCourses = ({ block }) => {

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
    '--bg-color': block?.bgColor,
    '--title-color': block?.titleColor,
    '--border-color': `${block?.titleColor}30`,
  };

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} style={blockStyles} ref={blockRef}>
        {enterCount > 0 && <>
          <div className="container position-relative">
            <div className='row'>
              <div className='col-12'>
                {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
              </div>
            </div>
            <div className='row' style={{ rowGap: '18px' }}>
              {block?.items?.length > 0 && <>
                {block?.items?.map((item, i) => {
                  let img = {
                    data: item?.image?.localFile?.childImageSharp?.gatsbyImageData,
                    alt: item?.image?.altText || ``,
                  }
                  return <div className='col-12 col-lg-6' key={i}>
                    <div className={s.course}>
                      <div className='position-relative'>
                        {!!img?.data && <GatsbyImage
                          loading="eager"
                          placeholder="dominantColor"
                          className={`mw-100`}
                          image={img.data}
                          alt={img.alt} />}
                        {!!item?.title && <div className={s.courseTitle}>
                          <TitleBgSvg fillColor={item?.button?.color} />
                          <span>{parse(item?.title)}</span>
                        </div>}
                      </div>
                      <div className={s.itemInfo}>
                        <div className={s.description}>{parse(item?.description ?? '')}</div>
                        {item?.tuition?.length > 0 && <div className={s.tuitions}>
                          {item?.tuition?.map((t, i) => {
                            if (i === 0) {
                            return (
                              <div className="offer_price">
                                <TuitionItem item={t} key={i} index={i} />
                                <div class="prices_wrap"><div class="was_price">$5,950*</div><div class="discount_price"><span class="red_badge">40% Discount</span><span>$3,570*</span></div></div>
                              </div>
                            )
                            } else{
                              return <TuitionItem item={t} key={i} index={i} />
                            }
                            return <div key={i} className={s.tuition}>
                              <div className={s.label}>{parse(t.label)}</div>
                              <div className={s.value}>{parse(t.value)}</div>
                            </div>
                          })}
                        </div>}
                        {!!item?.button?.link?.url && <div className='d-flex justify-content-center justify-content-md-start'>
                          <ButtonCta className={'px-5'} block={item?.button} />
                        </div>}
                        <div className="black_badge_offer">
                          <img src="https://wordpress-1206907-4270701.cloudwaysapps.com/wp-content/uploads/2024/12/christmas-assets-04.svg" />
                        </div>  
                      </div>
                    </div>
                  </div>
                })}
              </>}
            </div>
          </div>
        </>}
      </section>
    </>
  );
};

export default AlumniCourses;


const TuitionItem = ({ item, index }) => {
  return <>
    {(index % 3) != 0 && <div className={s.separator}>|</div>}
    <div className={s.tuition}>
      <div className={s.label}>{parse(item.label)}</div>
      <div className={s.value}>{parse(item.value)}</div>
    </div>
  </>
}

const TitleBgSvg = ({ fillColor }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="388" height="37" viewBox="0 0 388 37" fill="none" preserveAspectRatio="none">
    <path d="M0 2.92871C0 1.82414 0.89543 0.928711 2 0.928711H356.294C356.856 0.928711 357.393 1.16556 357.772 1.58121L386.948 33.5812C388.119 34.8653 387.208 36.9287 385.47 36.9287H2C0.89543 36.9287 0 36.0333 0 34.9287V2.92871Z" fill={`${!!fillColor ? fillColor : "white"}`} />
  </svg>
}