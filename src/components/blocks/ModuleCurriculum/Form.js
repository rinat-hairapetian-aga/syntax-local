import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

import zapiers from '../../../utils/zapiers';
import makeZapierRequest from './../../../utils/zapierRequests';
import ButtonCta from './../../buttonCta/buttonCta';
import * as s from "./Form.module.css";


const Form = ({ block, course, onSubmit }) => {
  const bp = useBreakpoint();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [acceptChecked, setAcceptChecked] = React.useState(true);
  const [errors, setErrors] = React.useState({
    firstName: null,
    lastName: null,
    email: null,
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
        type: zapiers.downloadCourseCurriculum.type,
        source: "syntax",
        utm_source: queryParams?.utm_source || "",
        firstName: firstName,
        lastName: lastName,
        email: email,
        subscribeToNewsLetter: acceptChecked,
        course: course,
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


  const rightImage = {
    data: block.rightImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.rightImage?.altText || ``,
  };

  return (
    <form className={`website-form curriculum ${s.block}`} onSubmit={submitForm}>
      <input type="hidden" name="type" value={zapiers.downloadCourseCurriculum.type} readOnly />
      <input type="hidden" name="event" value='formSubmit' readOnly />
      <input type="hidden" name="source" value='syntax' readOnly />
      <input type="hidden" name="course" value={course} readOnly />
      <div className='container px-0'>
        <div className='row mx-0'>
          <div className='col-xl-6 ps-xl-0'>
            <h3 className={s.title}>Download the Course Curriculum</h3>
            <div className="row">
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
                <label className={`${s.labelCheckboxGroup} w-100`}>
                  <input type="checkbox" name="subscribeToNewsLetter" checked={acceptChecked} onChange={handleAcceptCheckboxChange} />
                  Subscribe to Syntax Newsletter
                </label>
              </div>
              <div className="col-12">
                <ButtonCta onClick={(e) => { }} type={'submit'} block={block?.submitButton} className={'d-flex align-items-center justify-content-center'}>
                  <span className=" d-none d-lg-inline-block me-2">Download the Course Curiculum</span>
                  <span className="d-inline-block d-lg-none me-2">Download PDF</span>
                  <svg className='me-1' width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 15.925C3.98333 15.925 2.68733 15.4 1.612 14.35C0.536667 13.3 -0.000666047 12.0167 6.19579e-07 10.5C6.19579e-07 9.2 0.391667 8.04167 1.175 7.025C1.95833 6.00833 2.98333 5.35833 4.25 5.075C4.63333 3.725 5.346 2.59167 6.388 1.675C7.43 0.758334 8.634 0.2 10 0V8.075L8.4 6.525L7 7.925L11 11.925L15 7.925L13.6 6.525L12 8.075V0C13.7167 0.233333 15.146 1.00433 16.288 2.313C17.43 3.62167 18.0007 5.159 18 6.925C19.15 7.05833 20.1043 7.55433 20.863 8.413C21.6217 9.27167 22.0007 10.2757 22 11.425C22 12.675 21.5623 13.7377 20.687 14.613C19.8117 15.4883 18.7493 15.9257 17.5 15.925H5.5Z" fill={block?.submitButton?.textColor} />
                  </svg>
                </ButtonCta>
              </div>
            </div>
          </div>
          {(true == bp.xl && !!rightImage?.data) && <div className='col-lg-6 col-xl-5 offset-xl-1 pe-lg-0 mt-4 mt-lg-0'>
            <GatsbyImage
              loading="eager"
              placeholder="dominantColor"
              className={'mw-100'}
              image={rightImage.data}
              alt={rightImage.alt} />
          </div>}
        </div>
      </div>

    </form>
  );
};

export default Form;
