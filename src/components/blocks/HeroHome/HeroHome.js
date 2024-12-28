import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import { Helmet } from "react-helmet";
import * as s from "./HeroHome.module.css";

import ButtonCta from "../../buttonCta/buttonCta";

const HeroHome = ({ block, courseTitle }) => {
  const bp = useBreakpoint();

  const bgImageDesktop = {
    data: block.bgImageDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgImageDesktop?.altText || ``,
  };
  const bgImageMobile = {
    data: block.bgImageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgImageMobile?.altText || ``,
  };

  let blockStyles = {
    '--bg-color': block?.backgroundColor,
  };

  let links = [];
  if (!!bgImageDesktop?.data) {
    links.push({
      rel: 'preload',
      as: 'image',
      media: "(min-width: 992px)",
      fetchpriority: "high",
      href: bgImageDesktop?.data?.images?.fallback?.src,
      imagesrcset: bgImageDesktop?.data?.images?.sources[0]?.srcSet,
    });
  }
  if (!!bgImageMobile?.data) {
    links.push({
      rel: 'preload',
      as: 'image',
      media: "(max-width: 992px)",
      fetchpriority: "high",
      href: bgImageMobile?.data?.images?.fallback?.src,
      imagesrcset: bgImageMobile?.data?.images?.sources[0]?.srcSet,
    });
  }

  return (
    <>
      {links?.length > 0 && <Helmet link={[].concat(links)} />}
      <section className={`${s.block}`} style={blockStyles} id={block?.blockId}>
        <div className='d-none d-lg-block'>
          {(false != bp?.lg && bgImageDesktop?.data) && <>
            <GatsbyImage
              loading="eager"
              placeholder="dominantColor"
              className={`hero-image ${s.bg}`}
              image={bgImageDesktop.data}
              alt={bgImageDesktop.alt} />
          </>
          }
        </div>
        <div className='d-lg-none'>
          {(true != bp?.lg && bgImageMobile?.data) && <>
            <GatsbyImage
              loading="eager"
              placeholder="dominantColor"
              className={`hero-image ${s.bg}`}
              image={bgImageMobile.data}
              alt={bgImageMobile.alt} />
          </>
          }
        </div>
        <div className="container position-relative">
          <div className="row">
            <div className={`col-lg-6 col-xl-6`}>
              <div className={s.leftCol}>
                {block?.badges?.length > 0 && <div className={s.badgesWraper}>
                  {block?.badges?.map((b, i) => {
                    let img = {
                      data: b?.localFile?.childImageSharp?.gatsbyImageData,
                      alt: b?.altText || ``,
                    }
                    if (!!img?.data) {
                      return <GatsbyImage
                        key={i}
                        loading="eager"
                        placeholder="dominantColor"
                        className={s.badge}
                        image={img.data}
                        alt={img.alt} />
                    }
                    return null
                  })}
                </div>}
                <h1 className={s.title}>{parse(block?.title ?? courseTitle)}</h1>
                {!!block?.nextBatchDate && <div className={`${s.date} mt-lg-4 pt-lg-2`}>{parse(block?.nextBatchDate)}</div>}
                <div className={s.buttonsWrapper}>
                  <div>
                    <ButtonCta block={block?.scheduleButton} />
                  </div>
                  {block?.enrollButton?.url && <div>
                    <ButtonCta block={{ type: 'outline', link: block?.enrollButton }} className='w-100' />
                    {!!block?.infoText && <div className={s.infoText}>
                      <span>ⓘ</span> <span>{parse(block?.infoText)}</span>
                    </div>}
                  </div>}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default HeroHome;
