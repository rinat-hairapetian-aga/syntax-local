
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import parse from "html-react-parser";
import React, { useRef } from "react";
import { useInViewport } from 'react-in-viewport';

import ButtonCta from './../../buttonCta/buttonCta';
import MainReview from './MainReview';
import * as s from "./Reviews.module.css";
import ReviewsSlider from './ReviewsSlider';

const Reviews = ({ block }) => {
  const bp = useBreakpoint();

  const blockRef = useRef();
  const {
    inViewport,
    enterCount,
    leaveCount,
  } = useInViewport(
    blockRef,
    {},
    { disconnectOnLeave: false },
    {}
  );

  const styles = {
    '--bg-color': block?.bgColor,
    '--text-color': block?.textColor,
  }

  const [reviews, setReviews] = React.useState([...block?.reviews])

  React.useEffect(() => {
    if (false == bp?.lg && !!block?.mainReview) {
      setReviews([{ review: { ...block?.mainReview } }, ...block?.reviews]);
    } else {
      if (true == bp?.lg) {
        setReviews([...block?.reviews]);
      }
    }
  }, [bp?.lg])

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} style={styles} ref={blockRef}>
        {enterCount > 0 && <>
          <div className="container position-relative">
            <div className="row">
              <div className='col-12'>
                {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
              </div>
            </div>
          </div>
          {(true == bp?.lg && !!block?.mainReview) && <div className="mb-5"><MainReview review={block?.mainReview} styles={styles} /></div>}
          <div className={`${!!block?.link?.url ? 'mb-5' : ''}`}><ReviewsSlider reviews={reviews} styles={styles} /></div>
          {!!block?.button?.link?.url &&
            <div className="container position-relative pt-4">
              <div className="row">
                <div className='d-flex justify-content-center'>
                  <ButtonCta block={block?.button}></ButtonCta>
                </div>
              </div>
            </div>}
        </>}
      </section>
    </>
  );
};

export default Reviews;
