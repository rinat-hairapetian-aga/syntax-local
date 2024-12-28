import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import * as s from "./HeroCalendly.module.css";

const HeroCalendly = ({ block }) => {
  const bp = useBreakpoint();

  useCalendlyEventListener({
    // onProfilePageViewed: () => console.log("onProfilePageViewed"),
    // onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    // onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => {
      let payload = {
        event: 'formSubmit',
        type: 'calendly',
      };
      window?.dataLayer?.push({ ...payload });
    },
  });


  const bgImage = {
    data: block.bgImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgImage?.altText || ``,
  };

  let blockStyles = {
    '--bg-color': block?.backgroundColor,
    '--text-color': block?.textColor,
  };

  const [widgetStyles, setWidgetStyles] = useState({ height: '780px' })

  useEffect(() => {
    if (true == bp?.xxl) {
      setWidgetStyles({ height: '710px' })
    } else {
      if (true == bp?.xl) {
        setWidgetStyles({ height: '920px' })
      }
    }
  }, [bp])

  return (
    <>
      <section className={`${s.block}`} style={blockStyles} id={block?.blockId}>
        {(true == bp?.md && bgImage?.data) && <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          className={s.bg}
          image={bgImage.data}
          alt={bgImage.alt} />}
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className={`col-12 col-xl-10`}>
              <h1 className={s.title}>{parse(block?.title)}</h1>
              {!!block?.subtitle && <div className={`${s.subtitle}`}>{parse(block?.subtitle)}</div>}
              <div className='mt-4 mt-lg-0'>
                <InlineWidget url={block?.calendlyUrl} styles={widgetStyles} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroCalendly;
