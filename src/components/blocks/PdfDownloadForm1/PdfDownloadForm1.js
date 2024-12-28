import { graphql, useStaticQuery } from "gatsby";
import parse from "html-react-parser";
import React from "react";

import makeZapierRequest from '../../../utils/zapierRequests';
import zapiers from "../../../utils/zapiers";
import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./PdfDownloadForm1.module.css";


const PdfDownloadForm1 = ({ block, page }) => {

  const { wp: { acfOptionsPostPdfForms: { postsPdfsForms: { settings: { pdfForm1 } } } } } = useStaticQuery(graphql`
    query PdfDownloadForm1Query {
      wp {
        acfOptionsPostPdfForms {
          postsPdfsForms {
            settings {
              pdfForm1 {
                bgColor
                bgGradient
                title
                subtitle
                submitButton {
                  color
                  hoverColor
                  textColor
                  text
                }
                pdfFile {
                  localFile {
                    publicURL
                    base
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  let data = block;

  if (!block?.show) {
    data = pdfForm1;
  }

  const styles = {
    '--bg-color': data?.bgColor,
    '--bg-gradient': !!data?.bgGradient ? data?.bgGradient : 'unset',
  }

  return (
    <div className={`${s.block}`} id={data?.blockId} style={styles}>
      <div className='container px-0'>
        <div className={s.wrapper}>
          <div className='row mx-0 align-items-center'>
            <div className='col-lg-5'>
              <h2 className={s.title}>{parse(data?.title)}</h2>
              {!!data?.subtitle && <div className={s.subtitle}>{parse(data?.subtitle)}</div>}
            </div>
            <div className='col-lg-7'>
              <Form block={data} page={page} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfDownloadForm1;


const Form = ({ block, page, onSubmit }) => {


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
        type: zapiers.downloadReport.type,
        source: "syntax",
        utm_source: queryParams?.utm_source || "",
        firstName: firstName,
        lastName: lastName,
        email: email,
        subscribeToNewsLetter: acceptChecked,
        page: page,
        reportTitle: block?.title,
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
      element.href = block?.pdfFile?.localFile?.publicURL;
      element.download = block?.pdfFile?.localFile?.base;
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

    setErrors(newErrors);
    return isValid;
  }

  const isEmailValid = (email) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }

  return <>
    <form className="website-form download-report row" onSubmit={submitForm}>
      <input type="hidden" name="type" value={zapiers.downloadReport.type} readOnly />
      <input type="hidden" name="event" value='formSubmit' readOnly />
      <input type="hidden" name="source" value='syntax' readOnly />
      <input type="hidden" name="report_title" value={block?.title} readOnly />
      <div className="col-lg-5 pe-lg-2">
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
      <div className="col-lg-7 ps-lg-2">
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
        <ButtonCta onClick={(e) => { }} type={'submit'} block={block?.submitButton} className={'w-100 d-flex align-items-center justify-content-center'}>
          <span className="me-2">{parse(block?.submitButton?.text)}</span>
          <svg className='me-1' width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 15.925C3.98333 15.925 2.68733 15.4 1.612 14.35C0.536667 13.3 -0.000666047 12.0167 6.19579e-07 10.5C6.19579e-07 9.2 0.391667 8.04167 1.175 7.025C1.95833 6.00833 2.98333 5.35833 4.25 5.075C4.63333 3.725 5.346 2.59167 6.388 1.675C7.43 0.758334 8.634 0.2 10 0V8.075L8.4 6.525L7 7.925L11 11.925L15 7.925L13.6 6.525L12 8.075V0C13.7167 0.233333 15.146 1.00433 16.288 2.313C17.43 3.62167 18.0007 5.159 18 6.925C19.15 7.05833 20.1043 7.55433 20.863 8.413C21.6217 9.27167 22.0007 10.2757 22 11.425C22 12.675 21.5623 13.7377 20.687 14.613C19.8117 15.4883 18.7493 15.9257 17.5 15.925H5.5Z" fill={block?.submitButton?.textColor} />
          </svg>
        </ButtonCta>
      </div>
    </form>
  </>
}
