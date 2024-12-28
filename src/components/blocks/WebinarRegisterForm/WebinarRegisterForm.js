import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";

import zapiers from '../../../utils/zapiers';
import makeZapierRequest from './../../../utils/zapierRequests';
import ButtonCta from './../../buttonCta/buttonCta';
import * as s from "./WebinarRegisterForm.module.css";


const WebinarRegisterForm = ({ block, course }) => {
  const bp = useBreakpoint();


  const topBorderDesktop = {
    data: block.topBorderDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.topBorderDesktop?.altText || ``,
  };
  const topBorderMobile = {
    data: block.topBorderMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.topBorderMobile?.altText || ``,
  };

  const bottomBorderDesktop = {
    data: block.bottomBorderDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottomBorderDesktop?.altText || ``,
  };
  const bottomBorderMobile = {
    data: block.bottomBorderMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bottomBorderMobile?.altText || ``,
  };


  const imageDesktop = {
    data: block.imageDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.imageDesktop?.altText || ``,
  };

  const imageMobile = {
    data: block.imageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.imageMobile?.altText || ``,
  };

  const linesImage = {
    data: block.linesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImage?.altText || ``,
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [messageSent, setMessageSent] = React.useState(false);

  const styles = {
    '--bg-color': block?.bgColor,
  }

  return (
    <section className={`${s.block}`} id={block?.blockId} style={styles}>



      {(true == bp.md && !!topBorderDesktop?.data) && <>
        <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          objectFit='fill'
          className={'w-100'}
          style={{ marginBottom: '-1px' }}
          image={topBorderDesktop.data}
          alt={topBorderDesktop.alt} />
      </>}
      {(false == bp.md && !!topBorderMobile?.data) && <>
        <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          objectFit='fill'
          className={'w-100'}
          style={{ marginBottom: '-1px' }}
          image={topBorderMobile.data}
          alt={topBorderMobile.alt} />
      </>}
      {(true == bp.lg && !!linesImage?.data) && <>
        <GatsbyImage
          loading="eager"
          placeholder="dominantColor"
          className={s.bg}
          image={linesImage.data}
          alt={linesImage.alt} />
      </>}
      <div className={s.wrapper} >
        <div className='container position-relative'>
          <div className='row justify-content-between align-items-center'>
            {true == bp.lg && <div className='col-lg-6 col-xxl-5'>
              <h2 className={s.title}>{parse(block?.title)}</h2>
              {!!block?.subtitle && <div className={s.subtitle}>{parse(block?.subtitle)}</div>}
              <Form block={block} course={course} onSubmit={() => { setMessageSent(true) }} />
              {!!messageSent && <div className='text-center text-white'>Thank You. Your invitation will be sent to your email address.</div>}
            </div>}
            <div className='col-lg-6'>
              {false == bp.lg && <>
                <h2 className={s.title}>{parse(block?.title)}</h2>
                {!!block?.subtitle && <div className={s.subtitle}>{parse(block?.subtitle)}</div>}
              </>}
              <div className='d-flex justify-content-center'>
                {(true == bp.md && !!imageDesktop?.data) &&
                  <GatsbyImage
                    loading="eager"
                    placeholder="dominantColor"
                    className={'mw-100'}
                    image={imageDesktop.data}
                    alt={imageDesktop.alt} />
                }
              </div>
            </div>
          </div>
        </div>

        {(false == bp.md && !!imageMobile?.data) && <div className='d-flex justify-content-center'>
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={'mw-100'}
            image={imageMobile.data}
            alt={imageMobile.alt} />
        </div>}
        <div className='container position-relative'>
          <div className='row justify-content-center'>
            {false == bp.lg && <>
              <ButtonCta onClick={() => { setModalShow(true) }} block={block?.submitButton} className={'w-100 mt-3'}>
                <span>{block?.submitButton?.label}</span>
              </ButtonCta>
              {!!messageSent && <div className='text-center text-white'>Thank You. Your invitation will be sent to your email address.</div>}

              {!!modalShow && <>
                <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 10006 }} aria-hidden="false">
                  <div className="modal-backdrop fade show" style={{ zIndex: 1 }} onClick={() => { setModalShow(false) }}></div>
                  <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" style={{ zIndex: 2 }}>
                    <div className="modal-content" style={{ backgroundColor: 'var(--bg-color)' }}>
                      <div className="d-flex justify-content-end pt-3 pe-3">
                        <button type="button" className="btn-close" onClick={() => { setModalShow(false) }}></button>
                      </div>
                      <div className="modal-body">
                        <h2 className={s.title}>{parse(block?.title)}</h2>
                        {!!block?.subtitle && <div className={s.subtitle}>{parse(block?.subtitle)}</div>}
                        <Form block={block} course={course} onSubmit={() => { setMessageSent(true); setModalShow(false) }} />
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
      {
        (true == bp.md && !!bottomBorderDesktop?.data) && <>
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            objectFit='fill'
            className={'w-100'}
            style={{ marginTop: '-1px' }}
            image={bottomBorderDesktop.data}
            alt={bottomBorderDesktop.alt} />
        </>
      }
      {
        (false == bp.md && !!bottomBorderMobile?.data) && <>
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            objectFit='fill'
            className={'w-100'}
            style={{ marginTop: '-1px' }}
            image={bottomBorderMobile.data}
            alt={bottomBorderMobile.alt} />
        </>
      }
    </section >
  );
};

export default WebinarRegisterForm;


const Form = ({ block, course, onSubmit }) => {

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
        type: zapiers.webinar.type,
        source: "syntax",
        utm_source: queryParams?.utm_source || "",
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        subscribeToNewsLetter: acceptChecked,
        webinar: block?.webinar?.title,
      };

      let webhookUrl = block?.webinar?.acf_webinar?.heroBlock?.form?.webhookUrl;
      if (!!block?.webinar?.acf_webinar?.heroBlock?.form?.recordingUrl) {
        payloadForm.type = zapiers.webinarRecording.type;
        webhookUrl = null; // set null to use default webhook url
      }

      makeZapierRequest(payloadForm, webhookUrl)

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

      if ('function' == typeof onSubmit) {
        onSubmit();
      }

      if (!!block?.webinar?.acf_webinar?.heroBlock?.form?.recordingUrl) {
        window.open(block?.webinar?.acf_webinar?.heroBlock?.form?.recordingUrl, '_blank');
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
    <div className="website-form webinar row" onSubmit={submitForm}>
      <input type="hidden" name="type" value={`${!!block?.webinar?.acf_webinar?.heroBlock?.form?.recordingUrl ? zapiers.webinarRecording.type : zapiers.webinar.type}`} readOnly />
      <input type="hidden" name="event" value='formSubmit' readOnly />
      <input type="hidden" name="source" value='syntax' readOnly />
      <input type="hidden" name="webinar" value={block?.webinar?.title} readOnly />
      <div className="col-lg-6 pr-lg-2">
        <div className={`${s.labelInputGroup}`}>
          <label>First Name*</label>
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
          <label>Last Name*</label>
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
          <label>Email*</label>
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
          <label>Phone Number*</label>
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
          <span className="me-2">{block?.submitButton?.label}</span>
        </ButtonCta>
      </div>
    </div>
  </>
}
