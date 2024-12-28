
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";

import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./AlumniStats.module.css";
import Form from './Form';

const AlumniStats = ({ block, page }) => {
  const bp = useBreakpoint();

  const [modalShow, setModalShow] = React.useState(false);
  const [isInUsa, setIsInUsa] = React.useState(false);

  React.useEffect(async () => {
    //send request for ip and country
    let response = await fetch(' https://api.country.is');
    const res = await response.json();
    if ('US' == res.country) {
      setIsInUsa(true);
    }
  }, [])

  const blockStyles = {
    '--bg-color': block?.bgColor
  };


  const topLines = {
    data: block.top?.lines?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.top?.lines?.altText || ``,
  };


  const statsChartDesktop = {
    data: block.top?.statsChartDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.top?.statsChartDesktop?.altText || ``,
  };

  const statsChartMobile = {
    data: block.top?.statsChartMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.top?.statsChartMobile?.altText || ``,
  };


  const salaryGraphDesktop = {
    data: block.bottom?.salaryGraphDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottom?.salaryGraphDesktop?.altText || ``,
  };

  const salaryGraphMobile = {
    data: block.bottom?.salaryGraphMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottom?.salaryGraphMobile?.altText || ``,
  };


  const bottomLines = {
    data: block.bottom?.lines?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottom?.lines?.altText || ``,
  };


  const locationsImageUsa = {
    data: block.bottom?.locationsImageUsa?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottom?.locationsImageUsa?.altText || ``,
  };

  const locationsImageWorld = {
    data: block.bottom?.locationsImageWorld?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottom?.locationsImageWorld?.altText || ``,
  };


  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} style={blockStyles}>
        <div className="container position-relative">
          {(true == bp.md && !!topLines?.data) && <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={s.bg}
            image={topLines.data}
            alt={topLines.alt} />}
          <div className="row justify-content-center position-relative">
            <div className="col-12 col-lg-11 col-xl-9 col-xxl-7">
              <div className="row ">
                <div className="col-12">
                  {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
                </div>
                <div className="col-12">
                  {(true == bp.md && !!statsChartDesktop?.data) && <GatsbyImage
                    loading="eager"
                    placeholder="dominantColor"
                    className={`mw-100`}
                    image={statsChartDesktop.data}
                    alt={statsChartDesktop.alt} />}
                  {(false == bp.md && !!statsChartMobile?.data) && <GatsbyImage
                    loading="eager"
                    placeholder="dominantColor"
                    className={`mw-100`}
                    image={statsChartMobile.data}
                    alt={statsChartMobile.alt} />}
                </div>
                {block?.top?.stats?.length > 0 && <div className="col-12">
                  <div className={s.statsWrapper}>
                    {block?.top?.stats?.map((st, i) => {
                      return <div key={i} className={s.stat}>
                        <div className={s.statValue}>{parse(st.value)}</div>
                        <div className={s.statLabel}>{parse(st.label)}</div>
                      </div>
                    })}
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
        <div className="container position-relative mb-4">
          <div className="row justify-content-center position-relative">
            <div className="col-12 col-lg-11 col-xl-9 col-xxl-7">
              <div className="row ">
                <div className="col-12">
                  {(true == bp.md && !!salaryGraphDesktop?.data) && <GatsbyImage
                    loading="eager"
                    placeholder="dominantColor"
                    className={`mw-100`}
                    image={salaryGraphDesktop.data}
                    alt={salaryGraphDesktop.alt} />}
                  {(false == bp.md && !!salaryGraphMobile?.data) && <GatsbyImage
                    loading="eager"
                    placeholder="dominantColor"
                    className={`mw-100`}
                    image={salaryGraphMobile.data}
                    alt={salaryGraphMobile.alt} />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container position-relative">
          {(true == bp.md && !!bottomLines?.data) && <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={s.bg}
            image={bottomLines.data}
            alt={bottomLines.alt} />}
          <div className="row justify-content-center position-relative">
            <div className="col-12 col-lg-11 col-xl-9 col-xxl-7">
              {block?.bottom?.pieImages?.length > 0 && <div className='row mb-3 mb-lg-4' style={{rowGap: '16px'}}>
                {block?.bottom?.pieImages?.map((p, i) => {
                  let img = {
                    data: p.localFile?.childImageSharp?.gatsbyImageData,
                    alt: p.altText || ``,
                  }
                  if (!!img?.data) {
                    return <div className='col-md-6' key={i}>
                      <GatsbyImage
                        loading="eager"
                        placeholder="dominantColor"
                        className={`mw-100`}
                        image={img.data}
                        alt={img.alt} />
                    </div>
                  }
                  return null
                })}
              </div>}
              <div className="row ">
                <div className='col-12'>
                  <div className={s.locationsWrapper}>
                    {!!block?.bottom?.locationsTitle && <h2 className={s.locationsTitle}>{parse(block?.bottom?.locationsTitle)}</h2>}
                    {isInUsa
                      ? <>
                        {!!locationsImageUsa?.data ? <GatsbyImage
                          loading="eager"
                          placeholder="dominantColor"
                          className={`mw-100`}
                          image={locationsImageUsa.data}
                          alt={locationsImageUsa.alt} />
                          : <>
                            {!!locationsImageWorld?.data && <GatsbyImage
                              loading="eager"
                              placeholder="dominantColor"
                              className={`mw-100`}
                              image={locationsImageWorld.data}
                              alt={locationsImageWorld.alt} />}
                          </>}
                      </>
                      : <>
                        {!!locationsImageWorld?.data && <GatsbyImage
                          loading="eager"
                          placeholder="dominantColor"
                          className={`mw-100`}
                          image={locationsImageWorld.data}
                          alt={locationsImageWorld.alt} />}
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {block?.form?.show && <>
          <div className="container position-relative">
            <div className="row">
              <div className="col-12">
                <div className='d-flex justify-content-center mt-0 mt-lg-5'>
                  <ButtonCta onClick={() => { setModalShow(true) }} block={block?.form?.modalButton}>
                    {parse(block?.form?.modalButton?.text)}
                  </ButtonCta>
                </div>
              </div>
            </div>
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
                    <Form block={block?.form} page={page} onSubmit={() => { setModalShow(false) }} />
                  </div>
                </div>
              </div>
            </div>
          </>}
        </>}

      </section>

    </>
  );
};

export default AlumniStats;