
import { graphql, useStaticQuery } from "gatsby";
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React from "react";

import * as s from "./ReviewsIcons.module.css";
import { isDark } from "../../../utils/brightness";

const ReviewsIcons = ({ block }) => {
  const bp = useBreakpoint();


  const { wp: { acfOptionsReviewIcons: { reviewIconsGlobal: { reviewIconsGlobal } } } } = useStaticQuery(graphql`
    query ReviewLogosQuery {
      wp {
        acfOptionsReviewIcons {
          reviewIconsGlobal {
            reviewIconsGlobal {
              reviewsCountImage {
                altText
                localFile {
                  publicURL
                }
              }
              reviewsCountImageUrl
              logos {
                url
                image {
                  altText
                  localFile {
                    publicURL
                  }
                }
              }
              seeAllLink {
                url
                title
                target
              }
              bgColor
              bgGradient
            }
          }
        }
      }
    }
  `)

  let data = reviewIconsGlobal;

  data.blockId = block?.blockId;
  if (!!block?.bgColor) {
    data.bgColor = block?.bgColor;
  }
  if (!!block?.bgGradient) {
    data.bgGradient = block?.bgGradient;
  }
  console.log(data);

  let reviewsCountImage = {
    src: data?.reviewsCountImage?.localFile?.publicURL,
    alt: data?.reviewsCountImage?.altText || ``,
  }

  const styles = {
    '--bg-color': data?.bgColor,
    '--bg-gradient': !!data?.bgGradient ? data?.bgGradient : 'unset',
  }

  return (
    <>
      <section className={`${s.block} ${isDark(data?.bgColor) ? s.dark : ''}`} id={data?.blockId} style={styles}>
        <div className="container position-relative">
          <div className="row">
            <div className="col-12">
              <div className='d-flex align-items-center justify-content-center flex-wrap'>
                <div className={s.mainLogoWrapper}>
                  {!!reviewsCountImage?.src && <>
                    {!!data?.reviewsCountImageUrl
                      ? <a target='_blank' href={data?.reviewsCountImageUrl}><img src={reviewsCountImage.src} loading='lazy' alt={reviewsCountImage.alt} className={`mw-100`} /></a>
                      : <img src={reviewsCountImage.src} loading='lazy' alt={reviewsCountImage.alt} className={`mw-100`} />
                    }
                  </>
                  }
                </div>
                <div className={s.logosWraper}>
                  {data?.logos?.map((l, i) => {
                    let logo = {
                      src: l?.image?.localFile?.publicURL,
                      alt: l?.image?.altText || ``,
                    }
                    if (!!logo?.src) {
                      if (l?.url) {
                        return <a target="_blank" key={i} href={l?.url}>
                          <img src={logo.src} loading='lazy' alt={logo.alt} className={`mw-100`} />
                        </a>
                      }
                      return <div key={i}>
                        <img src={logo.src} loading='lazy' alt={logo.alt} className={`mw-100`} />
                      </div>
                    }
                    return null
                  })}
                  {!!data?.seeAllLink?.url && <a className={s.seeAll} target="_blank" href={data?.seeAllLink?.url}>
                    {data?.seeAllLink?.title}
                  </a>}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewsIcons;
