import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import * as s from "./HeroEnroll.module.css";

import ButtonCta from "../../buttonCta/buttonCta";
import Form from './Form';

const HeroEnroll = ({ block, title }) => {
  const bp = useBreakpoint();

  const [linesTop, setLinesTop] = React.useState(0);

  const linesImage = {
    data: block.linesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImage?.altText || ``,
  };


  let leftColumnContentPposition = 'flex-end';
  switch (block?.leftColumnContentPposition) {
    case 'center':
      leftColumnContentPposition = 'center';
      break;
    case 'start':
      leftColumnContentPposition = 'flex-start';
      break;
    case 'end':
    default:
      leftColumnContentPposition = 'flex-end';
      break;
  }

  let blockStyles = {
    '--bg-color': block?.backgroundColor,
    '--text-color': block?.textColor,
    '--left-col-alignment': leftColumnContentPposition,
  };

  React.useEffect(() => {
    document.addEventListener('scroll', (e) => {
      if (undefined != window) {
        setLinesTop(window.scrollY / 2)
      }
    })
  }, [])


  return (
    <>
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
            <div className={`col-lg-6 col-xl-6 auto-height`}>
              <div className={s.leftCol}>
              <div class="offer_badge">
                <div class="event_name">
                    <span>CHRISTMAS </span>
                    <span>& NEW YEAR</span>
                    <span class="blue_text">OFFER</span>                    
                </div>
                <div class="discount_wrap">
                    <span>Flat</span>
                    <div class="discount">
                        40% Off
                    </div>
                    <span>ON All Courses.</span>
                </div>
            </div>
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
                <div class="terms_conditions">
                  <p>Christmas & New Year Offer Terms and Conditions:</p>
                  <ul>
                    <li><strong>Flat 40% Discount:</strong> Available only while the offer is active. No additional discounts apply.</li>
                    <li><strong>Automatic Discount:</strong> No coupon code required. Discount is applied automatically upon form submission.</li>
                    <li><strong>Non-Transferable:</strong> The discount is non-transferable and applies only to the individual enrolling during the promotion.</li>
                  </ul>
                </div>
                {!!block?.nextBatchDate && <div className={`${s.subtitle}`}>{parse(block?.nextBatchDate)}</div>}

                <div className={s.buttonsWrapper}>
                  <div>
                    <ButtonCta block={block?.scheduleButton} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <Form page={title} block={block?.form} />
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default HeroEnroll;
