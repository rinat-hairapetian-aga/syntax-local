import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import makeZapierRequest from '../../utils/zapierRequests';

import { LogoDarkSvg } from '../../utils/svgs';
import zapiers from '../../utils/zapiers';
import ButtonCta from '../buttonCta/buttonCta';
import * as s from "./FooterSubscribeBlock.module.css";


const FooterSubscribeBlock = ({ page }) => {
  const bp = useBreakpoint();
  const [messageSent, setMessageSent] = React.useState(false);

  const handleOnSubmit = () => {
    setMessageSent(true);
  }

  return (
    <section className={`${s.block}`} >
      {true == bp.md &&
        <StaticImage
          loading="eager"
          placeholder="dominantColor"
          className={s.bg}
          quality={100}
          alt="lines"
          src="./bg.png"
        />
      }
      <div className='container position-relative'>
        <div className='row justify-content-center align-items-center'>
          <div className='col-lg-6'>
            <div className='text-center text-lg-start'>
              <LogoDarkSvg />
            </div>
            <h2 className={s.title}>Subscribe to our<br className='d-none d-lg-inline-block' /> newsletter</h2>
          </div>
          <div className='col-lg-6'>
            <Form page={page} onSubmit={handleOnSubmit} />
            {!!messageSent && <div className={s.thankYouText}>Thank you for Subscribing.</div>}
          </div>
        </div>

      </div>

    </section >
  );
};

export default FooterSubscribeBlock;


const Form = ({ page, onSubmit }) => {


  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [errors, setErrors] = React.useState({
    firstName: null,
    lastName: null,
    email: null,
  });

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
        type: zapiers.subscribe.type,
        source: "syntax",
        utm_source: queryParams?.utm_source || "",
        firstName: firstName,
        lastName: lastName,
        email: email,
        page: page,
      };
      makeZapierRequest(payloadForm)

      setFirstName("");
      setLastName("");
      setEmail("");
      setErrors({
        firstName: null,
        lastName: null,
        email: null,
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

    setErrors(newErrors);
    return isValid;
  }

  const isEmailValid = (email) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }

  const btnStyles = {
    color: '#fff',
    hoverColor: '#00B3FF',
    textColor: '#040D1D',
  }

  return <>
    <form className="website-form subscribe row" onSubmit={submitForm}>
      <input type="hidden" name="type" value={zapiers.subscribe.type} readOnly />
      <input type="hidden" name="event" value='formSubmit' readOnly />
      <input type="hidden" name="source" value='syntax' readOnly />
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
      <div className="col-12">
        <ButtonCta onClick={(e) => { }} type={'submit'} block={btnStyles} className={'w-100 d-flex align-items-center justify-content-center mt-3 mt-lg-2'}>
          <span>Subscribe</span>
        </ButtonCta>
      </div>
    </form >
  </>
}
