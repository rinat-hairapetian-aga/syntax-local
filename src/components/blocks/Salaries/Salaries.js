import { Link } from "gatsby";
import parse from "html-react-parser";
import React from "react";
import * as s from "./Salaries.module.css";

const Salaries = ({ block }) => {

  let blockStyles = {
    '--labels-bg-color': block?.labelsBgColor,
    '--labels-text-color': block?.labelsTextColor,
  };


  return (
    <section className={`${s.block}`} id={block?.blockId} style={blockStyles}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
          </div>
        </div>
        <div className={`row justify-content-center ${s.salariesWrapper}`}>

          <div className="col-12 col-xl-10 col-xxl-9">
            <div className={`row align-items-center align-items-lg-stretch ${s.labelsWrapper}`}>
              <div className="col-4"></div>
              <div className="col-4">{parse(block?.label1 ?? '')}</div>
              <div className="col-4">{parse(block?.label2 ?? '')}</div>
            </div>
          </div>

          {block?.salaries?.length > 0 && <>
            {block?.salaries?.map((item, i) => {
              return <div className="col-12 col-xl-10 col-xxl-9" key={i}>
                <div className={`row ${s.salaryWrapper}`}>
                  <div className={s.color} style={{backgroundColor: item?.color}}></div>
                  <div className={`${s.salaryTitle} col-4`}>{parse(item?.title ?? '')}</div>
                  <div className={`${s.salaryValue} col-4`}>{parse(item?.value1 ?? '')}</div>
                  <div className={`${s.salaryValue} col-4`}>{parse(item?.value2 ?? '')}</div>
                </div>
              </div>
            })}
          </>}

        </div>
      </div>
    </section>
  );
};

export default Salaries;
