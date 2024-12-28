
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";

import * as s from "./MainReview.module.css";
import YoutubeVideo from './../../youtubeVideo/youtubeVideo';

const MainReview = ({ review, styles }) => {
  const bp = useBreakpoint();

  let desktopImage = {
    data: review?.acfTestimonial?.desktopImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: review?.acfTestimonial?.desktopImage?.altText || ``,
  }

  return (
    <>
      <div className={`${s.block}`} style={styles}>
        <div className="container position-relative">
          <div className="row align-items-center justify-content-between">
            <div className='col-lg-6'>
              {!!review?.acfTestimonial?.youtubeVideoId
                ? <><YoutubeVideo
                  imageUrl={desktopImage}
                  videoId={review?.acfTestimonial?.youtubeVideoId}
                  wrapperStyles={{ maxHeight: '360px' }}
                  placeholderStyles={{ minHeight: '360px' }}
                />
                </>
                : <>
                  {(!!desktopImage?.data) && <>
                    <GatsbyImage
                      loading="eager"
                      placeholder="dominantColor"
                      className={`mw-100`}
                      image={desktopImage.data}
                      alt={desktopImage.alt} />
                  </>}
                </>}
            </div>
            <div className='col-lg-6 col-xxl-5'>
              <div className={s.info}>
                {!!review?.acfTestimonial?.title && <div className={s.title}>"{parse(review?.acfTestimonial?.title)}"</div>}
                {!!review?.acfTestimonial?.review && <div className={s.review}>{parse(review?.acfTestimonial?.review)}</div>}
                <div className='d-flex align-items-center'>
                  <div className={s.name}>{parse(review?.title)}</div>
                  {!!review?.acfTestimonial?.position && <div className={s.position}>
                    | {parse(review?.acfTestimonial?.position)}
                  </div>}
                </div>
                <div>
                  <Stars />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainReview;

const Stars = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="78" height="16" viewBox="0 0 78 16" fill="none">
    <path d="M8.45762 0.0722656L10.1925 5.4116L15.8066 5.4116L11.2647 8.71149L12.9995 14.0508L8.45762 10.7509L3.91572 14.0508L5.65057 8.71149L1.10866 5.4116L6.72277 5.4116L8.45762 0.0722656Z" fill="#FDDA00" />
    <path d="M39.3639 0.0722656L41.0987 5.4116L46.7128 5.4116L42.1709 8.71149L43.9058 14.0508L39.3639 10.7509L34.822 14.0508L36.5568 8.71149L32.0149 5.4116L37.629 5.4116L39.3639 0.0722656Z" fill="#FDDA00" />
    <path d="M23.9107 0.0722656L25.6456 5.4116L31.2597 5.4116L26.7178 8.71149L28.4527 14.0508L23.9107 10.7509L19.3688 14.0508L21.1037 8.71149L16.5618 5.4116L22.1759 5.4116L23.9107 0.0722656Z" fill="#FDDA00" />
    <path d="M54.8209 0.0722656L56.5558 5.4116L62.1699 5.4116L57.628 8.71149L59.3628 14.0508L54.8209 10.7509L50.279 14.0508L52.0139 8.71149L47.4719 5.4116L53.0861 5.4116L54.8209 0.0722656Z" fill="#FDDA00" />
    <path d="M70.2779 0.0722656L72.0128 5.4116L77.6269 5.4116L73.085 8.71149L74.8198 14.0508L70.2779 10.7509L65.736 14.0508L67.4709 8.71149L62.929 5.4116L68.5431 5.4116L70.2779 0.0722656Z" fill="#FDDA00" />
  </svg>
}