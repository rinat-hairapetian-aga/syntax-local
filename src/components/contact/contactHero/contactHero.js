import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import parse from "html-react-parser";
import * as s from "./contactHero.module.css";
import Form from '../Form/Form';
import { Link } from 'gatsby';

const ContactHero = ({ block, page }) => {

  const [messageSent, setMessageSent] = React.useState(false);

  const bgImageDesktop = {
    data: block.bgImageDesktop?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgImageDesktop?.altText || ``,
  }

  const bgImageMobile = {
    data: block.bgImageMobile?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.bgImageMobile?.altText || ``,
  }

  const handleFormSubmit = () => {
    setMessageSent(true);
  }

  const bp = useBreakpoint();
  return (
    <>
      <section className={s.contactSection}>
        {bp.lg ? <div className={s.backgroundImage}>
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className="w-100"
            image={bgImageDesktop.data}
            alt={bgImageDesktop.alt} />
        </div> : <div className={s.backgroundImage}>
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className="w-100"
            image={bgImageMobile.data}
            alt={bgImageMobile.alt} />
        </div>}
        <div className="container">
          <div className={s.sectionWrapper}>
            <h1 className={s.sectionTitle}>{!!block?.title && parse(block?.title)}</h1>
            {!!block?.subtitle && <div className={s.sectionDesc}>{parse(block?.subtitle)}</div>}
            <Form block={block} onSubmit={handleFormSubmit} page={page}></Form>
            <div className="row justify-content-center mx-0">
              <div className="col-xl-6 ps-xl-0">
                <div className={`${s.contactBottomBlock} d-flex flex-column flex-xl-row align-items-center justify-content-between`}>
                  <div className={s.text}>{!!block.contacts.description && parse(block?.contacts?.description)}</div>
                  <svg className={s.divider} width="2" viewBox="0 0 2 63" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio='none'>
                    <path d="M1 0L1 63" stroke="#0B1B3B" />
                  </svg>

                  <div className={`${s.contacts} d-flex flex-column`}>
                    {!!block?.contacts?.email &&
                      <Link to={`mailto:${block.contacts?.email}`} className={s.contactLink}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 4.5H3C2.80109 4.5 2.61032 4.57902 2.46967 4.71967C2.32902 4.86032 2.25 5.05109 2.25 5.25V18C2.25 18.3978 2.40804 18.7794 2.68934 19.0607C2.97064 19.342 3.35218 19.5 3.75 19.5H20.25C20.6478 19.5 21.0294 19.342 21.3107 19.0607C21.592 18.7794 21.75 18.3978 21.75 18V5.25C21.75 5.05109 21.671 4.86032 21.5303 4.71967C21.3897 4.57902 21.1989 4.5 21 4.5ZM12 12.4828L4.92844 6H19.0716L12 12.4828ZM9.25406 12L3.75 17.0447V6.95531L9.25406 12ZM10.3641 13.0172L11.4891 14.0531C11.6274 14.1801 11.8084 14.2506 11.9963 14.2506C12.1841 14.2506 12.3651 14.1801 12.5034 14.0531L13.6284 13.0172L19.0659 18H4.92844L10.3641 13.0172ZM14.7459 12L20.25 6.95438V17.0456L14.7459 12Z" fill="#040D1D" />
                        </svg>
                        <span>{block?.contacts?.email}</span>
                      </Link>}
                    {!!block?.contacts?.phone && <Link to={`tel:${block.contacts?.phone}`} className={s.contactLink}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.8472 14.8557L16.4306 12.8766L16.4184 12.871C16.1892 12.7729 15.939 12.7336 15.6907 12.7565C15.4424 12.7794 15.2037 12.8639 14.9963 13.0022C14.9718 13.0184 14.9484 13.0359 14.9259 13.0547L12.6441 15.0001C11.1984 14.2979 9.70595 12.8166 9.00376 11.3897L10.9519 9.07318C10.9706 9.04974 10.9884 9.0263 11.0053 9.00099C11.1407 8.79409 11.2229 8.55692 11.2445 8.31059C11.2661 8.06427 11.2264 7.81642 11.1291 7.58912V7.57787L9.14438 3.1538C9.0157 2.85687 8.79444 2.60951 8.51362 2.44865C8.2328 2.2878 7.9075 2.22208 7.58626 2.2613C6.31592 2.42847 5.14986 3.05234 4.30588 4.01639C3.4619 4.98045 2.99771 6.21876 3.00001 7.50005C3.00001 14.9438 9.05626 21.0001 16.5 21.0001C17.7813 21.0023 19.0196 20.5382 19.9837 19.6942C20.9477 18.8502 21.5716 17.6841 21.7388 16.4138C21.7781 16.0927 21.7125 15.7674 21.5518 15.4866C21.3911 15.2058 21.144 14.9845 20.8472 14.8557ZM16.5 19.5001C13.3185 19.4966 10.2682 18.2312 8.01856 15.9815C5.76888 13.7318 4.50348 10.6816 4.50001 7.50005C4.49648 6.58458 4.82631 5.69911 5.42789 5.00903C6.02947 4.31895 6.86167 3.87143 7.76907 3.75005C7.7687 3.7538 7.7687 3.75756 7.76907 3.7613L9.73782 8.16755L7.80001 10.4869C7.78034 10.5096 7.76247 10.5337 7.74657 10.5591C7.60549 10.7756 7.52273 11.0249 7.5063 11.2827C7.48988 11.5406 7.54035 11.7984 7.65282 12.031C8.5022 13.7682 10.2525 15.5054 12.0084 16.3538C12.2428 16.4652 12.502 16.5139 12.7608 16.4952C13.0196 16.4765 13.2692 16.3909 13.485 16.2469C13.5091 16.2307 13.5322 16.2132 13.5544 16.1944L15.8334 14.2501L20.2397 16.2235C20.2397 16.2235 20.2472 16.2235 20.25 16.2235C20.1301 17.1322 19.6833 17.9661 18.9931 18.5691C18.3028 19.1722 17.4166 19.5031 16.5 19.5001Z" fill="#040D1D" /></svg>
                      <span>{block?.contacts?.phoneLabel ?? block?.contacts?.phone}</span>
                    </Link>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
};
export default ContactHero;