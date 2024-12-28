import { navigate } from 'gatsby';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import parse from "html-react-parser";
import React from "react";

import countriesList from '../../../utils/countries';
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
  const [country, setCountry] = React.useState("");
  const [acceptChecked, setAcceptChecked] = React.useState(true);
  const [program, setProgram] = React.useState('');
  const [coupon, setCoupon] = React.useState('');
  const [whereHear, setWhereHear] = React.useState('');
  const [friendFullName, setFriendFullName] = React.useState('');
  const [otherSource, setOtherSource] = React.useState('');

  const whereHearOptions = [
    'Facebook',
    'Instagram',
    'Google',
    'LinkedIn',
    'Twitter',
    'TikTok',
    'Email',
    'Blog',
    'Referred by a Friend',
    'Other',
  ];

  const [errors, setErrors] = React.useState({
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    country: null,
    program: null,
    whereHear: null,
    friendFullName: null,
    otherSource: null,
  });
  const [messageSent, setMessageSent] = React.useState(false);

  const handleAcceptCheckboxChange = (e) => {
    setAcceptChecked(e.target.checked);
  }

  const submitForm = (e) => {
    e.preventDefault();
    if (isValidForm()) {

      const queryParams = JSON.parse(sessionStorage.getItem("queryParams"));
      const lines = [];
      try {
        for (var x in queryParams) {
          lines.push(`*${x}:* ${queryParams[x]}`)
        }
      } catch (e) { }

      let payloadForm = {
        event: 'formSubmit',
        type: zapiers.enroll.type,
        source: "syntax",
        utm_source: queryParams?.utm_source || "",
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        country: country,
        program: program,
        coupon: coupon,
        whereHear: whereHear,
        otherSource: otherSource,
        friendFullName: friendFullName,
        subscribeToNewsLetter: acceptChecked,
        page: page,
      };
      makeZapierRequest(payloadForm)

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCountry("");
      setProgram("");
      setCoupon("");
      setWhereHear("");
      setOtherSource("");
      setFriendFullName("");
      setErrors({
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        country: null,
        program: null,
        coupon: null,
        whereHear: null,
        otherSource: null,
        friendFullName: null,
      });

      switch (block?.onSubmit) {
        case 'message':
          setMessageSent(true);
          break;
        case 'redirect':
          navigate(block?.thankYouPage?.uri);
          break;
        default:
          break;
      }

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
      country: null,
      program: null,
      coupon: null,
      whereHear: null,
      otherSource: null,
      friendFullName: null,
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
      newErrors.phone = 'Please enter a valid Phone number';
    }


    if (!country?.length) {
      isValid = false;
      newErrors.country = 'Please Select a Country';
    }

    if (!program) {
      isValid = false;
      newErrors.program = 'Please Select Program';
    }

    if (!whereHear) {
      isValid = false;
      newErrors.whereHear = 'Required Field';
    } else {
      if ('Other' == whereHear && !otherSource) {
        isValid = false;
        newErrors.otherSource = 'Required Field';
      }
      if ('Referred by a Friend' == whereHear && !friendFullName) {
        isValid = false;
        newErrors.friendFullName = 'Required Field';
      }
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
    <form className={`website-form enroll ${s.block}`} onSubmit={submitForm}>
      <input type="hidden" name="type" value={zapiers.enroll.type} readOnly />
      <input type="hidden" name="event" value='formSubmit' readOnly />
      <input type="hidden" name="source" value='syntax' readOnly />
      <div className={`${s.formWrapper} row`}>
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
        <div className="col-lg-12">
          <div className={`${s.labelInputGroup} w-100`}>
            <label>Country*</label>
            <select name="country" value={country} onChange={(e) => { setCountry(e.target.value) }} className={s.formSelect} required>
              <option value="">Select</option>
              {countriesList?.map((item, i) => {
                return <option key={i} value={item}>{parse(item)}</option>
              })}
            </select>
            {null != errors.country && <small>{errors.country}</small>}
          </div>
        </div>

        <div className="col-lg-12">
          <div className={`${s.labelInputGroup} w-100`}>
            <label>Select a Program*</label>
            <select name="program" value={program} onChange={(e) => { setProgram(e.target.value) }} className={s.formSelect} required>
              <option value="">Select</option>
              {block?.programmsList?.map((item, i) => {
                return <option key={i} value={item.text}>{parse(item.text)}</option>
              })}
            </select>
            {null != errors.program && <small>{errors.program}</small>}
          </div>
        </div>

        <div className="col-lg-12">
          <div className={`${s.labelInputGroup} w-100`}>
            <label>Do You Have A Coupon Code <span>(optional)</span></label>
            <div>
              <input
                type="text"
                name="coupon"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                placeholder="Your coupon Code" />
              {null != errors.coupon && <small>{errors.coupon}</small>}
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className={`${s.labelInputGroup} w-100`}>
            <label>How Did You Hear About Us?*</label>
            <select id="selectOption" name="where_did_you_hear_about_syntax_" value={whereHear} onChange={(e) => { setWhereHear(e.target.value) }} className={s.formSelect} required>
              <option value="">Select</option>
              {whereHearOptions?.map((item, i) => {
                return <option key={i} value={item}>{parse(item)}</option>
              })}
            </select>
            {null != errors.whereHear && <small>{errors.whereHear}</small>}
          </div>
        </div>
        {'Other' == whereHear && <div className="col-lg-12">
          <div className={`${s.labelInputGroup} w-100`}>
            <label>Please Specify*</label>
            <div>
              <input
                required
                type="text"
                name="otherSource"
                value={otherSource}
                onChange={e => setOtherSource(e.target.value)}
                placeholder="Other Source" />
              {null != errors.otherSource && <small>{errors.otherSource}</small>}
            </div>
          </div>
        </div>}
        {'Referred by a Friend' == whereHear && <div className="col-lg-12">
          <div className={`${s.labelInputGroup} w-100`}>
            <label>Friend's Full Name*</label>
            <div>
              <input
                required
                type="text"
                name="referal_s_name"
                value={friendFullName}
                onChange={e => setFriendFullName(e.target.value)}
                placeholder="Name Surname" />
              {null != errors.friendFullName && <small>{errors.friendFullName}</small>}
            </div>
          </div>
        </div>}
        <div className="col-12 d-flex justify-content-center">
          <label className={`${s.labelCheckboxGroup}`}>
            <input type="checkbox" name="subscribeToNewsLetter" checked={acceptChecked} onChange={handleAcceptCheckboxChange} />
            Subscribe to Syntax Newsletter
          </label>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <ButtonCta onClick={() => { }} type={'submit'} block={block?.submitButton} className={`mx-auto d-inline-flex align-items-center justify-content-center ${s.buttonCta}`}>
            {!!block?.submitButton?.text && <span>{parse(block?.submitButton?.text)}</span>}
          </ButtonCta>
        </div>

        {messageSent && <div className="col-12 d-flex justify-content-center mt-3 text-center">{block?.thankYouText}</div>}
      </div>
    </form>
  );
};

export default Form;
