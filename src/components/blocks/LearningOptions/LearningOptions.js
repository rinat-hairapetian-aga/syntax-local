import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import parse from "html-react-parser";
import React, { useRef } from "react";
import { useInViewport } from 'react-in-viewport';
import Slider from "react-slick";

import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./LearningOptions.module.css";

const LearningOptions = ({ block }) => {

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

  const bp = useBreakpoint();

  const sliderSettings = {
    className: `mobile-dots ps-container ${s.slider}`,
    dots: false,
    arrows: false,

    infinite: false,
    swipeToSlide: true,
    lazyLoad: false,
    autoplay: false,
    centerMode: false,
    variableWidth: true,
  };

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} ref={blockRef}>
        {enterCount > 0 && <>
          <div className="container position-relative">
            {!!block?.title && <div className='row'>
              <div className='col-12'>
                <h2 className={s.title}>{parse(block?.title)}</h2>
              </div>
            </div>}
          </div>

          {!!block?.optionsList?.length > 0 && <>
            {true == bp?.xl && <div className="container position-relative">
              <div className='row'>
                {block?.optionsList?.map((option, i) => {
                  return <div className={`d-flex flex-column align-items-start col-12 col-xl-${option?.size}`} key={i}>
                    <div className={s.optionTitle}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 409 51" fill="none" preserveAspectRatio="none">
                        <path d="M1.37317 8.78613C1.37317 4.644 4.73103 1.28613 8.87317 1.28613H376.503C378.934 1.28613 381.215 2.46517 382.621 4.44914L406.18 37.6867C409.7 42.6534 406.149 49.5237 400.061 49.5237H8.87316C4.73103 49.5237 1.37317 46.1658 1.37317 42.0237V8.78613Z" fill={option?.bgColor ?? '#66D1FF'} stroke="#0B1B3B" />
                      </svg>
                      <span className='position-relative'>{parse(option?.title)}</span>
                    </div>
                    {option?.items?.length > 0 && <>
                      <div className='row flex-grow-1' style={{ rowGap: '20px' }}>
                        {option?.items?.map((item, j) => {
                          return <div key={j} className={`col-12 col-xl-${(4 * 12) / option?.size}`}><Item data={item} color={option.bgColor} /></div>
                        })}
                      </div>
                    </>}
                  </div>
                })}
              </div>
            </div>}
            {false == bp?.xl && <>
              {block?.optionsList?.map((option, i) => {
                return <>
                  <div className="container position-relative">
                    <div className={`d-flex flex-column align-items-start`} key={i}>
                      <div className={s.optionTitle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 409 51" fill="none" preserveAspectRatio="none">
                          <path d="M1.37317 8.78613C1.37317 4.644 4.73103 1.28613 8.87317 1.28613H376.503C378.934 1.28613 381.215 2.46517 382.621 4.44914L406.18 37.6867C409.7 42.6534 406.149 49.5237 400.061 49.5237H8.87316C4.73103 49.5237 1.37317 46.1658 1.37317 42.0237V8.78613Z" fill={option?.bgColor ?? '#66D1FF'} stroke="#0B1B3B" />
                        </svg>
                        <span className='position-relative'>{parse(option?.title)}</span>
                      </div>
                    </div>
                  </div>

                  {option?.items?.length > 0 && <>
                    <div className="container-fluid px-0 position-relative">
                      <div className='w-100'>
                        <Slider {...sliderSettings}>
                          {option?.items?.map((item, j) => {
                            return <div key={j} className={`pe-3 pb-3 h-100 `}><Item data={item} color={option.bgColor} /></div>
                          })}
                        </Slider>
                      </div>
                    </div>
                  </>}
                </>
              })}
            </>}
          </>}
        </>}
      </section>
    </>
  );
};

export default LearningOptions;

const Item = ({ data, color }) => {
  let styles = {};
  if (!!color) {
    styles.backgroundColor = color
  }

  const img = {
    src: data?.image?.localFile?.childImageSharp?.original?.src,
    alt: data?.image?.altText
  }

  return <div className={s.item} style={styles}>
    {!!img?.src && <img src={img?.src} alt={img.alt} className='w-100' />}
    <div className={s.itemTitle}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 324 31" fill="none" preserveAspectRatio="none">
        <path d="M0.605347 2.36035C0.605347 1.25578 1.50078 0.360352 2.60535 0.360352H297.885C298.447 0.360352 298.984 0.597204 299.363 1.01285L323.116 27.0648C324.286 28.3488 323.375 30.4123 321.638 30.4123H2.60535C1.50078 30.4123 0.605347 29.5168 0.605347 28.4123V2.36035Z" fill="#0B1B3B" />
      </svg>
      <span className='position-relative'>
        {parse(data.title)}
      </span>
    </div>
    {!!data.content && <div className={s.itemContent}>{parse(data.content)}</div>}
    <ButtonCta block={data.button} />
  </div>
}
