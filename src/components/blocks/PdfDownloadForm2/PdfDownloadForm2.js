import { graphql, useStaticQuery } from "gatsby";
import parse from "html-react-parser";
import React from "react";

import makeZapierRequest from './../../../utils/zapierRequests';
import zapiers from "./../../../utils/zapiers";

import ButtonCta from './../../buttonCta/buttonCta';
import * as s from "./PdfDownloadForm2.module.css";


const PdfDownloadForm2 = ({ block, page }) => {

  const { wp: { acfOptionsPostPdfForms: { postsPdfsForms: { settings: { pdfForm2 } } } } } = useStaticQuery(graphql`
    query PdfDownloadForm2Query {
      wp {
        acfOptionsPostPdfForms {
          postsPdfsForms {
            settings {
              pdfForm2 {
                bgColor
                bgGradient
                title
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
    data = pdfForm2;
  }

  const styles = {
    '--bg-color': data?.bgColor,
    '--bg-gradient': !!data?.bgGradient ? data?.bgGradient : 'unset',
  }

  const [modalShow, setModalShow] = React.useState(false);

  const habdleDownload = () => {
    const element = document.createElement("a");
    element.href = data?.pdfFile?.localFile?.publicURL;
    element.download = data?.pdfFile?.localFile?.base;
    element.click();
    setModalShow(false);
  }

  return (
    <div className={`${s.block}`} id={data?.blockId} style={styles}>
      <div className='container-lg px-0'>
        <div className={s.wrapper}>
          <div className='row mx-0 align-items-center'>
            <div className='col-md-7 col-lg-8 px-lg-0'>
              <h2 className={s.title}>{parse(data?.title)}</h2>
            </div>
            <div className='col-md-5 col-lg-4'>
              <ButtonCta onClick={(e) => { setModalShow(true) }} style={{ minWidth: '150px' }} type={'submit'} block={data?.submitButton} className={'mw-100 d-flex align-items-center justify-content-center ms-0 ms-md-auto'}>
                <span>{parse(data?.submitButton?.text)}</span>
              </ButtonCta>
            </div>
          </div>
        </div>
      </div>
      {!!modalShow && <>
        <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 10006 }} aria-hidden="false">
          <div className="modal-backdrop fade show" style={{ zIndex: 1 }} onClick={() => { setModalShow(false) }}></div>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{ zIndex: 2 }}>
            <div className={`modal-content ${s.modalContent}`}>
              <div className="d-flex justify-content-between pt-3 px-3">
                <h3 className={s.formTitle}>{parse(data?.title)}</h3>
                <button type="button" className="btn-close" onClick={() => { setModalShow(false) }}></button>
              </div>
              <div className="modal-body pb-4">
                <Form block={data} page={page} onSubmit={() => { habdleDownload() }} />
              </div>
            </div>
          </div>
        </div>
      </>
      }
    </div>
  );
};

export default PdfDownloadForm2;


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
        acceptChecked: acceptChecked,
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
    <form className="website-form download-report row mx-0" onSubmit={submitForm}>
      <input type="hidden" name="type" value={zapiers.downloadReport.type} readOnly />
      <input type="hidden" name="event" value='formSubmit' readOnly />
      <input type="hidden" name="source" value='syntax' readOnly />
      <input type="hidden" name="report_title" value={block?.title} readOnly />
      <div className="col-12">
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
      <div className="col-12">
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
      <div className="col-12">
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
      <div className="col-12 ">
        <ButtonCta onClick={(e) => { }} type={'submit'} block={{
          color: '#00B3FF',
          hoverColor: '#66D1FF',
          textColor: '#040D1D',
        }} className={'d-flex align-items-center justify-content-center'}>
          {parse(block?.submitButton?.text)}
        </ButtonCta>
      </div>
    </form>
  </>
}
