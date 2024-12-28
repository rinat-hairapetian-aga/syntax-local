
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import Slider from "react-slick";

import { isDark } from '../../../utils/brightness';
import YoutubeVideo from '../../youtubeVideo/youtubeVideo';
import * as s from "./ReviewsSlider.module.css";

const ReviewsSlider = ({ reviews, styles }) => {

  const sliderSettings = {
    className: 'bottom-arrows mobile-dots mx-lg-3',
    dots: false,
    arrows: true,
    nextArrow: <NextArrow styles={styles} />,
    prevArrow: <PrevArrow styles={styles} />,
    infinite: true,
    swipeToSlide: true,
    lazyLoad: false,
    autoplay: false,
    centerMode: false,
    variableWidth: true,
    dotsClass: `slick-dots ${!isDark(styles['--bg-color'], 128) ? 'dark' : ''}`,
    responsive: [
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
          variableWidth: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          dots: true,
          arrows: false,
          variableWidth: false,
        },
      },
    ],
  };

  return (
    <>
      <div className={`${s.block}`} style={styles}>
        {reviews?.length > 0 && <Slider {...sliderSettings}>
          {reviews?.map((item, i) => {
            return <Review review={item?.review} key={i} />
          })}
        </Slider>}
      </div>
    </>
  );
};

export default ReviewsSlider;

const Stars = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="78" height="16" viewBox="0 0 78 16" fill="none">
    <path d="M8.45762 0.0722656L10.1925 5.4116L15.8066 5.4116L11.2647 8.71149L12.9995 14.0508L8.45762 10.7509L3.91572 14.0508L5.65057 8.71149L1.10866 5.4116L6.72277 5.4116L8.45762 0.0722656Z" fill="#FDDA00" />
    <path d="M39.3639 0.0722656L41.0987 5.4116L46.7128 5.4116L42.1709 8.71149L43.9058 14.0508L39.3639 10.7509L34.822 14.0508L36.5568 8.71149L32.0149 5.4116L37.629 5.4116L39.3639 0.0722656Z" fill="#FDDA00" />
    <path d="M23.9107 0.0722656L25.6456 5.4116L31.2597 5.4116L26.7178 8.71149L28.4527 14.0508L23.9107 10.7509L19.3688 14.0508L21.1037 8.71149L16.5618 5.4116L22.1759 5.4116L23.9107 0.0722656Z" fill="#FDDA00" />
    <path d="M54.8209 0.0722656L56.5558 5.4116L62.1699 5.4116L57.628 8.71149L59.3628 14.0508L54.8209 10.7509L50.279 14.0508L52.0139 8.71149L47.4719 5.4116L53.0861 5.4116L54.8209 0.0722656Z" fill="#FDDA00" />
    <path d="M70.2779 0.0722656L72.0128 5.4116L77.6269 5.4116L73.085 8.71149L74.8198 14.0508L70.2779 10.7509L65.736 14.0508L67.4709 8.71149L62.929 5.4116L68.5431 5.4116L70.2779 0.0722656Z" fill="#FDDA00" />
  </svg>
}

const Review = ({ review }) => {
  const bp = useBreakpoint();

  let desktopImage = {
    data: review?.acfTestimonial?.desktopImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: review?.acfTestimonial?.desktopImage?.altText || ``,
  }

  let mobileImage = {
    data: review?.acfTestimonial?.mobileImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: review?.acfTestimonial?.mobileImage?.altText || ``,
  }

  let gatsbyDesktopImage = <GatsbyImage
    loading="eager"
    placeholder="dominantColor"
    className={`mw-100`}
    image={desktopImage.data}
    alt={desktopImage.alt} />;
  let gatsbyMobileImage = !!mobileImage?.data
    ? <GatsbyImage
      objectFit='cover'
      loading="eager"
      placeholder="dominantColor"
      className={`mw-100`}
      image={mobileImage.data}
      alt={mobileImage.alt} />
    : gatsbyDesktopImage;

  return <div className={s.reviewWrapper}>
    {(true == bp?.lg && !!desktopImage?.data) && <div className={s.imageWrapper}>
      {gatsbyDesktopImage}
    </div>}
    {(false == bp?.lg && !!desktopImage?.data) && <div className={s.imageWrapper}>
      {!!review?.acfTestimonial?.youtubeVideoId
        ? <><YoutubeVideo
          imageUrl={!!mobileImage?.data ? mobileImage : desktopImage}
          videoId={review?.acfTestimonial?.youtubeVideoId}
          sectionStyles={{ maxHeight: 'auto', height: 'auto', width: '100%', aspectRatio: '1/1' }}
          wrapperStyles={{ maxHeight: 'auto', height: 'auto', width: '100%', aspectRatio: '1/1' }}
          placeholderStyles={{ maxHeight: 'auto', height: 'auto', width: '100%', aspectRatio: '1/1' }}
        />
        </>
        : <>
          {gatsbyMobileImage}
        </>
      }
    </div>}
    <div className={s.info}>
      {true == bp?.lg && <>
        <div className={s.name}>{review?.title}</div>
        {!!review?.acfTestimonial?.position && <div className={s.position}>{parse(review?.acfTestimonial?.position)}</div>}
        {!!review?.acfTestimonial?.review && <div className={s.review}>{parse(review?.acfTestimonial?.review)}</div>}
      </>}
      {false == bp?.lg && <>
        {!!review?.acfTestimonial?.title && <div className={s.title}>{parse(review?.acfTestimonial?.title)}</div>}
        {!!review?.acfTestimonial?.review && <div className={s.review}>{parse(review?.acfTestimonial?.review)}</div>}
        <div className={s.name}>{review?.title}</div>
        <Stars />
      </>}
    </div>

  </div>
}

const NextArrow = (props) => {
  const { className, style, onClick, styles } = props;
  return (
    <button
      className={`${className} custom-button`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="37" height="8" viewBox="0 0 37 8" fill="none">
        <path d="M36.5816 4.66069C36.7768 4.46542 36.7768 4.14884 36.5816 3.95358L33.3996 0.771598C33.2043 0.576336 32.8878 0.576336 32.6925 0.771598C32.4972 0.96686 32.4972 1.28344 32.6925 1.4787L35.5209 4.30713L32.6925 7.13556C32.4972 7.33082 32.4972 7.6474 32.6925 7.84267C32.8878 8.03793 33.2043 8.03793 33.3996 7.84267L36.5816 4.66069ZM0.228027 4.80713L36.228 4.80713L36.228 3.80713L0.228027 3.80713L0.228027 4.80713Z" fill={styles['--text-color']} />
      </svg>
    </button>
  );
}

const PrevArrow = (props) => {
  const { className, style, onClick, styles } = props;
  return (
    <button
      className={`${className} custom-button`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="8" viewBox="0 0 38 8" fill="none">
        <path d="M0.874474 4.66069C0.679211 4.46542 0.679211 4.14884 0.874474 3.95358L4.05645 0.771598C4.25172 0.576336 4.5683 0.576336 4.76356 0.771598C4.95882 0.96686 4.95882 1.28344 4.76356 1.4787L1.93513 4.30713L4.76356 7.13556C4.95882 7.33082 4.95882 7.6474 4.76356 7.84267C4.5683 8.03793 4.25172 8.03793 4.05645 7.84267L0.874474 4.66069ZM37.228 4.80713L1.22803 4.80713L1.22803 3.80713L37.228 3.80713L37.228 4.80713Z" fill={styles['--text-color']} />
      </svg>
    </button>
  );
}