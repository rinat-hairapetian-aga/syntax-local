import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";

import zapiers from '../../../utils/zapiers';
import makeZapierRequest from './../../../utils/zapierRequests';
import ButtonCta from './../../buttonCta/buttonCta';
import * as s from "./CareerPathForm.module.css";


const CareerPathForm = ({ block, course }) => {
  const bp = useBreakpoint();


  const topBgDesktop = {
    data: block.topBgDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.topBgDesktop?.altText || ``,
  };
  const topBgMobile = {
    data: block.topBgMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.topBgMobile?.altText || ``,
  };

  const topBorderDesktop = {
    data: block.topBorderDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.topBorderDesktop?.altText || ``,
  };
  const topBorderMobile = {
    data: block.topBorderMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.topBorderMobile?.altText || ``,
  };

  const bgImageDesktop = {
    data: block.bgImageDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgImageDesktop?.altText || ``,
  };
  const bgImageMobile = {
    data: block.bgImageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgImageMobile?.altText || ``,
  };

  const bottomBorderDesktop = {
    data: block.bottomBorderDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottomBorderDesktop?.altText || ``,
  };
  const bottomBorderMobile = {
    data: block.bottomBorderMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottomBorderMobile?.altText || ``,
  };


  const rightImage = {
    data: block.image?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.image?.altText || ``,
  };

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <section className={`${s.block}`} id={block?.blockId} >

      {(true == bp.lg && !!topBorderDesktop?.data) && <>
        <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          objectFit='fill'
          className={`w-100 d-block`}
          style={{ marginBottom: '-2px' }}
          image={topBorderDesktop.data}
          alt={topBorderDesktop.alt} />
      </>}
      {(false == bp.lg && !!topBorderMobile?.data) && <>
        <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          objectFit='fill'
          className={`w-100 d-block`}
          style={{ marginBottom: '-2px' }}
          image={topBorderMobile.data}
          alt={topBorderMobile.alt} />
      </>}

      <div className={s.sectionContentWrapper}>
        {(true == bp.lg && !!bgImageDesktop?.data) && <>
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={s.bg}
            image={bgImageDesktop.data}
            alt={bgImageDesktop.alt} />
        </>}
        {(false == bp.lg && !!bgImageMobile?.data) && <>
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={s.bg}
            image={bgImageMobile.data}
            alt={bgImageMobile.alt} />
        </>}

        {(true == bp.lg && !!topBgDesktop?.data) && <>
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            objectFit='fill'
            className={s.topBg}
            image={topBgDesktop.data}
            alt={topBgDesktop.alt} />
        </>}
        {(false == bp.lg && !!topBgMobile?.data) && <>
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            objectFit='fill'
            className={s.topBg}
            image={topBgMobile.data}
            alt={topBgMobile.alt} />
        </>}
        <div className='container position-relative'>
          <div className='row justify-content-center'>
            <div className='col-xxl-10'>
              <div className={s.wrapper}>
                <div className='row mx-0'>
                  {true == bp.lg && <div className='col-lg-6'>
                    <h2 className={s.title}>{parse(block?.title)}</h2>
                    {!!block?.subtitle && <div className={s.subtitle}>{parse(block?.subtitle)}</div>}
                    <Form block={block} course={course} />
                  </div>}
                  <div className='col-lg-6'>
                    {false == bp.lg && <>
                      <h2 className={s.title}>{parse(block?.title)}</h2>
                      {!!block?.subtitle && <div className={s.subtitle}>{parse(block?.subtitle)}</div>}
                    </>}
                    {(!!rightImage?.data) && <div className='d-flex justify-content-center'>
                      <GatsbyImage
                        loading="eager"
                        placeholder="dominantColor"
                        className={'mw-100'}
                        image={rightImage.data}
                        alt={rightImage.alt} />
                    </div>}
                    {false == bp.lg && <>
                      <ButtonCta onClick={() => { setModalShow(true) }} block={block?.submitButton} className={'w-100 mt-3'}>
                        <span className="me-2">Download PDF</span>
                        <svg className='me-1' width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.5 15.925C3.98333 15.925 2.68733 15.4 1.612 14.35C0.536667 13.3 -0.000666047 12.0167 6.19579e-07 10.5C6.19579e-07 9.2 0.391667 8.04167 1.175 7.025C1.95833 6.00833 2.98333 5.35833 4.25 5.075C4.63333 3.725 5.346 2.59167 6.388 1.675C7.43 0.758334 8.634 0.2 10 0V8.075L8.4 6.525L7 7.925L11 11.925L15 7.925L13.6 6.525L12 8.075V0C13.7167 0.233333 15.146 1.00433 16.288 2.313C17.43 3.62167 18.0007 5.159 18 6.925C19.15 7.05833 20.1043 7.55433 20.863 8.413C21.6217 9.27167 22.0007 10.2757 22 11.425C22 12.675 21.5623 13.7377 20.687 14.613C19.8117 15.4883 18.7493 15.9257 17.5 15.925H5.5Z" fill={block?.submitButton?.textColor} />
                        </svg>
                      </ButtonCta>

                      {!!modalShow && <>
                        <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 10006 }} aria-hidden="false">
                          <div className="modal-backdrop fade show" style={{ zIndex: 1 }} onClick={() => { setModalShow(false) }}></div>
                          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" style={{ zIndex: 2 }}>
                            <div className="modal-content">
                              <div className="d-flex justify-content-end pt-3 pe-3">
                                <button type="button" className="btn-close" onClick={() => { setModalShow(false) }}></button>
                              </div>
                              <div className="modal-body">
                                <h2 className={s.title}>{parse(block?.title)}</h2>
                                <Form block={block} reportTitle={block?.title} course={course} onSubmit={() => { setModalShow(false) }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                      }
                    </>}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {(true == bp.lg && !!bottomBorderDesktop?.data) && <>
        <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          objectFit='fill'
          className={`w-100`}
          style={{ marginTop: '-2px' }}
          image={bottomBorderDesktop.data}
          alt={bottomBorderDesktop.alt} />
      </>}
      {(false == bp.lg && !!bottomBorderMobile?.data) && <>
        <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          objectFit='fill'
          className={`w-100`}
          style={{ marginTop: '-2px' }}
          image={bottomBorderMobile.data}
          alt={bottomBorderMobile.alt} />
      </>}
    </section>
  );
};

