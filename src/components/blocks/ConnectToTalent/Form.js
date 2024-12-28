import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import parse from "html-react-parser";
import React from "react";

import zapiers from '../../../utils/zapiers';
import makeZapierRequest from './../../../utils/zapierRequests';
import * as s from "./Form.module.css";

import ButtonCta from '../../buttonCta/buttonCta';


const Form = ({ block, page, onSubmit }) => {
  const bp = useBreakpoint();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [acceptChecked, setAcceptChecked] = React.useState(true);
  const [industry, setIndustry] = React.useState('');

  const [errors, setErrors] = React.useState({
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    industry: null,
    company: null,
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
        type: zapiers.connectWithTalent.type,
        source: "syntax",
        utm_source: queryParams?.utm_source || "",
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        company: company,
        industry: industry,
        subscribeToNewsLetter: acceptChecked,
        page: page,
      };
      makeZapierRequest(payloadForm)

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setIndustry("");
      setErrors({
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        company: null,
        industry: null,
      });

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
      company: null,
      industry: null,
    };

    if (!company?.length) {
      isValid = false;
      newErrors.company = 'Please enter Your Company Name';
    }

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
      newErrors.phone = 'Please enter a valid Phone number';
    }

    if (!industry?.length) {
      isValid = false;
      newErrors.industry = 'Please enter Industry';
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
  return (
    <form className={`website-form conntect-to-talent ${s.block}`} onSubmit={submitForm}>
      <input type="hidden" name="type" value={zapiers.connectWithTalent.type} readOnly />
      <input type="hidden" name="event" value='formSubmit' readOnly />
      <input type="hidden" name="source" value='syntax' readOnly />
      <div className={`${s.formWrapper} row`}>
        <div className="col-lg-12">
          <div className={`${s.labelInputGroup} w-100`}>
            <label>Company Name</label>
            <div>
              <input
                required
                type="text"
                name="company"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Your Company Name" />
              {null != errors.company && <small>{errors.company}</small>}
            </div>
          </div>
        </div>
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
        <div className="col-lg-12">
          <div className={`${s.labelInputGroup} w-100`}>
            <label>Industry</label>
            <div>
              <input
                required
                type="text"
                name="industry"
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                placeholder="Industry" />
              {null != errors.industry && <small>{errors.industry}</small>}
            </div>
          </div>
        </div>

        <div className="col-12 d-flex justify-content-center">
          <label className={`${s.labelCheckboxGroup}`}>
            <input type="checkbox" name="subscribeToNewsLetter" checked={acceptChecked} onChange={handleAcceptCheckboxChange} />
            Subscribe to Syntax Newsletter
          </label>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <ButtonCta onClick={(e) => { }} type={'submit'} block={block?.submitButton} className={`mx-auto d-inline-flex align-items-center justify-content-center ${s.buttonCta}`}>
            {!!block?.submitButton?.text && <span>{parse(block?.submitButton?.text)}</span>}
          </ButtonCta>
        </div>

        {messageSent && <div className="col-12 d-flex justify-content-center mt-3 text-center">Thank you! Your message has been sent.</div>}
      </div>
    </form >
  );
};

export default Form;
