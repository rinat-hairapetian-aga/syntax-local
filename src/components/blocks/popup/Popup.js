import { graphql, navigate, useStaticQuery } from "gatsby";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";

import zapiers from "../../../utils/zapiers";
import makeZapierRequest from "../../../utils/zapierRequests";
import { GatsbyImage } from "gatsby-plugin-image";
import { FreeWebinarSVG, PopupDiscountBGSvg } from "../../../utils/svgs";
import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./Popup.module.css";


const Popup = ({ block, page }) => {
  const { wp: { themeGeneralSettings: { themeSettings: { globalPopup } } } } = useStaticQuery(graphql`
    query GlobalPopupQuery {
      wp {
        themeGeneralSettings {
          themeSettings {
            globalPopup {
              show
              timeDelay
              popup {
                ... on WpPopup {
                  id
                  title
                  template {
                    ... on WpTemplate_WebinarPopup {
                      templateName
                      acfPopupWebinar {
                        webinarPopup {
                          linesImage {
                            altText
                            localFile {
                              childImageSharp {
                                gatsbyImageData(quality: 100)
                              }
                            }
                          }
                          title
                          speakers {
                            title
                            speakers {
                              ... on WpMentor {
                                title
                                featuredImage {
                                  node {
                                    altText
                                    localFile {
                                      childImageSharp {
                                        gatsbyImageData(quality: 100)
                                      }
                                    }
                                  }
                                }
                                acfMentor {
                                  position
                                }
                              }
                            }
                          }
                          button {
                            color
                            hoverColor
                            textColor
                            link {
                              url
                              title
                            }
                          }
                        }
                      }
                    }
                    ... on WpTemplate_EnrollPopup {
                      templateName
                      acfPopupEnroll {
                        enrollPopup {
                          title
                          topLinesImage {
                            altText
                            localFile {
                              childImageSharp {
                                gatsbyImageData(quality: 100)
                              }
                            }
                          }
                          discount
                          discountColorStart
                          discountColorStop
                          couponCode
                          linesImage {
                            altText
                            localFile {
                              childImageSharp {
                                gatsbyImageData(quality: 100)
                              }
                            }
                          }
                          ctaTitle
                          ctaSubtitle
                          button {
                            color
                            hoverColor
                            textColor
                            link {
                              target
                              title
                              url
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const [modalShow, setModalShow] = useState(false);

  let gloabal_popup_data = globalPopup;

  if (!!block?.useLocal) {
    gloabal_popup_data = { ...block, show: true };
  }

  if ('Default' == gloabal_popup_data?.popup?.template?.templateName || true != gloabal_popup_data?.show) {
    return <></>
  }

  const showModal = () => {
    document.getElementsByTagName('body')[0].classList.add("overflow-hidden");
    window.dataLayer.push({
      event: "PopupOpened",
      source: "syntax",
    });
    setModalShow(true);
  }

  const hideModal = () => {
    document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
    window.dataLayer.push({
      event: "PopupClosed",
      source: "syntax",
    });
    sessionStorage.setItem('popupClosed', true);
    setModalShow(false);
  }

  const handleButtonCLick = (uri) => {
    window.dataLayer.push({
      event: "PopupButtonClicked",
      source: "syntax",
    });
    sessionStorage.setItem('popupClosed', true);
    setModalShow(false);
    document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
    navigate(uri);
  }

  let popup_data = {};
  switch (gloabal_popup_data?.popup?.template?.templateName) {
    case "Webinar Popup":
      popup_data = gloabal_popup_data?.popup?.template?.acfPopupWebinar?.webinarPopup;
      break;
    case "Enroll Popup":
      popup_data = gloabal_popup_data?.popup?.template?.acfPopupEnroll?.enrollPopup;
      break;
    default:
      break;
  }


  useEffect(() => {
    if (gloabal_popup_data?.show) {
      let timerFunc = setTimeout(() => {
        let popupClosed = JSON.parse(sessionStorage.getItem('popupClosed'));
        console.log('setTimeout fired', popupClosed);
        if (!popupClosed) {
          showModal();
        }
      }, gloabal_popup_data?.timeDelay * 1000);

      return () => clearTimeout(timerFunc);
    }
  }, []);


  return (
    <>
      {modalShow && <div className={`${s.block}`}>
        <div className={`${s.modalBg}`} ></div>

        <div className={s.wrapper}>
          <div className={s.close} onClick={hideModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g clipPath="url(#clip0_5804_4417)">
                <path d="M0.293031 0.29299C0.480558 0.105519 0.734866 0.000203172 1.00003 0.000203172C1.26519 0.000203172 1.5195 0.105519 1.70703 0.29299L8.00003 6.58599L14.293 0.29299C14.3853 0.197479 14.4956 0.121297 14.6176 0.0688882C14.7396 0.0164792 14.8709 -0.011107 15.0036 -0.0122608C15.1364 -0.0134146 15.2681 0.0118871 15.391 0.0621679C15.5139 0.112449 15.6255 0.186702 15.7194 0.280595C15.8133 0.374487 15.8876 0.486139 15.9379 0.609036C15.9881 0.731932 16.0134 0.863612 16.0123 0.996391C16.0111 1.12917 15.9835 1.26039 15.9311 1.38239C15.8787 1.5044 15.8025 1.61474 15.707 1.70699L9.41403 7.99999L15.707 14.293C15.8892 14.4816 15.99 14.7342 15.9877 14.9964C15.9854 15.2586 15.8803 15.5094 15.6948 15.6948C15.5094 15.8802 15.2586 15.9854 14.9964 15.9877C14.7342 15.9899 14.4816 15.8891 14.293 15.707L8.00003 9.41399L1.70703 15.707C1.51843 15.8891 1.26583 15.9899 1.00363 15.9877C0.741433 15.9854 0.49062 15.8802 0.305212 15.6948C0.119804 15.5094 0.014635 15.2586 0.0123566 14.9964C0.0100781 14.7342 0.110873 14.4816 0.293031 14.293L6.58603 7.99999L0.293031 1.70699C0.10556 1.51946 0.000244141 1.26515 0.000244141 0.99999C0.000244141 0.734825 0.10556 0.480517 0.293031 0.29299Z" fill="#0B1B3B" />
              </g>
              <defs>
                <clipPath id="clip0_5804_4417">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          {"Webinar Popup" == gloabal_popup_data?.popup?.template?.templateName && <WebinarPopup block={popup_data} handleButtonCLick={handleButtonCLick} />}
          {"Enroll Popup" == gloabal_popup_data?.popup?.template?.templateName && <EnrollPopup block={popup_data} handleButtonCLick={handleButtonCLick} />}
        </div>
      </div>
      }
    </>
  );
};

export default Popup;


const WebinarPopup = ({ block, handleButtonCLick }) => {

  const linesImage = {
    data: block.linesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImage?.altText || ``,
  };
  return <>
    <div className={s.webinar}>
      {(linesImage?.data) && <>
        <GatsbyImage
          loading="eager"
          placeholder="blurred"
          className={`${s.bg}`}
          image={linesImage.data}
          alt={linesImage.alt} />
      </>}
      <div className="position-relative">

        <div>
          <div className="d-flex justify-content-center"><FreeWebinarSVG /></div>
          <h2 className={s.title}>{parse(block?.title ?? '')}</h2>
        </div>

        {block?.speakers?.speakers?.length > 0 && <div className="d-flex justify-content-center mb-3 pb-2" style={{ gap: '26px' }}>
          {block?.speakers?.speakers?.map((item, i) => {
            return <Mentor mentor={item} key={i} />
          })}
        </div>}

        <div className={'w-100 d-flex align-items-center justify-content-center'}>
          <ButtonCta onClick={() => handleButtonCLick(block?.button?.link?.url)} type={'button'} block={block?.button} >
            <span className="me-2">{parse(block?.button?.link?.title)}</span>
          </ButtonCta>
        </div>
      </div>
    </div>
  </>
}

const EnrollPopup = ({ block, handleButtonCLick }) => {

  const topLinesImage = {
    data: block.topLinesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.topLinesImage?.altText || ``,
  };
  const linesImage = {
    data: block.linesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImage?.altText || ``,
  };
  return <>
    <div className={s.enroll}>
      {(topLinesImage?.data) && <>
        <GatsbyImage
          loading="eager"
          placeholder="blurred"
          className={`${s.bg}`}
          image={topLinesImage.data}
          alt={topLinesImage.alt} />
      </>}
      <div className="position-relative custom_popup">
        <div className={s.infoWrapper}>
          <div className="d-flex popup_heading justify-content-center pt-3">
            {!!block?.discount && <div className={s.discount}>
              <PopupDiscountBGSvg rect1StartColor={block?.discountColorStart} rect1StopColor={block?.discountColorStop} />
              <span className="title_text">{parse(block?.title ?? '')}</span>
            </div>}
          </div>
          <div>
            <p>{parse(block?.ctaTitle)}</p>
            <div className='discount_text'>{parse(block?.discount)}</div>
          </div>
        </div>

        <div className={`${s.ctaWrapper} w-100`}>
          {(linesImage?.data) && <>
            <GatsbyImage
              loading="eager"
              placeholder="blurred"
              className={`${s.bg} mw-100`}
              image={linesImage.data}
              alt={linesImage.alt} />
          </>}
          <div className="w-100">
              <DownloadForm pdf_URL={block?.button?.link?.url}></DownloadForm>
          </div>
        </div>
      </div>
    </div>
  </>
}

const Mentor = ({ mentor }) => {
  let image = {
    data: mentor?.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: mentor?.featuredImage?.node?.altText || ``,
  }

  return <div className={s.mentorWrapper}>
    <div>
      {!!image?.data && <GatsbyImage
        loading="eager"
        placeholder="blurred"
        className={'w-100'}
        image={image.data}
        alt={image.alt} />}
      <div className={s.mentorInfo}>
        <div className={s.name}>{parse(mentor?.title)}</div>
        {!!mentor?.acfMentor?.position && <div className={s.position}>{parse(mentor?.acfMentor?.position)}</div>}
      </div>
    </div>
  </div>
}


const DownloadForm = ({pdf_URL}) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pdf_download, setPDFdownload] = useState("yes");
  const [pdf_download_no, setPDFdownloadNo] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [errors, setErrors] = React.useState({
    name: null,
    email: null,
    phone: null,
  });
  
  const submitForm = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      let type = zapiers.downloadHomeLeadManagement.type;
      if (window.location.href.includes('data-analytics')) {
        type = zapiers.downloadDALeadManagement.type;
    } else if (window.location.href.includes('software-development-engineer')) {
        type = zapiers.downloadSDETLeadManagement.type;
    }
    
      let payloadForm = {
        event: 'formSubmit',
        type: type,
        source: "syntax",
        firstName: name,
        email: email,
        phone: phone,
      };
      makeZapierRequest(payloadForm)
      
      setMessageSent(true);
    
      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setPDFdownload("yes");
      setPDFdownloadNo("");
      setErrors({
        name: null,
        email: null,
        phone: null,
      });
      
      if (pdf_download === "yes") {
        const pdfUrl = pdf_URL;
        window.open(pdfUrl, "_blank");
      }
    }
  };

     
  const isValidForm = () => {
    let isValid = true;
    let newErrors = {
      name: null,
      email: null,
      phone: null,
    };

    if (!name?.length) {
      isValid = false;
      newErrors.name = 'Please enter Your Name';
    }

    if (!isEmailValid(email)) {
      isValid = false;
      newErrors.email = 'Please enter a valid Email';
    }

    if (!isPhoneNumberValid(phone)) {
      isValid = false;
      newErrors.phone = 'Please enter Your Phone Number';
    }

    setErrors(newErrors);
    return isValid;
  }

  const isEmailValid = (email) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }

  const isPhoneNumberValid = (phoneNumber) => {
    const re = /^\+?\d{1,3}?\d{8,}$/;
    return re.test(String(phoneNumber).replace(/[^\d]/g, ''));
  }

  return <div className="download_form">
    <form onSubmit={submitForm}>
      <div className="col-lg-12">
        <div className={`${s.labelInputGroup}`}>
          <label>Enter Name*</label>
          <div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter Name" />
              {null != errors.name && <small>{errors.name}</small>}
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className={`${s.labelInputGroup}`}>
          <label>Enter Email*</label>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter Email" />
              {null != errors.email && <small>{errors.email}</small>}
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className={`${s.labelInputGroup}`}>
          <label>Enter Phone Number*</label>
          <div>
            <input
              type="number"
              name="phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Enter Phone Number" />
              {null != errors.phone && <small>{errors.phone}</small>}
          </div>
        </div>
      </div>
      <div className="col-12 d-flex">
        <label className={`radio_wrap ${s.labelCheckboxGroup}`}>
          <input required checked type="radio" value='yes' onChange={e => setPDFdownload(e.target.value)} name="download_PDF" />
          Yes! I want the PDF
        </label>
        <label className={`radio_wrap ${s.labelCheckboxGroup}`}>
          <input required type="radio" value='No' onChange={e => setPDFdownloadNo(e.target.value)} name="download_PDF" />
          No, I'm not interested
        </label>
      </div>
      <div className="col-12 d-flex justify-content-center">
        <button onClick={() => {  }} type='submit' className={'position-relative'} >
          <span className="me-2">Submit</span>
        </button>
      </div>
    </form>
    {messageSent && <div className="col-12 d-flex message justify-content-center mt-3 text-center">Thank you for submitting.</div>}
  </div>
}