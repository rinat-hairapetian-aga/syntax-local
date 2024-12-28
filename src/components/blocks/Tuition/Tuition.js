
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";

import * as s from "./Tuition.module.css";

const Tuition = ({ block }) => {
  const bp = useBreakpoint();

  const linesImage = {
    data: block.linesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImage?.altText || ``,
  };

  const styles = {
    '--border-color': block?.borderColor,
    '--bg-color': block?.activeBgColor,
  }

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} style={styles}>

        {(true == bp.md && !!linesImage?.data) && <GatsbyImage
          loading="eager"
          placeholder="transparent"
          className={s.lines}
          image={linesImage.data}
          alt={linesImage.alt} />}

        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-12">
              {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
            </div>
            <div className="col-12 px-0 px-md-3">
              {block?.steps?.length > 0 && <div className={s.stepsWrapper}>
                {block?.steps?.map((step, i) => {
                  return <div key={i} className={s.step}>
                    <div>{parse(step.title ?? '')}</div>
                  </div>
                })}
              </div>}
              {!!block?.additionalDescriptionText && <div className={s.additionalDescription}>{parse(block?.additionalDescriptionText)}</div>}
            </div>

            <div className="col-12">
              {!!block?.paymentOptionsTitle && <h2 className={s.optionsTitle}>{parse(block?.paymentOptionsTitle)}</h2>}
            </div>
            <div className="col-12">
              <div className={s.optionsBanner}>
                <div className={s.optionsBannerTitle}>{parse(block?.banner?.title) ?? ''}</div>
                <div className='d-flex flex-column align-items-center align-items-lg-end'>
                  <div className={s.optionsBannerPrice}>{parse(block?.banner?.price) ?? ''}</div>
                  <div className={s.optionsBannerPeriod}>{parse(block?.banner?.period) ?? ''}</div>
                </div>
              </div>
              <div className={s.optionsOutline}>
                <div className={s.optionsHeading}>
                  <div className={s.headingTitle}>{parse(block?.optionsHeading?.title)}</div>
                  {!!block?.optionsHeading?.description && <div className={s.headingDescription}>{parse(block?.optionsHeading?.description)}</div>}
                </div>
                {block?.options?.length > 0 && <div className={s.optionsWrapper}>
                  {block?.options?.map((option, i) => {
                    return <Option block={option} key={i} />
                  })}
                </div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tuition;

const Option = ({ block }) => {

  const [opened, setOpened] = React.useState(false);

  const toggleOpened = () => {
    setOpened(!opened);
  }

  return <div className={`${s.optionWrapper} ${opened ? s.opened : ''}`}>
    <div className={`${s.optionHeading} cursor-pointer`} onClick={toggleOpened}>
      <div className={s.optionTitle}>{parse(block?.title)}</div>
      <div>
        {opened
          ? <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="41" viewBox="0 0 44 41" fill="none">
              <path d="M21.847 14.6891L32.7208 24.6891L30.1836 27.0225L21.847 19.3558L13.5105 27.0225L10.9733 24.6891L21.847 14.6891Z" fill="black" />
            </svg>
          </div>
          : <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="41" viewBox="0 0 44 41" fill="none">
              <path d="M21.8469 25.9398L10.9731 15.9398L13.5104 13.6064L21.8469 21.2731L30.1835 13.6064L32.7207 15.9398L21.8469 25.9398Z" fill="black" />
            </svg>
          </div>
        }
      </div>
    </div>
    <div className={s.optionDetails}>
      {block?.loanAmount && <div className={s.optionDetail}>
        <div className={s.info}>
          <b>Loan<br /> Amount</b>
          <div>{parse(block?.loanAmount)}</div>
        </div>
      </div>}
      {block?.termMonths && <div className={s.optionDetail}>
        <div className={s.info}>
          <b>Term<br /> (Months)</b>
          <div>{parse(block?.termMonths)}</div>
        </div>
      </div>}

      {block?.interestRate && <div className={s.optionDetail}>
        <div className={s.info}>
          <b>Interest<br /> Rate</b>
          <div>{parse(block?.interestRate)}</div>
        </div>
      </div>}
      {block?.apr && <div className={s.optionDetail}>
        <div className={s.info}>
          <b>APR</b>
          <div>{parse(block?.apr)}</div>
        </div>
      </div>}
      {block?.interestOnlyPayments && <div className={s.optionDetail}>
        <div className={s.info}>
          <b>Interest Only<br /> Payments</b>
          <div>{parse(block?.interestOnlyPayments)}</div>
        </div>
      </div>}
      {block?.principalAndInterestPayments && <div className={s.optionDetail}>
        <div className={s.info}>
          <b>Principal &<br />  Interest Payments</b>
          <div>{parse(block?.principalAndInterestPayments)}</div>
        </div>
      </div>}
    </div>
  </div >
}
