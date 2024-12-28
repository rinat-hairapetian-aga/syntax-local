import { GatsbyImage } from 'gatsby-plugin-image';
import parse from "html-react-parser";
import React from "react";

import zapiers from './../../../utils/zapiers';
import makeZapierRequest from './../../../utils/zapierRequests';
import * as s from "./Form.module.css";

import ButtonCta from '../../buttonCta/buttonCta';


const Form = ({ block, webinar, onSubmit }) => {

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
        webinar: webinar,
      };

      let webhookUrl = block?.webhookUrl;
      if (!!block?.recordingUrl) {
        payloadForm.type = zapiers.webinarRecording.type;
        webhookUrl = null; // set null to use default webhook url
      }

      makeZapierRequest(payloadForm, webhookUrl);


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

      if (!!block?.recordingUrl) {
        window.open(block?.recordingUrl, '_blank');
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

  const formBadgeIcon = {
    data: block?.badgeIcon?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block?.badgeIcon?.altText || ``,
  };

  return (
    <form className={`website-form webinar ${s.block}`} onSubmit={submitForm}>
      <input type="hidden" name="type" value={`${!!block?.recordingUrl ? zapiers.webinarRecording.type : zapiers.webinar.type}`} readOnly />
      <input type="hidden" name="event" value='formSubmit' readOnly />
      <input type="hidden" name="source" value='syntax' readOnly />
      <input type="hidden" name="webinar" value={webinar} readOnly />
      {!!formBadgeIcon?.data && <GatsbyImage
        loading="eager"
        placeholder="dominantColor"
        className={s.badge}
        image={formBadgeIcon.data}
        alt={formBadgeIcon.alt} />}
      <div className={`${s.formWrapper} row`}>
        {!!block?.title && <div className="col-lg-12">
          <div className={s.title}>{parse(block?.title)}</div>
        </div>}
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
          <label className={`${s.labelCheckboxGroup} justify-content-center`}>
            <input type="checkbox" name="subscribeToNewsLetter" checked={acceptChecked} onChange={handleAcceptCheckboxChange} />
            Subscribe to Syntax Newsletter
          </label>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <ButtonCta onClick={(e) => { }} type={'submit'} block={block?.button} className={`d-inline-flex align-items-center justify-content-center ${s.buttonCta}`}>
            {!!block?.button?.text ? <span>{parse(block?.button?.text)}</span> : <span>Register Now</span>}
          </ButtonCta>
        </div>

        {messageSent && <div className="col-12 d-flex justify-content-center mt-3 text-center">Thank you! You are Registered.</div>}
      </div>
    </form>
  );
};

export default Form;
