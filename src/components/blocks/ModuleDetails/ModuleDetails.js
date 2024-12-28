

import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";

import * as s from "./ModuleDetails.module.css";

const ModuleDetails = ({ block }) => {
  const bp = useBreakpoint();

  const linesImage = {
    data: block.linesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImage?.altText || ``,
  };

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId}>
        <div className='d-none d-lg-block'>
          {(false != bp?.lg && linesImage?.data) && <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={`${s.lines}`}
            image={linesImage.data}
            alt={linesImage.alt} />}
        </div>
        <div className={s.wrapper}>
          <div className="container position-relative">
            <div className="row">
              <div className="col-12">
                {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
                {!!block?.subtitle && <div className={s.subtitle}>{parse(block?.subtitle)}</div>}
              </div>
              <div className="col-12">
                {block?.items?.length > 0 && <div className={s.itemsWraper}>
                  {block?.items?.map((item, i) => {
                    let icon = {
                      src: item?.icon?.localFile?.publicURL,
                      alt: item?.icon?.altText || ``,
                    }
                    return <div className={s.item} key={i}>
                      {!!icon.src && <img src={icon.src} alt={icon.alt} />}
                      <div className={s.description}>{parse(item.description)}</div>
                    </div>
                  })}
                </div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ModuleDetails;
