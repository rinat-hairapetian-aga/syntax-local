

import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React, { useRef } from "react";
import { useInViewport } from 'react-in-viewport';

import ButtonCta from '../../buttonCta/buttonCta';
import Form from './Form';
import * as s from "./ModuleCurriculum.module.css";

const ModuleCurriculum = ({ block, course }) => {
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
                <div className="col-12">
                  {block?.weeks?.length > 0 && <div className={s.weeksWraper}>
                    {block?.weeks?.map((week, i) => {
                      return <Week key={i} week={week} />
                    })}
                  </div>}
                </div>
              </div>
            </div>
            <div className="container position-relative">
              <div className="row">
                <div className="col-12">
                  <div className='d-flex justify-content-center mt-0 mt-lg-5 mt-4'>
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

export default ModuleCurriculum;


const Week = ({ week }) => {

  const [opened, setOpened] = React.useState(false);

  const toggleOpened = () => {
    setOpened(!opened);
  }

  return <div className={`${s.week} ${opened ? s.opened : ''}`}>
    {!!week?.title && <div className={s.weekTitle} onClick={toggleOpened}>
      {parse(week.title)}
      {opened
        ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 8.34961L7 13.3496H17L12 8.34961Z" fill="#0A141B" />
        </svg>
        : <svg xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }} width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 8.34961L7 13.3496H17L12 8.34961Z" fill="#0A141B" />
        </svg>
      }
    </div>}
    {!!week?.weekContent && <div className={s.weekContent}>{parse(week?.weekContent)}</div>}
  </div>
}
