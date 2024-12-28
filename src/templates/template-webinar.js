import { graphql } from "gatsby"
import React from "react"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../assets/css/@wordpress/block-library/build-style/style.css"
import "../assets/css/@wordpress/block-library/build-style/theme.css"
import Layout from "./../components/layout"
import Seo from "./../components/seo"
import schemaBuilder from "./../utils/schemaBuilder"

import FAQ from "../components/blocks/FAQ/FAQ"
import FooterBanner from "../components/blocks/FooterBanner/FooterBanner"
import HeroWebinar from "../components/blocks/HeroWebinar/HeroWebinar"
import IndustryInsights from "../components/blocks/IndustryInsights/IndustryInsights"
import Mentors from "../components/blocks/Mentors/Mentors"
import Reviews from "../components/blocks/Reviews/Reviews"
import ReviewsIcons from "../components/blocks/ReviewsIcons/ReviewsIcons"
import WebinarFor from "../components/blocks/WebinarFor/WebinarFor"
import WebinarLearn from "../components/blocks/WebinarLearn/WebinarLearn"
import Popup from "../components/blocks/popup/Popup"

const WebinarTemplate = ({ data: { post, site }, location }) => {

  const schema = schemaBuilder({ webinar: post }, 'webinar', site);

  return (
    <Layout>
      <Seo
        title={post.title}
        description={post.excerpt}
        pageSeo={post}
        location={location}
        schema={schema}
      />
      <HeroWebinar block={post?.acf_webinar?.heroBlock} webinarTitle={post.title} />
      {
        !!post?.acf_webinar?.content &&
        post?.acf_webinar?.content?.map((block, index) => {
          switch (block.__typename) {
            case 'WpWebinar_AcfWebinar_Content_IndustryInsightsBlock':
              return <IndustryInsights block={block} key={index} />
              break;
            case 'WpWebinar_AcfWebinar_Content_WebinarForBlock':
              return <WebinarFor block={block} key={index} />
              break;
            case 'WpWebinar_AcfWebinar_Content_WebinarLearnBlock':
              return <WebinarLearn block={block} key={index} />
              break;
            case 'WpWebinar_AcfWebinar_Content_MentorsBlock':
              return <Mentors block={block} key={index} />
              break;
            case 'WpWebinar_AcfWebinar_Content_ReviewsIcons':
              return <ReviewsIcons block={block} key={index} />
              break;
            case 'WpWebinar_AcfWebinar_Content_ReviewsBlock':
              return <Reviews block={block} key={index} />
              break;
            case 'WpWebinar_AcfWebinar_Content_FaqBlock':
              return <FAQ block={block} key={index} />
              break;
            case 'WpWebinar_AcfWebinar_Content_FooterBannerBlock':
              return <FooterBanner block={block} key={index} />
              break;

            default:
              return <section className="container d-none" id={block?.blockId} style={{ 'wordBreak': 'break-word' }} key={`block-${index}`}>
                {block.__typename}
                {/* {JSON.stringify(block, null ,2)} */}
                <hr />
              </section>
          }
        })
      }
      {true != post?.pagesPopupSettings?.pagePopupSettigns?.hidePopup && <Popup block={post?.pagesPopupSettings?.pagePopupSettigns}/>}
    </Layout >
  )
}
export default WebinarTemplate

