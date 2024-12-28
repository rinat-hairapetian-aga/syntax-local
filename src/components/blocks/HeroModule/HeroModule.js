
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import { Helmet } from 'react-helmet';
import * as s from "./HeroModule.module.css";

import ButtonCta from "../../buttonCta/buttonCta";

const HeroModule = ({ block, courseTitle }) => {
  const bp = useBreakpoint();

  const [linesTop, setLinesTop] = React.useState(0);

  const linesImage = {
    data: block.linesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImage?.altText || ``,
  };

  const rightImage = {
    data: block.rightImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.rightImage?.altText || ``,
  };
  const mobileImage = {
    data: block.mobileImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.mobileImage?.altText || ``,
  };

  let blockStyles = {
    '--bg-color': block?.backgroundColor,
  };

  React.useEffect(() => {
    document.addEventListener('scroll', (e) => {
      if (undefined != window) {
        setLinesTop(window.scrollY / 2)
      }
    })
  }, [])

  let links = [];
  if (!!rightImage?.data) {
    links.push({
      rel: 'preload',
      as: 'image',
      media: "(min-width: 992px)",
      fetchpriority: "high",
      href: rightImage?.data?.images?.fallback?.src,
      imagesrcset: rightImage?.data?.images?.sources[0]?.srcSet,
    });
  }
  if (!!mobileImage?.data) {
    links.push({
      rel: 'preload',
      as: 'image',
      media: "(max-width: 992px)",
      fetchpriority: "high",
      href: mobileImage?.data?.images?.fallback?.src,
      imagesrcset: mobileImage?.data?.images?.sources[0]?.srcSet,
    });
  }


  return (
    <>
      {links?.length > 0 && <Helmet link={[].concat(links)} />}
      <section className={`${s.block}`} style={blockStyles} id={block?.blockId}>
        <div className='d-none d-lg-block'>
          {(false != bp?.lg && linesImage?.data) && <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={`hero-image ${s.lines}`}
            style={{ top: `${linesTop}px` }}
            image={linesImage.data}
            alt={linesImage.alt} />}
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
                {!!block?.nextBatchDate && <div className={`${s.date} ${leftColumnContentPposition != 'flex-end' && 'mt-3 pt-1 mt-lg-4 pt-lg-2'}`}>{parse(block?.nextBatchDate)}</div>}
                <div className='d-lg-none'>
                  {(true != bp?.lg && mobileImage?.data) &&
                    <GatsbyImage
                      loading="eager"
                      placeholder="dominantColor"
                      className="mw-100 mt-3 hero-image"
                      image={mobileImage.data}
                      alt={mobileImage.alt} />
                  }
                </div>

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
              <div className='d-none d-lg-flex flex-column align-items-end justify-content-end h-100'>
                {(false != bp?.lg && rightImage?.data) &&
                  <GatsbyImage
                    loading="eager"
                    placeholder="dominantColor"
                    className="hero-image mw-100"
                    image={rightImage.data}
                    alt={rightImage.alt} />
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={s.bottomContentWrapper}>
        <div className="container position-relative">
          <div className="row">
            <div className='col-12'>
              {!!block?.bottomContent && <div className={s.bottomContent}>
                {parse(block?.bottomContent)}
              </div>}
              {!!block?.bottomButton?.link?.url && <div className='mt-lg-4 pt-lg-3 mt-3 d-flex justify-content-center'>
                <ButtonCta block={block?.bottomButton} />
              </div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroModule;
