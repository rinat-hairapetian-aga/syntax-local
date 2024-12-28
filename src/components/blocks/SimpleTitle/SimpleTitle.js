import parse from "html-react-parser";
import React from "react";

import * as s from "./SimpleTitle.module.css";

const SimpleTitle = ({ block }) => {


  return (
    <>
      <section className={s.block} id={block?.blockId}>
        <div className="container-xl">
          <div className="row">
            <div className="col-12">
              <h1 className={`${s.title}`}>{parse(block?.title)} </h1>
              {!!block?.subtitle && <div className={`${s.subtitle}`}>{parse(block?.subtitle)}</div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SimpleTitle;
