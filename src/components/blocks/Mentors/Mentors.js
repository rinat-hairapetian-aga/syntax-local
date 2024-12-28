
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React, { useRef } from "react";
import { useInViewport } from 'react-in-viewport';
import Slider from "react-slick";

import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./Mentors.module.css";

const Mentors = ({ block }) => {
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

  const sliderSettings = {
    className: 'side-arrows mx-lg-3',
    dots: false,
    arrows: true,
    infinite: true,
    swipeToSlide: true,
    lazyLoad: false,
    autoplay: false,
    slidesToShow: 3,
    centerMode: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  let styles = {}

  if (!!block?.bgColor) {
    styles['--bg-color'] = block?.bgColor;
  }

  const linesImage = {
    data: block.linesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImage?.altText || ``,
  };

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} style={styles} ref={blockRef}>
        {enterCount > 0 && <>
          {(true == bp.lg && !!linesImage?.data) &&
            <GatsbyImage
              loading="eager"
              placeholder="dominantColor"
              className={s.lines}
              image={linesImage.data}
              alt={linesImage.alt} />
          }
          <div className="container position-relative">
            <div className="row justify-content-center">
              <div className="col-12">
                {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
              </div>
            </div>
          </div>
          {block?.mentors?.length > 0 && <>
            {(true == bp?.xxl && block?.mentors?.length < 3)
              ? <div className="container">
                <div className="row justify-content-center">
                  {block?.mentors?.map((item, i) => {
                    return <div className="col-md-6 col-lg-5 col-xl-4" key={i} ><Mentor mentor={item?.mentor} /></div>
                  })}
                </div>
              </div>
              : <div className="container px-0 px-md-3">
                <Slider {...sliderSettings}>
                  {block?.mentors?.map((item, i) => {
                    return <Mentor mentor={item?.mentor} key={i} />
                  })}
                </Slider>
              </div>
            }
          </>
          }
          {!!block?.button?.link?.url && <div className="container position-relative">
            <div className="row justify-content-center">
              <div className="col-lg-12 pb-4 pt-4 pt-lg-5 d-flex justify-content-center">
                <ButtonCta block={block?.button} className={``} />
              </div>
            </div>
          </div>}
        </>}
      </section>
    </>
  );
};

export default Mentors;

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} custom-button`}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="37" height="8" viewBox="0 0 37 8" fill="none">
        <path d="M36.5816 4.66069C36.7768 4.46542 36.7768 4.14884 36.5816 3.95358L33.3996 0.771598C33.2043 0.576336 32.8878 0.576336 32.6925 0.771598C32.4972 0.96686 32.4972 1.28344 32.6925 1.4787L35.5209 4.30713L32.6925 7.13556C32.4972 7.33082 32.4972 7.6474 32.6925 7.84267C32.8878 8.03793 33.2043 8.03793 33.3996 7.84267L36.5816 4.66069ZM0.228027 4.80713L36.228 4.80713L36.228 3.80713L0.228027 3.80713L0.228027 4.80713Z" fill="#0B1B3B" />
      </svg>
    </button>
  );
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} custom-button`}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="8" viewBox="0 0 38 8" fill="none">
        <path d="M0.874474 4.66069C0.679211 4.46542 0.679211 4.14884 0.874474 3.95358L4.05645 0.771598C4.25172 0.576336 4.5683 0.576336 4.76356 0.771598C4.95882 0.96686 4.95882 1.28344 4.76356 1.4787L1.93513 4.30713L4.76356 7.13556C4.95882 7.33082 4.95882 7.6474 4.76356 7.84267C4.5683 8.03793 4.25172 8.03793 4.05645 7.84267L0.874474 4.66069ZM37.228 4.80713L1.22803 4.80713L1.22803 3.80713L37.228 3.80713L37.228 4.80713Z" fill="#0B1B3B" />
      </svg>
    </button>
  );
}

