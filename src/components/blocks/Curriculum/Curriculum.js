
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React, { useRef } from "react";
import { useInViewport } from 'react-in-viewport';
import Slider from "react-slick";

import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./Curriculum.module.css";
import Form from './Form';

const Curriculum = ({ block, course }) => {
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

  const [modalShow, setModalShow] = React.useState(false);

  const topDesktop = {
    data: block.topDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.topDesktop?.altText || ``,
  };
  const bottomDesktop = {
    data: block.bottomDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottomDesktop?.altText || ``,
  };

  const topMobile = {
    data: block.topMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.topMobile?.altText || ``,
  };
  const bottomMobile = {
    data: block.bottomMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottomMobile?.altText || ``,
  };

  const blockStyles = {
    '--bg-color': block?.bgColor
  };

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    swipeToSlide: true,
    lazyLoad: false,
    autoplay: false,
    slidesToShow: 1.2,
    centerMode: false,
    rows: 1,
    slidesPerRow: 2,
  };

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} style={blockStyles} ref={blockRef}>
        {(true == bp.md && !!topDesktop?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          style={{ marginBottom: '-2px' }}
          objectFit='fill'
          className={'w-100'}
          image={topDesktop.data}
          alt={topDesktop.alt} />}
        {(false == bp.md && !!topMobile?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          style={{ marginBottom: '-2px' }}
          objectFit='fill'
          className={'w-100'}
          image={topMobile.data}
          alt={topMobile.alt} />}
        <div className={s.wrapper}>
          {enterCount > 0 && <>
            <div className="container position-relative">
              <div className="row">
                <div className="col-12">
                  {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
                  {!!block?.subtitle && <div className={s.subtitle}>{parse(block?.subtitle)}</div>}
                </div>
                {true == bp.lg && <div className="col-12">
                  {block?.items?.length > 0 && <div className={s.itemsWraper}>
                    {block?.items?.map((item, i) => {
                      return <Item key={i} item={item} />
                    })}
                  </div>}
                </div>}
              </div>
            </div>
            {(false == bp.lg && block?.items?.length > 0) && <div className="container-fluid mt-3 p-0 position-relative">
              <Slider {...sliderSettings}>
                {block?.items?.map((item, i) => {
                  return <div key={i} className='w-100 p-2 h-50'><Item item={item} /></div>
                })}
              </Slider>
            </div>}
            <div className="container position-relative">
              <div className="row">
                <div className="col-12">
                  <div className='d-flex justify-content-center mt-0 mt-lg-5'>
                    <ButtonCta onClick={() => { setModalShow(true) }} block={{
                      color: '#FFF',
                      hoverColor: '#B8EAFF',
                      textColor: '#040D1D',
                    }}>
                      {parse(block?.buttonText)}
                    </ButtonCta>
                  </div>
                </div>
              </div>
            </div>
          </>}
        </div>

        {!!modalShow && <>
          <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 10006 }} aria-hidden="false">
            <div className="modal-backdrop fade show" style={{ zIndex: 1 }} onClick={() => { setModalShow(false) }}></div>
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" style={{ zIndex: 2 }}>
              <div className="modal-content">
                <div className="d-flex justify-content-end pt-3 pe-3">
                  <button type="button" className="btn-close" onClick={() => { setModalShow(false) }}></button>
                </div>
                <div className="modal-body">
                  <Form block={block?.form} course={course} onSubmit={() => { setModalShow(false) }} />
                </div>
              </div>
            </div>
          </div>
        </>
        }

        {(true == bp.md && !!bottomDesktop?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          objectFit='fill'
          className={'w-100'}
          style={{ marginTop: '-2px' }}
          image={bottomDesktop.data}
          alt={bottomDesktop.alt} />}

        {(false == bp.md && !!bottomMobile?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          style={{ marginTop: '-2px' }}
          objectFit='fill'
          className={'w-100'}
          image={bottomMobile.data}
          alt={bottomMobile.alt} />}
      </section>
    </>
  );
};

export default Curriculum;

const Item = ({ item }) => {
  let icon = {
    src: item?.icon?.localFile?.publicURL,
    alt: item?.icon?.altText || ``,
  }
  return <div className={s.item}>
    {!!icon.src && <img src={icon.src} alt={icon.alt} />}
    {!!item?.title && <div className={s.itemTitle}>{parse(item.title)}</div>}
    {!!item.description && <div className={s.itemDescription}>{parse(item.description)}</div>}
  </div>
}