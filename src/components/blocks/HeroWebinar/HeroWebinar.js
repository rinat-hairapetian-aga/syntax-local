import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import * as s from "./HeroWebinar.module.css";
import Timer from './Timer';
import Form from './Form';

const HeroWebinar = ({ block, webinarTitle }) => {
  const bp = useBreakpoint();

  const [linesTop, setLinesTop] = React.useState(0);

  const linesImage = {
    data: block.linesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImage?.altText || ``,
  };



  const bottomBorderDesktop = {
    data: block.bottomBorderDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottomBorderDesktop?.altText || ``,
  };
  const bottomBorderMobile = {
    data: block.bottomBorderMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottomBorderMobile?.altText || ``,
  };

  let blockStyles = {
    '--bg-color': block?.backgroundColor,
    '--seconds-gradient': block?.secondsBlockGradient,
  };

  React.useEffect(() => {
    document.addEventListener('scroll', (e) => {
      if (undefined != window) {
        let top = window.scrollY / 2;
        setLinesTop(top);
      }
    })
  }, [])


  return (
    <>
      <section className={`${s.block}`} style={blockStyles} id={block?.blockId}>
        {(!!linesImage?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          className={`hero-image ${s.lines}`}
          style={{ top: `${linesTop}px` }}
          image={linesImage.data}
          alt={linesImage.alt} />}
        <div className={s.wrapper}>
          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row">
              <div className={`col-lg-6 col-xl-7`}>
                <div className={s.leftCol}>
                  <h1 className={s.title}>{parse(block?.title ?? webinarTitle)}</h1>
                  {!!block?.webinarDateLabel && <div className={`${s.date}`}>{parse(block?.webinarDateLabel)}</div>}
                  {true == bp?.lg && <Timer date={block?.webinarDate} styles={blockStyles} />}
                  {false == bp?.lg && <Form block={block?.form} webinar={`webinar - ${webinarTitle}`} />}
                  {!!block?.infoText && <div className={`${s.infoText}`}>{parse(block?.infoText)}</div>}
                </div>
              </div>
              <div className="col-lg-6 col-xl-5">

                {true == bp?.lg && <Form block={block?.form} webinar={`webinar - ${webinarTitle}`} />}
              </div>
            </div>
          </div>
        </div>
        {(true == bp?.md && bottomBorderDesktop?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          style={{ zIndex: 0, marginTop: '-2px' }}
          objectFit='fill'
          className="w-100"
          image={bottomBorderDesktop.data}
          alt={bottomBorderDesktop.alt} />}
        {(false == bp?.md && bottomBorderMobile?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          style={{ zIndex: 0, marginTop: '-2px' }}
          className="w-100"
          objectFit='fill'
          image={bottomBorderMobile.data}
          alt={bottomBorderMobile.alt} />}
      </section>
    </>
  );
};

export default HeroWebinar;