const Mentor = ({ mentor }) => {
  let image = {
    data: mentor?.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: mentor?.featuredImage?.node?.altText || ``,
  }

  let companyLogo = {
    data: mentor?.acfMentor?.companyLogo?.localFile?.childImageSharp?.gatsbyImageData,
    alt: mentor?.acfMentor?.companyLogo?.altText || ``,
  }

  return <div className={s.mentorWrapper}>
    <div>

      {!!image?.data && <GatsbyImage
        loading="eager"
        placeholder="dominantColor"
        className={'w-100'}
        image={image.data}
        alt={image.alt} />}
      <div className={s.mentorInfo}>
        <div className={s.name}>{parse(mentor?.title)}</div>
        {!!mentor?.acfMentor?.position && <div className={s.position}>{parse(mentor?.acfMentor?.position)}</div>}
        {mentor?.acfMentor?.skills?.length > 0 && <div className={s.skillsWrapper}>
          {mentor?.acfMentor?.skills?.map((skill, i) => {
            return <div className={`${s.skill} ${s[skill?.style]}`} key={i}>
              {'left' == skill?.style && <LeftSkill />}
              {'center' == skill?.style && <CenterSkill />}
              {'right' == skill?.style && <RightSkill />}
              <span>{parse(skill?.title)}</span>
            </div>
          })}
        </div>}
        {!!mentor?.acfMentor?.description && <div className={s.description}>{parse(mentor?.acfMentor?.description)}</div>}
      </div>
    </div>
    {!!companyLogo?.data && <div className={`${s.companyLogoWrapper} d-flex justify-content-end`} style={{
      // marginBottom: '-35px',
      // marginTop: '25px'
    }}>
      <GatsbyImage
        loading="eager"
        placeholder="dominantColor"
        className={'mw-100'}
        image={companyLogo.data}
        alt={companyLogo.alt} />
    </div>}
  </div>
}

const LeftSkill = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="108" height="27" viewBox="0 0 108 27" fill="none" preserveAspectRatio="none">
    <path d="M97.5123 24.4613C97.019 25.5166 95.9595 26.1909 94.7946 26.1909H3.45901C1.80215 26.1909 0.459007 24.8478 0.459007 23.1909V3.30701C0.459007 1.65015 1.80215 0.307007 3.45901 0.307007H104.089C106.285 0.307007 107.737 2.58829 106.807 4.5774L97.5123 24.4613Z" fill="url(#paint0_linear_3541_1067)" />
    <defs>
      <linearGradient id="paint0_linear_3541_1067" x1="84.476" y1="13.2481" x2="0.45928" y2="13.2481" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0994D1" />
        <stop offset="1" stopColor="#0546FA" />
      </linearGradient>
    </defs>
  </svg>
}


const CenterSkill = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="64" height="27" viewBox="0 0 64 27" fill="none" preserveAspectRatio="none">
    <path d="M10.1096 2.03674C10.6029 0.981456 11.6625 0.307129 12.8274 0.307129H51.8171C53.0299 0.307129 54.1235 1.03742 54.5881 2.15771L62.8358 22.0416C63.6552 24.0171 62.2034 26.191 60.0647 26.191H3.53276C1.33707 26.191 -0.114778 23.9098 0.815017 21.9206L10.1096 2.03674Z" fill="url(#paint0_linear_3550_1073)" />
    <defs>
      <linearGradient id="paint0_linear_3550_1073" x1="15.7944" y1="13.25" x2="99.8111" y2="13.25" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0994D1" />
        <stop offset="1" stopColor="#0546FA" />
      </linearGradient>
    </defs>
  </svg>
}
const RightSkill = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="80" height="27" viewBox="0 0 80 27" fill="none" preserveAspectRatio="none">
    <path d="M0.71729 4.51188C-0.151948 2.52955 1.30023 0.307129 3.46476 0.307129L76.3489 0.307129C78.0057 0.307129 79.3489 1.65027 79.3489 3.30713V23.191C79.3489 24.8479 78.0057 26.191 76.3489 26.191H12.1837C10.9927 26.191 9.91454 25.4865 9.43626 24.3958L0.71729 4.51188Z" fill="url(#paint0_linear_3550_1076)" />
    <defs>
      <linearGradient id="paint0_linear_3550_1076" x1="24.1089" y1="13.25" x2="108.126" y2="13.25" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0994D1" />
        <stop offset="1" stopColor="#0546FA" />
      </linearGradient>
    </defs>
  </svg>
}