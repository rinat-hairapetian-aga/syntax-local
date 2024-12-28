
import parse from "html-react-parser";
import React, { useRef } from "react";
import { useInViewport } from 'react-in-viewport';

import * as s from "./CareerService.module.css";
import Step from './Step';

const CareerService = ({ block }) => {

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

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} ref={blockRef}>
        {enterCount > 0 && <>
          <div className="container position-relative">
            <div className="row">
              <div className="col-12">
                {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-11 col-xl-10 col-xxl-8 pt-lg-5">
                <div className={s.stageWrapper}>
                  <div className={`${s.stageLabel} my-3`} style={{ backgroundColor: block?.stage1?.labelBgColor, backgroundImage: block?.stage1?.labelBgGradient, }}>
                    <span style={{ color: block?.stage1?.labelTextColor }}>
                      {parse(block?.stage1?.label ?? '')}
                    </span>
                  </div>
                  {block?.stage1?.items?.length > 0 && <div className='row position-relative'>
                    <div className={`${s.durationWrapper} ${s.stage1}`}>
                      <div className={s.duration}>{parse(block?.stage1?.duration ?? '')}</div>
                      <div className={s.durationLines}></div>
                    </div>
                    {block?.stage1?.items?.map((step, i) => {
                      return <Step block={step} key={i} />
                    })}
                  </div>}
                </div>
              </div>

              <div className="col-12 col-md-11 col-xl-10 col-xxl-8">
                <div className={s.stageWrapper}>
                  <div className={`${s.stageLabel} my-3`} style={{ backgroundColor: block?.stage2?.labelBgColor, backgroundImage: block?.stage2?.labelBgGradient, }}>
                    <span style={{ color: block?.stage2?.labelTextColor }}>
                      {parse(block?.stage2?.label ?? '')}
                    </span>
                  </div>
                  {block?.stage2?.items?.length > 0 && <div className='row position-relative flex-lg-row-reverse'>
                    <div className={`${s.durationWrapper} ${s.stage2}`}>
                      <div className={s.durationLines}></div>
                      <div className={s.duration}>{parse(block?.stage2?.duration ?? '')}</div>
                    </div>
                    {block?.stage2?.items?.map((step, i) => {
                      return <Step block={step} key={i} />
                    })}
                  </div>}
                </div>
              </div>

            </div>
          </div>
        </>}
      </section>
    </>
  );
};

export default CareerService;
