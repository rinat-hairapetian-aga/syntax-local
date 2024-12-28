import parse from "html-react-parser";
import React from "react";

import { StatsBottomDesktopSvg, StatsBottomMobileSvg } from '../../../utils/svgs';
import * as s from "./Stats.module.css";

const Stats = ({ block }) => {

  let blockStyles = {
    '--bg-color': block?.bgColor,
  };

  return (
    <>
      <section className={`${s.block}`} style={blockStyles} id={block?.blockId}>
        <div className={s.wrapper}>
          <div className="container position-relative">
            <div className="row">
              <div className="col-12">
                {block?.stats?.length > 0 && <div className={s.statsWraper}>
                  {block?.stats?.map((st, i) => {
                    return <div className={s.stat} key={i}>
                      <div className={s.name}>{parse(st.name)}</div>
                      <div className={s.value}>{parse(st.value)}</div>
                    </div>
                  })}
                </div>}
              </div>
            </div>
          </div>
        </div>
        <div className='w-100 d-none d-md-block' style={{ marginTop: '-1px', marginLeft: '-1px' }}>
          <StatsBottomDesktopSvg
            bgColor={block?.bgColor}
            rect1StartColor={block?.bottomBorderColors?.rectangle1GradientStartColor}
            rect1StopColor={block?.bottomBorderColors?.rectangle1GradientStopColor}
            rect2StartColor={block?.bottomBorderColors?.rectangle2GradientStartColor}
            rect2StopColor={block?.bottomBorderColors?.rectangle2GradientStopColor} />
        </div>
        <div className='w-100 d-md-none' style={{ marginTop: '-1px' }}>
          <StatsBottomMobileSvg
            bgColor={block?.bgColor}
            rect1StartColor={block?.bottomBorderColors?.rectangle1GradientStartColor}
            rect1StopColor={block?.bottomBorderColors?.rectangle1GradientStopColor}
            rect2StartColor={block?.bottomBorderColors?.rectangle2GradientStartColor}
            rect2StopColor={block?.bottomBorderColors?.rectangle2GradientStopColor} />
        </div>
      </section>
    </>
  );
};

export default Stats;
