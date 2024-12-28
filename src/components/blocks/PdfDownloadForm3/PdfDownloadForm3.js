import { graphql, useStaticQuery } from "gatsby";
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";

import { LogoFooterSvg } from "../../../utils/svgs";
import makeZapierRequest from '../../../utils/zapierRequests';
import zapiers from '../../../utils/zapiers';
import * as s from "./PdfDownloadForm3.module.css";

import ButtonCta from '../../buttonCta/buttonCta';


const PdfDownloadForm3 = ({ block, page }) => {

  const { wp: { acfOptionsPostPdfForms: { postsPdfsForms: { settings: { pdfForm3 } } } } } = useStaticQuery(graphql`
    query PdfDownloadForm3Query {
      wp {
        acfOptionsPostPdfForms {
          postsPdfsForms {
            settings {
              pdfForm3 {
                leftImage {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData(quality: 100)
                    }
                  }
                }
                bgColor
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
    data = pdfForm3;
  }

  const bp = useBreakpoint();

  const leftImage = {
    data: data?.leftImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: data?.leftImage?.alt || ``,
  }

  const styles = {
    '--bg-color': data?.bgColor,
  }

  return (
    <div className={`${s.block}`} id={data?.blockId} style={styles}>
      <div className='container px-0'>
        <div className='row mx-0 align-items-center'>
          {(true == bp?.lg && leftImage?.data) && <div className='col-lg-4 col-xl-5 px-0'>
            <GatsbyImage
              loading="eager"
              placeholder="none"
              image={leftImage.data}
              alt={leftImage.alt}
              className={s.leftImage}
            />
          </div>}
          <div className='col-lg-8 col-xl-7 px-0 px-lg-3'>
            <div className={s.wrapper}>
              <div className='mb-3'><LogoFooterSvg /></div>
              <h2 className={s.title}>{parse(data?.title)}</h2>
              {!!data?.subtitle && <div className={s.subtitle}>{parse(data?.subtitle)}</div>}
              <Form block={data} page={page} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfDownloadForm3;


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
        <ButtonCta onClick={(e) => { }} type={'submit'} block={block?.submitButton} className={'mw-100 d-flex align-items-center justify-content-center'}>
          <span className="me-2">{parse(block?.submitButton?.text)}</span>
        </ButtonCta>
      </div>
    </form>
  </>
}