export default CareerPathForm;


const Form = ({ block, reportTitle, course, onSubmit }) => {


  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [acceptChecked, setAcceptChecked] = React.useState(true);
  const [errors, setErrors] = React.useState({
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
  });
  const [messageSent, setMessageSent] = React.useState(false);

  const handleAcceptCheckboxChange = (e) => {
    setAcceptChecked(e.target.checked);
  }

  const submitForm = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      setMessageSent(true);

      const queryParams = JSON.parse(sessionStorage.getItem("queryParams"));
      const lines = [];
      try {
        for (var x in queryParams) {
          lines.push(`*${x}:* ${queryParams[x]}`)
        }
      } catch (e) { }

      let payloadForm = {
        event: 'formSubmit',
        type: zapiers.downloadCareerPathReport.type,
        source: "syntax",
        utm_source: queryParams?.utm_source || "",
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        subscribeToNewsLetter: acceptChecked,
        page: course,
        reportTitle: reportTitle,
      };
      makeZapierRequest(payloadForm)

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setErrors({
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
      });

      const element = document.createElement("a");
      element.href = block?.pdf?.localFile?.publicURL;
      element.download = block?.pdf?.localFile?.base;
      element.click();

      if ('function' == typeof onSubmit) {
        onSubmit();
      }
    }
  }

  const isValidForm = () => {
    let isValid = true;
    let newErrors = {
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
    };

    if (!firstName?.length) {
      isValid = false;
      newErrors.firstName = 'Please enter Your First Name';
    }

    if (!lastName?.length) {
      isValid = false;
      newErrors.lastName = 'Please enter Your Last Name';
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

  return <>
    <form className="website-form download-career-path row" onSubmit={submitForm}>
      <input type="hidden" name="type" value={zapiers.downloadCareerPathReport.type} readOnly />
      <input type="hidden" name="event" value='formSubmit' readOnly />
      <input type="hidden" name="source" value='syntax' readOnly />
      <input type="hidden" name="course" value={course} readOnly />
      <input type="hidden" name="report_title" value={reportTitle} readOnly />
      <div className="col-lg-6 pr-lg-2">
        <div className={`${s.labelInputGroup}`}>
          <label>First Name</label>
          <div>
            <input
              required
              type="text"
              name="firstname"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="Your First Name" />
            {null != errors.firstName && <small>{errors.firstName}</small>}
          </div>
        </div>
      </div>
      <div className="col-lg-6 pl-lg-2">
        <div className={`${s.labelInputGroup}`}>
          <label>Last Name</label>
          <div>
            <input
              required
              type="text"
              name="lastname"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="Your Last Name" />
            {null != errors.lastName && <small>{errors.lastName}</small>}
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className={`${s.labelInputGroup} w-100`}>
          <label>Email</label>
          <div>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your Email Address" />
            {null != errors.email && <small>{errors.email}</small>}
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className={`${s.labelInputGroup} w-100`}>
          <label>Phone Number</label>
          <div>
            <input
              required
              type="text"
              name="phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Your Phone Number" />
            {null != errors.phone && <small>{errors.phone}</small>}
          </div>
        </div>
      </div>

      <div className="col-12">
        <label className={`${s.labelCheckboxGroup} w-100`}>
          <input type="checkbox" name="subscribeToNewsLetter" checked={acceptChecked} onChange={handleAcceptCheckboxChange} />
          Subscribe to Syntax Newsletter
        </label>
      </div>
      <div className="col-12">
        <ButtonCta onClick={(e) => { }} type={'submit'} block={block?.submitButton} className={'d-flex align-items-center justify-content-center'}>
          <span className="me-2">Download PDF</span>
          <svg className='me-1' width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 15.925C3.98333 15.925 2.68733 15.4 1.612 14.35C0.536667 13.3 -0.000666047 12.0167 6.19579e-07 10.5C6.19579e-07 9.2 0.391667 8.04167 1.175 7.025C1.95833 6.00833 2.98333 5.35833 4.25 5.075C4.63333 3.725 5.346 2.59167 6.388 1.675C7.43 0.758334 8.634 0.2 10 0V8.075L8.4 6.525L7 7.925L11 11.925L15 7.925L13.6 6.525L12 8.075V0C13.7167 0.233333 15.146 1.00433 16.288 2.313C17.43 3.62167 18.0007 5.159 18 6.925C19.15 7.05833 20.1043 7.55433 20.863 8.413C21.6217 9.27167 22.0007 10.2757 22 11.425C22 12.675 21.5623 13.7377 20.687 14.613C19.8117 15.4883 18.7493 15.9257 17.5 15.925H5.5Z" fill={block?.submitButton?.textColor} />
          </svg>
        </ButtonCta>
      </div>
    </form>
  </>
}
