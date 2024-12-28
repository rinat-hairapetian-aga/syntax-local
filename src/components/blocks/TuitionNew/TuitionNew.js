
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React, { useState } from "react";

import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./TuitionNew.module.css";

const TuitionNew = ({ block }) => {
  const bp = useBreakpoint();

  const linesImageLeft = {
    data: block.linesImageLeft?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImageLeft?.altText || ``,
  };
  const linesImageRight = {
    data: block.linesImageRight?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImageRight?.altText || ``,
  };

  const [dropdownOpened, setDropdownOpened] = useState(false);

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId}>

        {true == bp.lg && <>
          {!!linesImageLeft?.data && <GatsbyImage
            loading="eager"
            placeholder="transparent"
            className={s.linesLeft}
            image={linesImageLeft.data}
            alt={linesImageLeft.alt} />}
          {!!linesImageRight?.data && <GatsbyImage
            loading="eager"
            placeholder="transparent"
            className={s.linesRight}
            image={linesImageRight.data}
            alt={linesImageRight.alt} />}
        </>}

        <div className="container position-relative">
          <div className="row">
            <div className="col-12">
              {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
              {!!block?.subtitle && <div className={s.subtitle}>{parse(block?.subtitle)}</div>}
            </div>
          </div>

          <div className="row justify-content-center mt-5 pt-5" style={{ columnGap: '40px', rowGap: '60px' }}>
            <div className='col-12 col-lg-5 col-xxl-5 order-lg-2'>
              <div className={s.salary}>
                {!!block?.salary?.badge && <div className={s.badge}>{parse(block?.salary?.badge)}</div>}
                <div className={s.salaryItems}>
                  <div className={`${s.item}`}>
                    <StaticImage loading='lazy' className={s.bg} src="./salary-item-lines.png" quality={100} alt="" />
                    <div className={s.label}>
                      {block?.salary?.averageSalary?.label}
                    </div>
                    <div className={s.value}>
                      {block?.salary?.averageSalary?.value}
                    </div>
                  </div>
                  <div className={`${s.item}`}>
                    <StaticImage loading='lazy' className={s.bg} src="./salary-item-lines.png" quality={100} alt="" />
                    <div className={s.label}>
                      {block?.salary?.studentsHired?.label}
                    </div>
                    <div className={s.value}>
                      {block?.salary?.studentsHired?.value}
                    </div>
                  </div>

                  <div className={`${s.graph}`}>
                    <div className='d-flex justify-content-center'>
                      <div className={s.label}>{block?.salary?.graph?.average?.label}</div>
                      <div className={s.value}>{block?.salary?.graph?.average?.value}</div>
                    </div>
                    <div className={s.line}>
                      <div className='flex-grow-1'></div>
                      <div className={s.point}></div>
                      <div className='flex-grow-1'></div>
                    </div>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex justify-content-center'>
                        <div className={s.label}>{block?.salary?.graph?.low?.label}</div>
                        <div className={s.value}>{block?.salary?.graph?.low?.value}</div>
                      </div>
                      <div className='d-flex justify-content-center'>
                        <div className={s.label}>{block?.salary?.graph?.high?.label}</div>
                        <div className={s.value}>{block?.salary?.graph?.high?.value}</div>
                      </div>
                    </div>
                  </div>

                  <div className={`${s.level}`}>
                    <div className='d-flex justify-content-between'>
                      <div className={s.label}>{block?.salary?.level?.beginner?.label}</div>
                      <div className={s.label}>{block?.salary?.level?.mid?.label}</div>
                      <div className={s.label}>{block?.salary?.level?.advanced?.label}</div>
                    </div>
                    <div className='d-flex justify-content-between'>
                      <div className={s.value}>{block?.salary?.level?.beginner?.value}</div>
                      <div className={s.value}>{block?.salary?.level?.mid?.value}</div>
                      <div className={s.value}>{block?.salary?.level?.advanced?.value}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-5 col-xxl-4 order-lg-1 pric_table_offer'>
              <div className={s.tuition}>
                <div className='pricing_offer_badge'>
                {/* BLACK <span className='blue_color'>FRIDAY</span> OFFER */}
                </div>
                {!!block?.tuition?.badge && <div className={s.badge}>{parse(block?.tuition?.badge)}</div>}
                {!!block?.tuition?.title && <div className={s.title}>{parse(block?.tuition?.title)}</div>}
                <div className='prices_wrap'>
                  <div className='was_price'>$5,950*</div>  
                  <div className='discount_price'>
                    <span className='red_badge'>40% Discount</span>
                    <span>$3,570*</span>
                  </div>
                </div>
                {/* {!!block?.tuition?.price && <div className={s.price}>{parse(block?.tuition?.price)}</div>} */}
                {!!block?.tuition?.subtitle && <div className={s.subtitle}>{parse(block?.tuition?.subtitle)}</div>}
                {!!block?.tuition?.description && <div className={s.description}>{parse(block?.tuition?.description)}</div>}
                {!!block?.tuition?.dropdown?.show && <div className={s.dropdown}>
                  <div className={s.heading} onClick={() => { setDropdownOpened(!dropdownOpened) }}>
                    <div className={s.label}>{parse(block?.tuition?.dropdown?.label)}</div>
                    <div className='d-flex align-items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="14" viewBox="0 0 23 14" fill="none">
                        <path d="M11.2524 13.1253L0.378662 3.12533L2.91588 0.791992L11.2524 8.45866L19.589 0.791992L22.1262 3.12533L11.2524 13.1253Z" fill="black" />
                      </svg>
                    </div>
                  </div>
                  {!!dropdownOpened && <div className={s.content}>{parse(block?.tuition?.dropdown?.content)}</div>}
                </div>}
              </div>
            </div>
          </div>
          {!!block?.button?.link?.url &&
            <div className="row">
              <div className="col-12 pt-3 mt-3 pt-lg-5 mt-lg-2">
                <div className='d-flex justify-content-center'>
                  <ButtonCta block={block?.button}></ButtonCta>
                </div>
              </div>
            </div>}
        </div>
      </section>
    </>
  );
};

export default TuitionNew;