export const pageQuery = graphql`
  query WebinarById(
    $id: String!
  ) {
    site {
      siteMetadata {
        siteUrl: url
        title
      }
    }
    post: wpWebinar(id: { eq: $id }) {
      id
      excerpt
      content
      title
      uri
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      pagesPopupSettings {
        pagePopupSettigns {
          hidePopup
          useLocal
          popup {
            ... on WpPopup {
              id
              title
              template {
                ... on WpTemplate_WebinarPopup {
                  templateName
                  acfPopupWebinar {
                    webinarPopup {
                      linesImage {
                        altText
                        localFile {
                          childImageSharp {
                            gatsbyImageData(quality: 100)
                          }
                        }
                      }
                      title
                      speakers {
                        title
                        speakers {
                          ... on WpMentor {
                            title
                            featuredImage {
                              node {
                                altText
                                localFile {
                                  childImageSharp {
                                    gatsbyImageData(quality: 100)
                                  }
                                }
                              }
                            }
                            acfMentor {
                              position
                            }
                          }
                        }
                      }
                      button {
                        color
                        hoverColor
                        textColor
                        link {
                          url
                          title
                        }
                      }
                    }
                  }
                }
                ... on WpTemplate_EnrollPopup {
                  templateName
                  acfPopupEnroll {
                    enrollPopup {
                      title
                      topLinesImage {
                        altText
                        localFile {
                          childImageSharp {
                            gatsbyImageData(quality: 100)
                          }
                        }
                      }
                      discount
                      discountColorStart
                      discountColorStop
                      couponCode
                      linesImage {
                        altText
                        localFile {
                          childImageSharp {
                            gatsbyImageData(quality: 100)
                          }
                        }
                      }
                      ctaTitle
                      ctaSubtitle
                      button {
                        color
                        hoverColor
                        textColor
                        link {
                          target
                          title
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          timeDelay
        }
      }
      acf_webinar {
        heroBlock {
          blockId
          backgroundColor
          linesImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          title
          webinarDate
          webinarEndDate
          webinarDateLabel
          secondsBlockGradient
          infoText
          form {
            badgeIcon {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            title
            recordingUrl
            webhookUrl
            button {
              color
              hoverColor
              textColor
              text
            }
          }
          bottomBorderDesktop {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          bottomBorderMobile {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        content {
          ... on WpWebinar_AcfWebinar_Content_IndustryInsightsBlock {
            __typename
            blockId
            bgColor
            title
            items {
              image {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              title
              description
            }
            button {
              color
              hoverColor
              textColor
              link {
                target
                title
                url
              }
            }
          }
          ... on WpWebinar_AcfWebinar_Content_WebinarForBlock {
            __typename
            blockId
            linesLeftImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            linesRightImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            title
            subtitle
            items {
              image {
                altText
                localFile {
                  publicURL
                }
              }
              imageMobile {
                altText
                localFile {
                  publicURL
                }
              }
              title
              subtitle
              description
            }
            button {
              color
              hoverColor
              textColor
              link {
                target
                url
                title
              }
            }
          }
          ... on WpWebinar_AcfWebinar_Content_WebinarLearnBlock {
            __typename
            blockId
            bgColor
            topBorderDesktop {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            topBorderMobile {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            linesImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            title
            titleColor
            imageDesktop {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            imageMobile {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            items {
              icon {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              title
              description
            }
            button {
              color
              hoverColor
              textColor
              link {
                target
                title
                url
              }
            }
          }
          ... on WpWebinar_AcfWebinar_Content_MentorsBlock {
            __typename
            blockId
            linesImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            bgColor
            title
            mentors {
              mentor {
                ... on WpMentor {
                  id
                  title
                  featuredImage {
                    node {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData(quality: 100)
                        }
                      }
                    }
                  }
                  acfMentor {
                    position
                    skills {
                      title
                      style
                    }
                    description
                    companyLogo {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData(quality: 100)
                        }
                      }
                    }
                  }
                }
              }
            }
            button {
              color
              hoverColor
              textColor
              link {
                target
                title
                url
              }
            }
          }
          ... on WpWebinar_AcfWebinar_Content_ReviewsIcons {
            __typename
            blockId
            bgColor
            bgGradient
          }
          ... on WpWebinar_AcfWebinar_Content_ReviewsBlock {
            __typename
            blockId
            bgColor
            textColor
            title
            mainReview {
              ... on WpTestimonial {
                title
                acfTestimonial {
                  title
                  review
                  position
                  desktopImage {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData(quality: 100)
                      }
                    }
                  }
                  mobileImage {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData(quality: 100)
                      }
                    }
                  }
                  youtubeVideoId
                }
              }
            }
            reviews {
              review {
                ... on WpTestimonial {
                  title
                  acfTestimonial {
                    title
                    review
                    position
                    desktopImage {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData(quality: 100)
                        }
                      }
                    }
                    mobileImage {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData(quality: 100)
                        }
                      }
                    }
                    youtubeVideoId
                  }
                }
              }
            }
            button {
              color
              hoverColor
              textColor
              link {
                target
                title
                url
              }
            }
          }
          ... on WpWebinar_AcfWebinar_Content_FaqBlock {
            __typename
            blockId
            title
            items {
              question
              answer
            }
          }
          ... on WpWebinar_AcfWebinar_Content_FooterBannerBlock {
            __typename
            blockId
            bgColor
            bgImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            title
            titleColor
            link {
              target
              title
              url
            }
          }
        }
      }
      seo {
        metaKeywords
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        title
        twitterDescription
        twitterTitle
        opengraphSiteName
        opengraphTitle
        opengraphUrl
        focuskw
        opengraphImage {
          localFile {
            childImageSharp {
              fixed {
                src
                width
                height
              }
            }
            extension
          }
        }
        twitterImage {
          localFile {
            childImageSharp {
              fixed {
                src
                width
                height
              }
            }
            extension
          }
        }
        opengraphType
      }
    }
  }
`
