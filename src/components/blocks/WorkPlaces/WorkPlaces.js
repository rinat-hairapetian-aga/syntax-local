
import { graphql, useStaticQuery } from "gatsby";
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import parse from "html-react-parser";
import React from "react";

import * as s from "./WorkPlaces.module.css";

const WorkPlaces = ({ block }) => {
  const bp = useBreakpoint();
  const { wp: { acfOptionsWorkplacesLogos: { defaultWorkplacesLogos: { defaultLogos } } } } = useStaticQuery(graphql`
    query DefaultWorkplacesLogosQuery {
      wp {
        acfOptionsWorkplacesLogos {
          defaultWorkplacesLogos {
            defaultLogos: workplacesLogos {
              altText
              localFile {
                publicURL
              }
            }
          }
        }
      }
    }
  `)

  let logos = [];
  if (true == block?.useLocalLogos) {
    logos = block?.logos;
  } else{
    logos = defaultLogos;
  }

  const [showAll, setShowAll] = React.useState(false);

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId}>
        <div className="container position-relative">
          <div className="row">
            {!!block?.title && <div className="col-12">
              <h2 className={s.title}>{parse(block?.title)}</h2>
            </div>}
            <div className="col-12">
              {(true == bp?.lg && logos?.length > 0) && <>
                <div className={s.logosWraper}>
                  {logos?.map((l, i) => {
                    let logo = {
                      src: l?.localFile?.publicURL,
                      alt: l?.altText || ``,
                    }
                    if (!!logo?.src) {
                      return <div key={i} className={s.logoWrapper}>
                        <img className={`mw-100`} src={logo.src} alt={logo.alt} />
                      </div>
                    }
                    return null
                  })}
                </div>
              </>}
              {(false == bp?.lg && logos?.length > 0) && <>
                <div className={s.logosWraper}>
                  {logos?.map((l, i) => {
                    if (false == showAll && i > 4) {
                      return null
                    }
                    let logo = {
                      src: l?.localFile?.publicURL,
                      alt: l?.altText || ``,
                    }
                    if (!!logo?.src) {
                      return <div key={i} className={s.logoWrapper}>
                        <img className={`mw-100`} src={logo.src} alt={logo.alt} />
                      </div>
                    }
                    return null
                  })}
                </div>
                {(false == showAll && logos?.length > 5) && <div className="d-flex justify-content-center align-items-center py-3">
                  <button type="button" onClick={() => { setShowAll(true) }} className={s.seeMore}>See more</button>
                </div>}
              </>}

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkPlaces;
